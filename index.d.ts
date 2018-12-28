interface AmplitudeOptions {
  trackSessionEvents?: boolean;
  eventPrefix?: boolean;
}


export function construct(apiKey: string, trackSessionEvents?: boolean, eventPrefix?: string): Promise<void>;

// --------------------------------------------------
// Identify
// --------------------------------------------------
export function setUserId(userId: string | number | null): void;
export function setUserProperties(properties: Record<string, any>): void;
export function setOptOut(optOut: boolean): void;
export function clearUserProperties(): void;
export function getDeviceId(): Promise<string>;
export function regenerateDeviceId(): void;
export function setLogEventPrefix(prefix: string): void;

// --------------------------------------------------
// Track
// --------------------------------------------------

export function logEvent(name: string, properties?: Record<string, any>): void;
export function logEventWithTimestamp(name: string, timestamp: number, properties?: Record<string, any>): void;

// --------------------------------------------------
// Revenue
// --------------------------------------------------
export function logRevenue(productIdentifier: string, quantity: number, amount: number, receipt?: string): void;
export function addToUserProperty(property: string, amount: number): void;
export function setUserPropertyOnce(property: string, value: string | number | null): void;

