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
import { OSCUDPDeviceInfo } from './main.js'

export interface OSCConnectionConfig {
	protocol: string
	local_port: number
	remote_port: number
	remote_address: string
}

export class OSCPluginRemoteService
	extends EventEmitter<SurfacePluginRemoteEvents<OSCUDPDeviceInfo>>
	implements SurfacePluginRemote<OSCUDPDeviceInfo>
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
			id: 'local_port',
			type: 'number',
			label: 'Local Port',
			default: 8000,
			min: 1,
			max: 65535,
		},
		{
			id: 'remote_port',
			type: 'number',
			label: 'Remote Port',
			default: 8001,
			min: 1,
			max: 65535,
		},
		{
			id: 'remote_address',
			type: 'textinput',
			label: 'Remote Address',
			default: '127.0.01',
		},
	]

	readonly checkConfigMatchesExpression: string | null = '$(objA:port) == $(objB:port)'

	async startConnections(connectionInfos: RemoteSurfaceConnectionInfo[]): Promise<void> {
		this.#logger.info(`Starting connections: ${connectionInfos.map((c) => c.connectionId).join(', ')}`)

		for (const info of connectionInfos) {
			const config = info.config as Partial<OSCConnectionConfig>

			this.#logger.info(`Connect requested: ${config.protocol} ${config.local_port ?? 8000}`)

			this.emit('surfacesConnected', [
				{
					deviceHandle: nanoid(),
					surfaceId: `osc:${config.protocol}-${config.local_port ?? 8000}`,
					description: `Generic OSC`,
					pluginInfo: {
						protocol: 'udp',
						local_port: config.local_port ?? 8000,
						remote_port: config.remote_port ?? 8001,
						remote_address: config.remote_address ?? '127.0.0.1',
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
