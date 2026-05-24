import {
	CardGenerator,
	HostCapabilities,
	SurfaceDrawProps,
	SurfaceContext,
	SurfaceInstance,
	ModuleLogger,
	createModuleLogger,
} from '@companion-surface/base'

import osc from 'osc'
import util from 'util'
import { ImageTransformer } from '@julusian/image-rs'

import { OSCDeviceInfo } from './main.js'
import { createControlId } from './util.js'

export class OSCWrapper implements SurfaceInstance {
	readonly #surfaceId: string
	readonly #pluginInfo: OSCDeviceInfo
	readonly #context: SurfaceContext
	readonly #logger: ModuleLogger

	readonly #osc: osc.Port

	public get surfaceId(): string {
		return this.#surfaceId
	}

	public get productName(): string {
		return 'OSC'
	}

	public constructor(surfaceId: string, pluginInfo: OSCDeviceInfo, context: SurfaceContext) {
		this.#logger = createModuleLogger(`Framework/${surfaceId}`)
		this.#pluginInfo = pluginInfo
		this.#surfaceId = surfaceId
		this.#context = context

		this.#osc = pluginInfo.osc_port

		this.#osc.on('error', (error: any) => this.#context.disconnect(error))

		if (this.#pluginInfo.remote_events) {
			this.#pluginInfo.remote_events.on('disconnect', () => {
				this.#context.disconnect(new Error('Asked to close by the remote service'))
			})
		}

		// Listen for incoming OSC messages.
		this.#osc.on('message', (message: any, _timeTag: any, _info: any) => {
			this.#logger.debug(`An OSC message just arrived! ${util.format(message)}`)

			const keyUpDownRegex: RegExp = /\/location\/(\d+\/\d+)$/
			if (keyUpDownRegex.test(message['address'])) {
				const path = message['address'].match(keyUpDownRegex)

				const keyId = path[1]

				if (message['args'][0]) {
					context.keyDownById(keyId)
				} else {
					context.keyUpById(keyId)
				}

				return
			}

			const keyPressRegex: RegExp = /\/location\/(\d+\/\d+)\/press$/
			if (keyPressRegex.test(message['address'])) {
				const path = message['address'].match(keyPressRegex)

				context.keyDownUpById(path[1])

				return
			}
		})
	}

	async init(): Promise<void> {
		// Open the socket
		this.#osc.open()

		// Start with blanking it
		await this.blank()
	}

	async close(): Promise<void> {
		// Blank it before we go
		await this.blank().catch(() => null)

		// Close the socket
		this.#osc.close()
	}

	updateCapabilities(_capabilities: HostCapabilities): void {}

	async updateConfig(_config: Record<string, any>): Promise<void> {}

	async ready(): Promise<void> {}

	async setBrightness(_percent: number): Promise<void> {}

	async blank(): Promise<void> {
		// Send messages that clear all the relevant things
		for (let row: number = 0; row < this.#pluginInfo.rows; row++) {
			for (let col: number = 0; col < this.#pluginInfo.cols; col++) {
				const controlId = createControlId(row, col)

				this.#osc.send({
					address: `/location/${controlId}/text`,
					args: [
						{
							type: 's',
							value: '',
						},
					],
				})

				this.#osc.send({
					address: `/location/${controlId}/color`,
					args: [
						{
							type: 's',
							value: '#000000',
						},
					],
				})
			}
		}
	}

	async draw(_signal: AbortSignal, drawProps: SurfaceDrawProps): Promise<void> {
		// Maybe a bundle could be faster here but from my testing it's not
		this.#osc.send({
			address: `/location/${drawProps.controlId}/text`,
			args: [
				{
					type: 's',
					value: (drawProps.text ?? '')
						// Need to replace \n with a real newline because bitfocus outputs \n rather than converting to newlines
						.replace(/\\n/g, '\n'),
				},
			],
		})

		if (drawProps.color) {
			this.#osc.send({
				address: `/location/${drawProps.controlId}/color`,
				args: [
					{
						type: 's',
						value: drawProps.color,
					},
				],
			})
		}

		if (drawProps.image) {
			const image_transformer: ImageTransformer = ImageTransformer.fromBuffer(
				drawProps.image,
				this.#pluginInfo.bitmap_width,
				this.#pluginInfo.bitmap_height,
				'rgba',
			)

			const dataUrl = await image_transformer.toDataUrl('jpeg')

			this.#osc.send({
				address: `/location/${drawProps.controlId}/image`,
				args: [
					{
						type: 's',
						value: dataUrl,
					},
				],
			})
		}
	}

	async showStatus(_signal: AbortSignal, _cardGenerator: CardGenerator): Promise<void> {
		// Nothing to display here
	}
}
