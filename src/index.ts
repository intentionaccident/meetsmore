interface IEvent {
    type: string;
}

class Publisher<T extends IEvent> {
    private subscribers: ((param: T) => void)[] = [];

    public subscribe(subscriber: (param: T) => void): () => void {
        this.subscribers.push(subscriber);
        return () => {
            this.subscribers = this.subscribers.filter(existingSubscriber => existingSubscriber !== subscriber);
        }
    }

    public fire(event: T): void {
        for(const subscriber of this.subscribers) {
            subscriber(event);
        }
    }
}

const publisher = new Publisher<{
    type: string
}>();

publisher.subscribe((event) => {
    console.log("subscriber 1", event.type);
})

const subscription2 = publisher.subscribe((event) => {
    console.log("subscriber 2", event.type);
})

publisher.fire({
    type: "test",
});

subscription2();

publisher.fire({
    type: "test",
});
