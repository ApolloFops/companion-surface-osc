import {
	CardGenerator,
	HostCapabilities,
	SurfaceDrawProps,
	SurfaceContext,
	SurfaceInstance,
	// ModuleLogger,
	// createModuleLogger,
} from '@companion-surface/base'

import { OSCDeviceInfo } from './main.js'

import osc from 'osc'

export class OSCWrapper implements SurfaceInstance {
	readonly #surfaceId: string
	// readonly #context: SurfaceContext
	// readonly #logger: ModuleLogger

	readonly #oscPort: osc.UDPPort

	public get surfaceId(): string {
		return this.#surfaceId
	}

	public get productName(): string {
		return 'OSC'
	}

	public constructor(surfaceId: string, pluginInfo: OSCDeviceInfo, context: SurfaceContext) {
		// this.#logger = createModuleLogger(`Framework/${surfaceId}`)
		this.#surfaceId = surfaceId

		this.#oscPort = new osc.UDPPort({
			localAddress: '0.0.0.0',
			localPort: pluginInfo.local_port,
			metadata: true,
		})

		// Listen for incoming OSC messages.
		this.#oscPort.on('message', function (oscMsg, timeTag, info) {
			console.log('An OSC message just arrived!', oscMsg)
			console.log('Remote info is: ', info)

			const keyUpDownRegex: RegExp = /\/location\/\d+\/(\d+\/\d+)$/
			if (keyUpDownRegex.test(oscMsg['address'])) {
				const path = oscMsg['address'].match(keyUpDownRegex)

				const keyId = path[1]

				if (oscMsg['args'][0].value) {
					context.keyDownById(keyId)
				} else {
					context.keyUpById(keyId)
				}

				return
			}

			const keyPressRegex: RegExp = /\/location\/\d+\/(\d+\/\d+)\/press$/
			if (keyPressRegex.test(oscMsg['address'])) {
				const path = oscMsg['address'].match(keyPressRegex)

				context.keyDownUpById(path[1])

				return
			}
		})
	}

	async init(): Promise<void> {
		// Start with blanking it
		await this.blank()

		// Open the socket
		this.#oscPort.open()
	}

	async close(): Promise<void> {
		await this.#clearPanel().catch(() => null)

		// Close the socket
		this.#oscPort.close()
	}

	updateCapabilities(_capabilities: HostCapabilities): void {
		// Not used
	}

	async ready(): Promise<void> {}

	async setBrightness(_percent: number): Promise<void> {}

	async blank(): Promise<void> {
		await this.#clearPanel()
	}

	async draw(_signal: AbortSignal, _drawProps: SurfaceDrawProps): Promise<void> {}

	async #clearPanel(): Promise<void> {}

	async showStatus(_signal: AbortSignal, _cardGenerator: CardGenerator): Promise<void> {
		// Nothing to display here
	}
}
