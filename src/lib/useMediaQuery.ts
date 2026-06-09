import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media-query hook. Reads the real match on the client's first render
 * (via useSyncExternalStore) rather than after an effect, so layout that depends
 * on it doesn't flash the desktop variant on mobile. Server renders `false`,
 * matching the pre-hydration markup.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
