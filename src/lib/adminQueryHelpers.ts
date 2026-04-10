/**
 * Wraps a Supabase query builder (or any PromiseLike/Promise) with a timeout.
 * Supabase query builders are thenables, so we convert them to a real Promise first.
 */
export function withTimeout<T>(promiseOrThenable: PromiseLike<T>, ms = 5000): Promise<T> {
  const promise = Promise.resolve(promiseOrThenable);
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("İstek zaman aşımına uğradı")), ms)
    ),
  ]);
}
