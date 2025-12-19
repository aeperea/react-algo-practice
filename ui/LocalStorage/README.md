### Problem description

- Implement useLocalStorageState(key, initialValue):
- Returns [value, setValue]
- Reads from localStorage on init (with JSON parse)
- Writes on change
- Keeps multiple tabs in sync via the "storage" event
- Handles invalid JSON gracefully
