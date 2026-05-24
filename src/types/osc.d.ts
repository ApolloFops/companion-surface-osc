declare module 'osc' {
	const osc: OSC & OSCTransport
	export = osc

	export interface Port {
		open(): void
		close(): void
		send(message: any, address?: string, port?: number): void

		on(event: string, callback: (...args: any[]) => void): void
	}
}
