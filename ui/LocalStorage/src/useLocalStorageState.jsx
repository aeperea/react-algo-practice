import {useState, useEffect, useCallback, useRef} from 'react';

function safeJsonParse(raw) {
  if (raw === null) return {ok: false};
  try {
    return {ok: true, value: JSON.parse(raw)};
  } catch {
    return {ok: false};
  }
}

function safeJsonStringify(value) {
  if (value === null) return {ok: false};
  try {
    return {ok: true, value: JSON.stringify(value)};
  } catch {
    return {ok: false};
  }
}


export default function useLocalStorageState(key, initialValue) {
  const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

  // Resolve initialValue lazily and only when needed
  const resolveInitial = useCallback(() => {
    return typeof initialValue === "function"
      ? (initialValue)()
      : initialValue;
  }, [initialValue]);

  // Keep a ref of the key for event handlers (helps avoid stale closures)
  const keyRef = useRef(key);
  useEffect(() => {
    keyRef.current = key;
  }, [key]);

  const [state, setState] = useState(() => {
    if (!isBrowser) return resolveInitial();

    const parsed = safeJsonParse(window.localStorage.getItem(key));
    if (parsed.ok) return parsed.value;

    // If missing/invalid, seed localStorage with initial value (optional but nice)
    const init = resolveInitial();
    const str = safeJsonStringify(init);
    if (str.ok) window.localStorage.setItem(key, str.value);
    return init;
  });

  const setValue = useCallback(
    (next) => {
      setState((prev) => {
        const computed = typeof next === "function" ? (next)(prev) : next;

        if (isBrowser) {
          const str = safeJsonStringify(computed);
          if (str.ok) {
            window.localStorage.setItem(keyRef.current, str.value);
          } else {
            // If stringify fails, we still update React state,
            // but we cannot persist (circular refs, BigInt, etc.)
            // In an interview, call this out as an intentional tradeoff.
          }
        }

        return computed;
      });
    },
    [isBrowser]
  );

  // Cross-tab sync (fires in *other* tabs when localStorage changes)
  useEffect(() => {
    if (!isBrowser) return;

    const onStorage = (e) => {
      if (e.storageArea !== window.localStorage) return;
      if (e.key !== keyRef.current) return;

      // If removed, fall back to initial
      if (e.newValue == null) {
        setState(resolveInitial());
        return;
      }

      const parsed = safeJsonParse(e.newValue);
      if (parsed.ok) {
        setState(parsed.value);
      } else {
        // If another tab wrote invalid JSON, ignore and keep current
        // (or choose to fallback to initial — either is defensible)
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [isBrowser, resolveInitial]);


  return [state, setValue];
}
