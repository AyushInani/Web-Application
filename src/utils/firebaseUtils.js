import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const getOrgOfUser = async (uid) => {
  const orgCollectionRef = await collection(db, "newone");
  const q = query(orgCollectionRef);
  const data = await getDocs(q);
  console.log("inside", data.docs);
  for (var i = 0; i < data.docs.length; i++) {
    if (data.docs[i].data().users.includes(uid)) {
      console.log("got", data.docs[i].data());
      return data.docs[i];
    }
  }
};

const getUserDetails = async (uid) => {
  const userCollectionRef = await collection(db, "newone");
  const q = query(userCollectionRef, where("uid", "==", uid));
  const data = await getDocs(q);
  if (data.docs.length === 0) return undefined;
  return { data: data.docs[0].data(), id: data.docs[0].id };
};

const getOrgDetails = async (uid) => {
  const data = await getOrgOfUser(uid);
  console.log(data);
  return { data: data.data(), id: data.id };
};

const addOrUpdateUserDocs = async (uid, userDetails) => {
  const userCollectionRef = collection(db, "newone");
  const q = query(userCollectionRef, where("uid", "==", uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    await addDoc(collection(db, "newone"), userDetails);
  } else {
    const userDoc = doc(db, "newone", docs.docs[0].id);
    await updateDoc(userDoc, { ...userDetails });
  }
};

const addOrUpdateOrgDocs = async (uid, orgDetails) => {
  const docs = await getOrgOfUser(uid);
  console.log("docs", docs);
  if (docs === undefined) {
    console.log("no uid");
    await addDoc(collection(db, "newone"), orgDetails);
  } else {
    const orgDoc = doc(db, "newone", docs.id);
    //   console.log(orgDoc);
    await updateDoc(orgDoc, { ...orgDetails });
  }
};

const getTuts = async () => {
  const orgCollectionRef = collection(db, "newone");
  const q = query(orgCollectionRef);
  const data = await getDocs(q);
  const tuts = [];
  data.docs.forEach((org) => {
    org.data().tuts.forEach((tutorial) => {
      // console.log(tutorial);
      tuts.push({ ...tutorial, organization: org.data().orgName });
    });
  });
  return tuts;
};

const addOrUpdateTuts = async (uid, tutorial) => {
  console.log(uid);
  const docs = await getOrgOfUser(uid);
  // console.log(docs.data(), docs.id);
  const orgDetails = docs.data();
  const orgDoc = doc(db, "newone", docs.id);
  if (orgDetails.tuts === undefined) orgDetails["tuts"] = [tutorial];
  else {
    var update = false;
    for (var i = 0; i < orgDetails.tuts.length; i++) {
      if (orgDetails.tuts[i].Title === tutorial.Title) {
        orgDetails.tuts[i] = tutorial;
        update = true;
      }
    }
    if (update === false) orgDetails.tuts.push(tutorial);
  }
  await updateDoc(orgDoc, { ...orgDetails });
};

export {
  getUserDetails,
  addOrUpdateUserDocs,
  getOrgDetails,
  addOrUpdateOrgDocs,
  getTuts,
  addOrUpdateTuts
};
