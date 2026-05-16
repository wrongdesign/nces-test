export interface EventPayload {
    type: string;
    payload?: unknown;
}

type Subscriber = (event: EventPayload) => void;

class EventBus {
    private subscribers: Subscriber[] = [];

    subscribe(fn: Subscriber) {
        this.subscribers.push(fn);

        return () => {
            this.subscribers = this.subscribers.filter((sub) => sub !== fn);
        };
    }

    emit(event: EventPayload) {
        // biome-ignore lint/suspicious/useIterableCallbackReturn: <explanation>
        this.subscribers.forEach((fn) => fn(event));
    }
}

export const eventBus = new EventBus();
