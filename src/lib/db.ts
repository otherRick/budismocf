// src/lib/db.ts
type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  link: string;
  description: string;
};

// eslint-disable-next-line prefer-const
let events: Event[] = [];

export const db = {
  getEvents: () => events,
  createEvent: (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    events.push(newEvent);
    return newEvent;
  }
};
