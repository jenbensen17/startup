const DashboardEvent = {
    Post: 'post',
    Like: 'like',
    Comment: 'comment',
};

class EventMessage {
    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class DashboardEventNotifier {
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onmessage = async (msg) => {
            try {
              const event = JSON.parse(await msg.data.text());
              this.receiveEvent(event);
            } catch {}
        };
    }

    broadcastEvent(from, type, value) {
        const event = new EventMessage(from, type, value);
        this.socket.send(JSON.stringify(event));
      }
    
      addHandler(handler) {
        this.handlers.push(handler);
      }
    
      removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
      }
    
      receiveEvent(event) {
        this.events.push(event);
        console.log(event)
        this.events.forEach((e) => {
          this.handlers.forEach((handler) => {
            handler(e);
          });
        });
      }
    }
    
    const DashboardNotifier = new DashboardEventNotifier();
    export { DashboardEvent, DashboardNotifier };
    
