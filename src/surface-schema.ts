import type { SurfaceSchemaLayoutDefinition } from '@companion-surface/base'
import { createControlId } from './util.js'

export function createSurfaceSchema(rows: number, cols: number): SurfaceSchemaLayoutDefinition {
	const surfaceLayout: SurfaceSchemaLayoutDefinition = {
		stylePresets: {
			default: {
				text: true,
				colors: 'hex',
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
