import {
	createModuleLogger,
	type DetectionSurfaceInfo,
	type RemoteSurfaceConnectionInfo,
	type SomeCompanionInputField,
	type SurfacePluginRemote,
	type SurfacePluginRemoteEvents,
} from '@companion-surface/base'
import EventEmitter from 'node:events'
import { nanoid } from 'nanoid'
import { OSCDeviceInfo } from './main.js'

export interface OSCConnectionConfig {
	protocol: string
	port: number
}

export class OSCPluginRemoteService
	extends EventEmitter<SurfacePluginRemoteEvents<OSCDeviceInfo>>
	implements SurfacePluginRemote<OSCDeviceInfo>
{
	readonly #logger = createModuleLogger('OSCRemoteService')

	constructor() {
		super()
	}

	async init(): Promise<void> {
		this.#logger.info('OSC remote service initialized')
	}

	async destroy(): Promise<void> {
		this.#logger.info('OSC remote service destroyed')
	}

	readonly configFields: SomeCompanionInputField[] = [
		{
			type: 'dropdown',
			id: 'protocol',
			label: 'Protocol',
			choices: [{ id: 'udp', label: 'UDP (Default)' }],
			default: 'udp',
		},
		{
			id: 'port',
			type: 'number',
			label: 'Port',
			default: 8000,
			min: 1,
			max: 65535,
		},
	]

	readonly checkConfigMatchesExpression: string | null = '$(objA:port) == $(objB:port)'

	async startConnections(connectionInfos: RemoteSurfaceConnectionInfo[]): Promise<void> {
		this.#logger.info(`Starting connections: ${connectionInfos.map((c) => c.connectionId).join(', ')}`)

		for (const info of connectionInfos) {
			const config = info.config as Partial<OSCConnectionConfig>

			this.#logger.info(`Connect requested: ${config.protocol} ${config.port ?? 8000}`)

			this.emit('surfacesConnected', [
				{
					deviceHandle: nanoid(),
					surfaceId: `osc:${config.protocol}-${config.port}`,
					description: `Generic OSC`,
					pluginInfo: {
						protocol: 'udp',
						local_port: config.port ?? 8000,
					},
				},
			])

			// TODO:
			// Create/connect OSC client here
			// Then emit surfacesConnected once ready
		}
	}

	async stopConnections(connectionIds: string[]): Promise<void> {
		this.#logger.info(`Stopping connections: ${connectionIds.join(', ')}`)

		// TODO:
		// Disconnect OSC clients here
	}

	rejectSurface(_surfaceInfo: DetectionSurfaceInfo<OSCDeviceInfo>): void {
		// Optional:
		// Handle rejected surfaces if needed
	}
}
