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

import OSC from 'osc-js'

export class OSCWrapper implements SurfaceInstance {
	readonly #surfaceId: string
	// readonly #context: SurfaceContext
	// readonly #logger: ModuleLogger

	readonly #osc: InstanceType<typeof OSC>

	public get surfaceId(): string {
		return this.#surfaceId
	}

	public get productName(): string {
		return 'OSC'
	}

	public constructor(surfaceId: string, pluginInfo: OSCUDPDeviceInfo, context: SurfaceContext) {
		// this.#logger = createModuleLogger(`Framework/${surfaceId}`)
		this.#surfaceId = surfaceId

		const options = {
			open: {
				host: '0.0.0.0',
				port: pluginInfo.local_port,
			},
			send: {
				host: pluginInfo.remote_address,
				port: pluginInfo.remote_port,
			},
		}

		this.#osc = new OSC({
			plugin: new OSC.DatagramPlugin(options),
		})

		// Listen for incoming OSC messages.
		this.#osc.on('*', (message) => {
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

		// Open the sockets
		this.#osc.open()
	}

	async close(): Promise<void> {
		await this.#clearPanel().catch(() => null)

		// Close the sockets
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
		const messages: InstanceType<typeof OSC.Message>[] = []

		if (drawProps.text) {
			messages.push(new OSC.Message(`/location/1/${drawProps.controlId}/text`, drawProps.text))
		}

		if (drawProps.color) {
			messages.push(new OSC.Message(`/location/1/${drawProps.controlId}/color`, drawProps.color))
		}

		const messageBundle = new OSC.Bundle(messages)
		this.#osc.send(messageBundle)
	}

	async #clearPanel(): Promise<void> {}

	async showStatus(_signal: AbortSignal, _cardGenerator: CardGenerator): Promise<void> {
		// Nothing to display here
	}
}
