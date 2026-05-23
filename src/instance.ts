import {
	CardGenerator,
	HostCapabilities,
	SurfaceDrawProps,
	SurfaceContext,
	SurfaceInstance,
	ModuleLogger,
	createModuleLogger,
} from '@companion-surface/base'

export class MidiWrapper implements SurfaceInstance {
	readonly #surfaceId: string
	// readonly #context: SurfaceContext
	readonly #logger: ModuleLogger

	// /**
	//  * Last drawn colours, to allow resending when brightness changes
	//  */
	// readonly #lastColours: Record<string, RgbColor> = {}
	// #brightness: number = 50

	public get surfaceId(): string {
		return this.#surfaceId
	}

	public get productName(): string {
		return 'OSC'
	}

	public constructor(surfaceId: string, _context: SurfaceContext) {
		this.#logger = createModuleLogger(`Framework/${surfaceId}`)
		this.#surfaceId = surfaceId

		this.#logger.error(`haiiii`)
	}

	async init(): Promise<void> {
		// Start with blanking it
		await this.blank()
	}

	async close(): Promise<void> {
		await this.#clearPanel().catch(() => null)
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
