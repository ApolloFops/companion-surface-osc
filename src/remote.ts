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
	rows: number
	cols: number
	protocol: string
	local_port: number
	remote_port: number
	remote_address: string
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
			id: 'rows',
			type: 'number',
			label: 'Rows',
			default: 4,
			min: 1,
			max: 1000,
		},
		{
			id: 'cols',
			type: 'number',
			label: 'Columns',
			default: 8,
			min: 1,
			max: 1000,
		},
		{
			type: 'dropdown',
			id: 'protocol',
			label: 'Protocol',
			choices: [
				{ id: 'udp', label: 'UDP (Default)' },
				{ id: 'tcp-client', label: 'TCP Client' },
			],
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

			let pluginInfo: OSCDeviceInfo | null = null

			switch (config.protocol) {
				case 'udp':
					pluginInfo = {
						rows: config.rows ?? 4,
						cols: config.cols ?? 8,
						protocol: 'udp',
						local_port: config.local_port ?? 8000,
						remote_port: config.remote_port ?? 8001,
						remote_address: config.remote_address ?? '127.0.0.1',
					}
					break

				case 'tcp-client':
					pluginInfo = {
						rows: config.rows ?? 4,
						cols: config.cols ?? 8,
						protocol: 'tcp-client',
						remote_port: config.remote_port ?? 8001,
						remote_address: config.remote_address ?? '127.0.0.1',
					}
					break

				case 'tcp-server':
					pluginInfo = {
						rows: config.rows ?? 4,
						cols: config.cols ?? 8,
						protocol: 'tcp-server',
						local_port: config.local_port ?? 8000,
					}
					break
			}

			if (pluginInfo != null) {
				this.emit('surfacesConnected', [
					{
						deviceHandle: nanoid(),
						surfaceId: `osc:${config.protocol}-${config.local_port ?? 8000}`,
						description: `Generic OSC`,
						pluginInfo: pluginInfo,
					},
				])
			}
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
