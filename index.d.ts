interface AmplitudeOptions {
  trackSessionEvents?: boolean;
  eventPrefix?: boolean;
}

export default class Amplitude {
  static initInstance(apiKey: string, options?: AmplitudeOptions): Promise<Amplitude>;
  constructor(apiKey: string, trackSessionEvents?: boolean, eventPrefix?: string, onCreate?: (instance: Amplitude) => void);

  // --------------------------------------------------
  // Identify
  // --------------------------------------------------
  setUserId(userId: string | number | null): void;
  setUserProperties(properties: Record<string, any>): void;
  setOptOut(optOut: boolean): void;
  clearUserProperties(): void;
  getDeviceId(): Promise<string>;
  regenerateDeviceId(): void;
  setLogEventPrefix(prefix: string): void;

  // --------------------------------------------------
  // Track
  // --------------------------------------------------

  logEvent(name: string, properties?: Record<string, any>): void;
  logEventWithTimestamp(name: string, timestamp: number, properties?: Record<string, any>): void;

  // --------------------------------------------------
  // Revenue
  // --------------------------------------------------
  logRevenue(productIdentifier: string, quantity: number, amount: number, receipt?: string): void;
  addToUserProperty(property: string, amount: number): void;
  setUserPropertyOnce(property: string, value: string | number | null): void;
}
