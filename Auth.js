import {
    PersistenceType,
    STORAGE_AVAILABLE_KEY,
    StorageEventListener
  } from '../../core/persistence';
  
  /**
   * Returns a persistence object that wraps `AsyncStorage` imported from
   * `react-native` or `@react-native-community/async-storage`, and can
   * be used in the persistence dependency field in {@link initializeAuth}.
   *
   * @public
   */
  export function getReactNativePersistence(storage) {
    // In the _getInstance() implementation (see src/core/persistence/index.ts),
    // we expect each "externs.Persistence" object passed to us by the user to
    // be able to be instantiated (as a class) using "new". That function also
    // expects the constructor to be empty. Since ReactNativeStorage requires the
    // underlying storage layer, we need to be able to create subclasses
    // (closures, esentially) that have the storage layer but empty constructor.
    return class {
      static type = 'LOCAL';
      type = PersistenceType.LOCAL;
  
      async _isAvailable() {
        try {
          if (!storage) {
            return false;
          }
          await storage.setItem(STORAGE_AVAILABLE_KEY, '1');
          await storage.removeItem(STORAGE_AVAILABLE_KEY);
          return true;
        } catch {
          return false;
        }
      }
  
      _set(key, value) {
        return storage.setItem(key, JSON.stringify(value));
      }
  
      async _get(key) {
        const json = await storage.getItem(key);
        return json ? JSON.parse(json) : null;
      }
  
      _remove(key) {
        return storage.removeItem(key);
      }
  
      _addListener(_key, _listener) {
        // Listeners are not supported for React Native storage.
        return;
      }
  
      _removeListener(_key, _listener) {
        // Listeners are not supported for React Native storage.
        return;
      }
    };
  }
  