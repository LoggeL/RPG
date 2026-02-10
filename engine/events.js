/** Pub/Sub Event Bus */
class EventBus {
  constructor() {
    this._listeners = new Map();
  }

  on(event, callback) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    const set = this._listeners.get(event);
    if (set) set.delete(callback);
  }

  emit(event, data) {
    const set = this._listeners.get(event);
    if (set) {
      for (const cb of set) {
        try { cb(data); } catch (e) { console.error(`Event handler error [${event}]:`, e); }
      }
    }
  }
}

export const events = new EventBus();
