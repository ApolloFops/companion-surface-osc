import type { DiscoveredSurfaceInfo, OpenSurfaceResult, SurfaceContext, SurfacePlugin } from '@companion-surface/base'
import { MidiWrapper } from './instance.js'
import { createSurfaceSchema } from './surface-schema.js'
import { MidiLayoutDefinition, NovationLaunchpadLayoutTest } from './tmp-layout.js'

export interface OSCDeviceInfo {
	port: number
}

const MidiPlugin: SurfacePlugin<OSCDeviceInfo> = {
	init: async (): Promise<void> => {
		// Nothing to do
	},
	destroy: async (): Promise<void> => {
		// Nothing to do
	},

	scanForSurfaces: async (): Promise<DiscoveredSurfaceInfo<OSCDeviceInfo>[]> => {
		const discovered: DiscoveredSurfaceInfo<OSCDeviceInfo>[] = []

		discovered.push({
			surfaceId: `osc:1`,
			description: `OSC Port 1`,
			pluginInfo: {
				port: 8000,
			},
		})

		return discovered
	},

	openSurface: async (
		surfaceId: string,
		_pluginInfo: OSCDeviceInfo,
		context: SurfaceContext,
	): Promise<OpenSurfaceResult> => {
		const layout: MidiLayoutDefinition = NovationLaunchpadLayoutTest

		return {
			surface: new MidiWrapper(surfaceId, context),
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
export default MidiPlugin
