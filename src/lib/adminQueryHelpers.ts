/**
 * Wraps a promise with a timeout. Rejects if the promise doesn't resolve within `ms` milliseconds.
 */
export function withTimeout<T>(promise: Promise<T>, ms = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("İstek zaman aşımına uğradı")), ms)
    ),
  ]);
}
