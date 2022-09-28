import { query, orderBy, where, collection, getDocs } from '@firebase/firestore';
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from './firebaseConfig';

export const firestoreFetch = async (idCategory) => {
    let q;
    if (idCategory) {

        q = query(
            collection(db, "products"),
            where("categoryId", "==", idCategory)
        );
    } else {
        q = query(collection(db, "products"), orderBy('name'));
    }
    const querySnapshot = await getDocs(q);
    const dataFromFirestore = querySnapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
    }));
    return dataFromFirestore;
}

export const firestoreFetchOne = async (idItem) => {
    const docRef = doc(db, "products", idItem);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            id: idItem,
            ...docSnap.data()
        }
    } else {
        console.log("No hay existencias");
    }
}

export const createOrder = async (order) => {
    const newOrder = doc(collection(db, "orders"));
    await setDoc(newOrder, order);
    return newOrder;
}