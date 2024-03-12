import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import React from "react";
import { app } from "./Config";
import { getFirestore } from "firebase/firestore";

const database = getFirestore(app);
export const addtoDB = (uid, data, date, notes, handleSetNotes) => {
  const collectionRef = collection(database, uid);
  addDoc(collectionRef, {
    text: data,
    date: date,
    timeStamp: serverTimestamp(),
  })
    .then((doc) => {
      const newNote = {
        id: doc.id,
        text: data,
        date: date,
      };
      const newNotes = [newNote, ...notes];
      handleSetNotes(newNotes);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export const getfromDB = async (uid, notes, handleSetNotes) => {
  const collectionRef = collection(database, uid);
  const q = query(collectionRef, orderBy("timeStamp", "desc"));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size === 0) {
    const date = new Date();
    addtoDB(
      uid,
      "Default Note",
      date.toLocaleDateString(),
      notes,
      handleSetNotes
    );
  }
  let newNotes = [...notes];
  querySnapshot.forEach((doc) => {
    const newNote = doc.data();
    newNote.id = doc.id;
    newNotes = [...newNotes, newNote];
  });
  handleSetNotes(newNotes);
};
export const deletefromDB = async (uid, id) => {
  const collectionRef = doc(database, uid, id);
  await deleteDoc(collectionRef);
};
export const updatetoDB = async (uid, id, text) => {
  const collectionRef = doc(database, uid, id);
  const date = new Date();
  await updateDoc(collectionRef, {
    text: text,
    timeStamp: serverTimestamp(),
    date: date.toLocaleDateString(),
  });
};
const FireStore = () => {
  return <div></div>;
};
export default FireStore;
