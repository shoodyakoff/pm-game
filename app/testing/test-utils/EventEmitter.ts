type EventHandler<T = any> = (event: { detail: T }) => void;

export class TestEventEmitter {
  private listeners: Record<string, EventHandler[]> = {};

  addEventListener<T>(event: string, callback: EventHandler<T>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  removeEventListener(event: string, callback: Function) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  dispatchEvent(event: string, detail: any) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => {
      callback({ detail });
    });
  }
}

export const testEventEmitter = new TestEventEmitter(); 