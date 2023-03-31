import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";

export async function writeToDB(data) {
  console.log(data);
  // Add a new document with a generated id.
  try {
    const docRef = await addDoc(collection(firestore, "goals"), {
      ...data,
      user: auth.currentUser.uid,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(deletedId) {
  try {
    await deleteDoc(doc(firestore, "goals", deletedId));
  } catch (err) {
    console.log(err);
  }
}
