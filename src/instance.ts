import {
	CardGenerator,
	HostCapabilities,
	SurfaceDrawProps,
	SurfaceContext,
	SurfaceInstance,
	// ModuleLogger,
	// createModuleLogger,
} from '@companion-surface/base'

import { OSCUDPDeviceInfo } from './main.js'

import osc from 'osc'

export class OSCWrapper implements SurfaceInstance {
	readonly #surfaceId: string
	// readonly #context: SurfaceContext
	// readonly #logger: ModuleLogger

	readonly #osc: osc.Port

	public get surfaceId(): string {
		return this.#surfaceId
	}

	public get productName(): string {
		return 'OSC'
	}

	public constructor(surfaceId: string, pluginInfo: OSCUDPDeviceInfo, context: SurfaceContext) {
		// this.#logger = createModuleLogger(`Framework/${surfaceId}`)
		this.#surfaceId = surfaceId

		this.#osc = new osc.UDPPort({
			localAddress: '0.0.0.0',
			localPort: pluginInfo.local_port,
			remoteAddress: pluginInfo.remote_address,
			remotePort: pluginInfo.remote_port,
		})

		// Listen for incoming OSC messages.
		this.#osc.on('message', (message, _timeTag, _info) => {
			console.log('An OSC message just arrived!', message)

			const keyUpDownRegex: RegExp = /\/location\/\d+\/(\d+\/\d+)$/
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

			const keyPressRegex: RegExp = /\/location\/\d+\/(\d+\/\d+)\/press$/
			if (keyPressRegex.test(message['address'])) {
				const path = message['address'].match(keyPressRegex)

				context.keyDownUpById(path[1])

				return
			}
		})
	}

	async init(): Promise<void> {
		// Start with blanking it
		await this.blank()

		// Open the socket
		this.#osc.open()
	}

	async close(): Promise<void> {
		await this.#clearPanel().catch(() => null)

		// Close the socket
		this.#osc.close()
	}

	updateCapabilities(_capabilities: HostCapabilities): void {
		// Not used
	}

	async ready(): Promise<void> {}

	async setBrightness(_percent: number): Promise<void> {}

	async blank(): Promise<void> {
		await this.#clearPanel()
	}

	async draw(_signal: AbortSignal, drawProps: SurfaceDrawProps): Promise<void> {
		// Maybe a bundle could be faster here but from my testing it's not
		if (drawProps.text) {
			this.#osc.send({
				address: `/location/1/${drawProps.controlId}/text`,
				args: [
					{
						type: 's',
						value: drawProps.text,
					},
				],
			})
		}

		if (drawProps.color) {
			this.#osc.send({
				address: `/location/1/${drawProps.controlId}/color`,
				args: [
					{
						type: 's',
						value: drawProps.color,
					},
				],
			})
		}
	}

	async #clearPanel(): Promise<void> {}

	async showStatus(_signal: AbortSignal, _cardGenerator: CardGenerator): Promise<void> {
		// Nothing to display here
	}
}
