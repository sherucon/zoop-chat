import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const getUsers = async () => {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => doc.data());
    console.log(userList);
    return userList;
};
export { getUsers };
