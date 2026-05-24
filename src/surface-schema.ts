import type { SurfaceSchemaBitmapConfig, SurfaceSchemaLayoutDefinition } from '@companion-surface/base'
import { createControlId } from './util.js'

export function createSurfaceSchema(
	rows: number,
	cols: number,
	bitmap_enable: boolean,
	bitmap_width: number,
	bitmap_height: number,
): SurfaceSchemaLayoutDefinition {
	let bitmapConfig: SurfaceSchemaBitmapConfig | undefined

	if (bitmap_enable) {
		bitmapConfig = {
			w: bitmap_width,
			h: bitmap_height,
			format: 'rgba',
		}
	}

	const surfaceLayout: SurfaceSchemaLayoutDefinition = {
		stylePresets: {
			default: {
				text: true,
				colors: 'hex',
				bitmap: bitmapConfig,
			},
		},
		controls: {},
	}

	for (let row: number = 0; row < rows; row++) {
		for (let col: number = 0; col < cols; col++) {
			surfaceLayout.controls[createControlId(row, col)] = {
				row: row,
				column: col,
				// TODO - style?
			}
		}
	}

	return surfaceLayout
}
