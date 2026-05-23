import type { OpenSurfaceResult, SurfaceContext, SurfacePlugin } from '@companion-surface/base'
import { OSCWrapper } from './instance.js'
import { createSurfaceSchema } from './surface-schema.js'
import { MidiLayoutDefinition, NovationLaunchpadLayoutTest } from './tmp-layout.js'
import { OSCPluginRemoteService } from './remote.js'

export interface OSCDeviceInfo {
	protocol: string
	local_port: number
}

export interface OSCUDPDeviceInfo {
	protocol: 'udp'
	local_port: number
	remote_port: number
	remote_address: string
}

export interface OSCTCPDeviceInfo {
	protocol: 'tcp'
	local_port: number
}

const remoteService = new OSCPluginRemoteService()

const OSCPlugin: SurfacePlugin<OSCUDPDeviceInfo> = {
	remote: remoteService,

	init: async (): Promise<void> => {
		// Nothing to do
	},
	destroy: async (): Promise<void> => {
		// Nothing to do
	},

	openSurface: async (
		surfaceId: string,
		pluginInfo: OSCUDPDeviceInfo,
		context: SurfaceContext,
	): Promise<OpenSurfaceResult> => {
		const layout: MidiLayoutDefinition = NovationLaunchpadLayoutTest

		console.log('Opening surface')

		return {
			surface: new OSCWrapper(surfaceId, pluginInfo, context),
			registerProps: {
				brightness: true,
				surfaceLayout: createSurfaceSchema(layout),
				pincodeMap: null,
				configFields: null,
				location: null,
			},
		}
	},
}
export default OSCPlugin
