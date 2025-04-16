// src/lib/events.ts

import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function getAllEvents() {
  const snapshot = await getDocs(collection(db, 'events'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createEvent(data: {
  title: string;
  date: string;
  time: string;
  location: string;
  link: string;
  description: string;
}) {
  const docRef = await addDoc(collection(db, 'events'), data);
  return { id: docRef.id, ...data };
}
