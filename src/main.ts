import type { OpenSurfaceResult, SurfaceContext, SurfacePlugin } from '@companion-surface/base'
import { OSCWrapper } from './instance.js'
import { createSurfaceSchema } from './surface-schema.js'
import { OSCPluginRemoteService } from './remote.js'
import osc from 'osc'

export interface OSCDeviceInfo {
	rows: number
	cols: number

	osc_port: osc.Port

	bitmap_enable: boolean
	bitmap_width: number
	bitmap_height: number
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
				brightness: false,
				surfaceLayout: createSurfaceSchema(
					pluginInfo.rows,
					pluginInfo.cols,
					pluginInfo.bitmap_enable,
					pluginInfo.bitmap_width,
					pluginInfo.bitmap_height,
				),
				pincodeMap: null,
				configFields: null,
				location: null,
			},
		}
	},
}
export default OSCPlugin
