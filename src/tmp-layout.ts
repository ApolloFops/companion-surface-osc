export interface MidiLayoutDefinition {
	buttons: MidiButtonDefinition[]
}

export interface MidiButtonDefinition {
	id: string

	row: number
	column: number

	type: 'noteon' | 'cc'
	note: number
}

// TODO - this should be moved to a json schema..
export const NovationLaunchpadLayoutTest: MidiLayoutDefinition = {
	buttons: [
		// Row 0 - cc 104-112
		{ id: '0/0', row: 0, column: 0, type: 'cc', note: 104 },
		{ id: '0/1', row: 0, column: 1, type: 'cc', note: 105 },
		{ id: '0/2', row: 0, column: 2, type: 'cc', note: 106 },
		{ id: '0/3', row: 0, column: 3, type: 'cc', note: 107 },
		{ id: '0/4', row: 0, column: 4, type: 'cc', note: 108 },
		{ id: '0/5', row: 0, column: 5, type: 'cc', note: 109 },
		{ id: '0/6', row: 0, column: 6, type: 'cc', note: 110 },
		{ id: '0/7', row: 0, column: 7, type: 'cc', note: 111 },
		{ id: '0/8', row: 0, column: 8, type: 'cc', note: 112 },

		// Row 1 - notes 0-8
		{ id: '1/0', row: 1, column: 0, type: 'noteon', note: 0 },
		{ id: '1/1', row: 1, column: 1, type: 'noteon', note: 1 },
		{ id: '1/2', row: 1, column: 2, type: 'noteon', note: 2 },
		{ id: '1/3', row: 1, column: 3, type: 'noteon', note: 3 },
		{ id: '1/4', row: 1, column: 4, type: 'noteon', note: 4 },
		{ id: '1/5', row: 1, column: 5, type: 'noteon', note: 5 },
		{ id: '1/6', row: 1, column: 6, type: 'noteon', note: 6 },
		{ id: '1/7', row: 1, column: 7, type: 'noteon', note: 7 },
		{ id: '1/8', row: 1, column: 8, type: 'noteon', note: 8 },

		// Row 2 - notes 16-24
		{ id: '2/0', row: 2, column: 0, type: 'noteon', note: 16 },
		{ id: '2/1', row: 2, column: 1, type: 'noteon', note: 17 },
		{ id: '2/2', row: 2, column: 2, type: 'noteon', note: 18 },
		{ id: '2/3', row: 2, column: 3, type: 'noteon', note: 19 },
		{ id: '2/4', row: 2, column: 4, type: 'noteon', note: 20 },
		{ id: '2/5', row: 2, column: 5, type: 'noteon', note: 21 },
		{ id: '2/6', row: 2, column: 6, type: 'noteon', note: 22 },
		{ id: '2/7', row: 2, column: 7, type: 'noteon', note: 23 },
		{ id: '2/8', row: 2, column: 8, type: 'noteon', note: 24 },

		// Row 3 - notes 32-40
		{ id: '3/0', row: 3, column: 0, type: 'noteon', note: 32 },
		{ id: '3/1', row: 3, column: 1, type: 'noteon', note: 33 },
		{ id: '3/2', row: 3, column: 2, type: 'noteon', note: 34 },
		{ id: '3/3', row: 3, column: 3, type: 'noteon', note: 35 },
		{ id: '3/4', row: 3, column: 4, type: 'noteon', note: 36 },
		{ id: '3/5', row: 3, column: 5, type: 'noteon', note: 37 },
		{ id: '3/6', row: 3, column: 6, type: 'noteon', note: 38 },
		{ id: '3/7', row: 3, column: 7, type: 'noteon', note: 39 },
		{ id: '3/8', row: 3, column: 8, type: 'noteon', note: 40 },

		// Row 4 - notes 48-56
		{ id: '4/0', row: 4, column: 0, type: 'noteon', note: 48 },
		{ id: '4/1', row: 4, column: 1, type: 'noteon', note: 49 },
		{ id: '4/2', row: 4, column: 2, type: 'noteon', note: 50 },
		{ id: '4/3', row: 4, column: 3, type: 'noteon', note: 51 },
		{ id: '4/4', row: 4, column: 4, type: 'noteon', note: 52 },
		{ id: '4/5', row: 4, column: 5, type: 'noteon', note: 53 },
		{ id: '4/6', row: 4, column: 6, type: 'noteon', note: 54 },
		{ id: '4/7', row: 4, column: 7, type: 'noteon', note: 55 },
		{ id: '4/8', row: 4, column: 8, type: 'noteon', note: 56 },

		// Row 5 - notes 64-72
		{ id: '5/0', row: 5, column: 0, type: 'noteon', note: 64 },
		{ id: '5/1', row: 5, column: 1, type: 'noteon', note: 65 },
		{ id: '5/2', row: 5, column: 2, type: 'noteon', note: 66 },
		{ id: '5/3', row: 5, column: 3, type: 'noteon', note: 67 },
		{ id: '5/4', row: 5, column: 4, type: 'noteon', note: 68 },
		{ id: '5/5', row: 5, column: 5, type: 'noteon', note: 69 },
		{ id: '5/6', row: 5, column: 6, type: 'noteon', note: 70 },
		{ id: '5/7', row: 5, column: 7, type: 'noteon', note: 71 },
		{ id: '5/8', row: 5, column: 8, type: 'noteon', note: 72 },

		// Row 6 - notes 80-88
		{ id: '6/0', row: 6, column: 0, type: 'noteon', note: 80 },
		{ id: '6/1', row: 6, column: 1, type: 'noteon', note: 81 },
		{ id: '6/2', row: 6, column: 2, type: 'noteon', note: 82 },
		{ id: '6/3', row: 6, column: 3, type: 'noteon', note: 83 },
		{ id: '6/4', row: 6, column: 4, type: 'noteon', note: 84 },
		{ id: '6/5', row: 6, column: 5, type: 'noteon', note: 85 },
		{ id: '6/6', row: 6, column: 6, type: 'noteon', note: 86 },
		{ id: '6/7', row: 6, column: 7, type: 'noteon', note: 87 },
		{ id: '6/8', row: 6, column: 8, type: 'noteon', note: 88 },

		// Row 7 - notes 96-104
		{ id: '7/0', row: 7, column: 0, type: 'noteon', note: 96 },
		{ id: '7/1', row: 7, column: 1, type: 'noteon', note: 97 },
		{ id: '7/2', row: 7, column: 2, type: 'noteon', note: 98 },
		{ id: '7/3', row: 7, column: 3, type: 'noteon', note: 99 },
		{ id: '7/4', row: 7, column: 4, type: 'noteon', note: 100 },
		{ id: '7/5', row: 7, column: 5, type: 'noteon', note: 101 },
		{ id: '7/6', row: 7, column: 6, type: 'noteon', note: 102 },
		{ id: '7/7', row: 7, column: 7, type: 'noteon', note: 103 },
		{ id: '7/8', row: 7, column: 8, type: 'noteon', note: 104 },

		// Row 8 - notes 112-120
		{ id: '8/0', row: 8, column: 0, type: 'noteon', note: 112 },
		{ id: '8/1', row: 8, column: 1, type: 'noteon', note: 113 },
		{ id: '8/2', row: 8, column: 2, type: 'noteon', note: 114 },
		{ id: '8/3', row: 8, column: 3, type: 'noteon', note: 115 },
		{ id: '8/4', row: 8, column: 4, type: 'noteon', note: 116 },
		{ id: '8/5', row: 8, column: 5, type: 'noteon', note: 117 },
		{ id: '8/6', row: 8, column: 6, type: 'noteon', note: 118 },
		{ id: '8/7', row: 8, column: 7, type: 'noteon', note: 119 },
		{ id: '8/8', row: 8, column: 8, type: 'noteon', note: 120 },
	],
}
