// Regular expressions for input validation. Taken from the companion-module-base library

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Regex {
	// TODO - are all of these needed?
	export const IP = '/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/'
	export const HOSTNAME =
		'/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/'
	export const BOOLEAN = '/^(true|false|0|1)$/i'
	export const PORT =
		'/^([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-4])$/'
	export const MAC_ADDRESS = '/^(?:[a-fA-F0-9]{2}:){5}([a-fA-F0-9]{2})$/'
	export const PERCENT = '/^(100|[0-9]|[0-9][0-9])$/'
	export const FLOAT = '/^([0-9]*\\.)?[0-9]+$/'
	export const SIGNED_FLOAT = '/^[+-]?([0-9]*\\.)?[0-9]+$/'
	export const FLOAT_OR_INT = '/^([0-9]+)(\\.[0-9]+)?$/'
	export const NUMBER = '/^\\d+$/'
	export const SIGNED_NUMBER = '/^[+-]?\\d+$/'
	export const SOMETHING = '/^.+$/'
	export const TIMECODE =
		'/^(0*[0-9]|1[0-9]|2[0-4]):(0*[0-9]|[1-5][0-9]|60):(0*[0-9]|[1-5][0-9]|60):(0*[0-9]|[12][0-9]|30)$/'
}
