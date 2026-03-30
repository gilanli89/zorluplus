/**
 * hizli.io Courier API wrapper
 * Currently uses MOCK data — replace with real API calls when ready.
 */

const HIZLI_API_KEY = import.meta.env.VITE_HIZLI_API_KEY as string | undefined;
const HIZLI_BASE_URL = "https://api.hizli.io/v1";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ShippingQuote {
  price: number;
  currency: string;
  estimatedDelivery: string;
  provider: string;
}

export interface ShipmentResult {
  trackingId: string;
  status: string;
  estimatedDelivery: string;
}

export interface TrackingUpdate {
  date: string;
  status: string;
  location: string;
}

export interface TrackingInfo {
  trackingId: string;
  status: "pending" | "picked_up" | "in_transit" | "delivered";
  statusText: string;
  updates: TrackingUpdate[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function generateTrackingId(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `HZL-${random}`;
}

// ── API Functions ────────────────────────────────────────────────────────────

/**
 * Get a shipping quote for a given weight and destination.
 */
// TODO: Replace with real hizli.io API when key is configured
export async function getShippingQuote(
  _weight: number,
  _destination: string
): Promise<ShippingQuote> {
  // When the real API is ready, use HIZLI_API_KEY and HIZLI_BASE_URL
  void HIZLI_API_KEY;
  void HIZLI_BASE_URL;

  return {
    price: 350,
    currency: "TRY",
    estimatedDelivery: "1-2 saat",
    provider: "Hızlı Kurye",
  };
}

/**
 * Create a new shipment for an order.
 */
// TODO: Replace with real hizli.io API when key is configured
export async function createShipment(
  _orderId: string,
  _address: string,
  _phone: string
): Promise<ShipmentResult> {
  const trackingId = generateTrackingId();

  return {
    trackingId,
    status: "pending",
    estimatedDelivery: "1-2 saat",
  };
}

/**
 * Track an existing shipment by its tracking ID.
 */
// TODO: Replace with real hizli.io API when key is configured
export async function trackShipment(
  trackingId: string
): Promise<TrackingInfo> {
  const now = new Date();

  return {
    trackingId,
    status: "in_transit",
    statusText: "Kurye yolda",
    updates: [
      {
        date: new Date(now.getTime() - 60 * 60 * 1000).toISOString(),
        status: "Gönderi oluşturuldu",
        location: "Lefkoşa Merkez",
      },
      {
        date: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
        status: "Kurye teslim aldı",
        location: "Lefkoşa Merkez",
      },
      {
        date: now.toISOString(),
        status: "Kurye yolda",
        location: "Lefkoşa",
      },
    ],
  };
}
