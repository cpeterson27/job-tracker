import { openDB } from "idb";

const DB_NAME = "jobTrackerDB";
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("jobs")) {
        db.createObjectStore("jobs", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("resumes")) {
        db.createObjectStore("resumes", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("coverLetters")) {
        db.createObjectStore("coverLetters", { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function addItem(storeName, item) {
  const db = await initDB();
  const id = await db.add(storeName, item);
  return id;
}

export async function getAllItems(storeName) {
  const db = await initDB();
  return db.getAll(storeName);
}

export async function deleteItem(storeName, id) {
  const db = await initDB();
  await db.delete(storeName, id);
}

export async function updateItem(storeName, item) {
  const db = await initDB();
  await db.put(storeName, item);
}







