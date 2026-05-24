import type { OpenSurfaceResult, SurfaceContext, SurfacePlugin } from '@companion-surface/base'
import { OSCWrapper } from './instance.js'
import { createSurfaceSchema } from './surface-schema.js'
import { OSCPluginRemoteService } from './remote.js'

export type OSCDeviceInfo = OSCUDPDeviceInfo | OSCTCPServerDeviceInfo | OSCTCPClientDeviceInfo

export interface OSCBaseDeviceInfo {
	protocol: string
	rows: number
	cols: number
}

export interface OSCUDPDeviceInfo extends OSCBaseDeviceInfo {
	protocol: 'udp'
	local_port: number
	remote_port: number
	remote_address: string
}

export interface OSCTCPClientDeviceInfo extends OSCBaseDeviceInfo {
	protocol: 'tcp-client'
	remote_port: number
	remote_address: string
}

export interface OSCTCPServerDeviceInfo extends OSCBaseDeviceInfo {
	protocol: 'tcp-server'
	local_port: number
}

const remoteService = new OSCPluginRemoteService()

const OSCPlugin: SurfacePlugin<OSCDeviceInfo> = {
	remote: remoteService,

	init: async (): Promise<void> => {
		// Nothing to do
	},
	destroy: async (): Promise<void> => {
		// Nothing to do
	},

	openSurface: async (
		surfaceId: string,
		pluginInfo: OSCDeviceInfo,
		context: SurfaceContext,
	): Promise<OpenSurfaceResult> => {
		return {
			surface: new OSCWrapper(surfaceId, pluginInfo, context),
			registerProps: {
				brightness: true,
				surfaceLayout: createSurfaceSchema(pluginInfo.rows, pluginInfo.cols),
				pincodeMap: null,
				configFields: null,
				location: null,
			},
		}
	},
}
export default OSCPlugin
