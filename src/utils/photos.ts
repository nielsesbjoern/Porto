const DB_NAME = "andrade-schade-porto-photos";
const DB_VERSION = 1;
const STORE = "photos";

export interface PhotoRecord {
  id: string;
  stopId: string;
  createdAt: number;
  blob: Blob;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("stopId", "stopId", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB open failed"));
  });
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB tx failed"));
    tx.onabort = () => reject(tx.error ?? new Error("IndexedDB tx aborted"));
  });
}

export async function listPhotosByStop(stopId: string): Promise<PhotoRecord[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const index = tx.objectStore(STORE).index("stopId");
    const req = index.getAll(stopId);
    req.onsuccess = () => {
      const rows = (req.result as PhotoRecord[]).sort(
        (a, b) => a.createdAt - b.createdAt,
      );
      resolve(rows);
    };
    req.onerror = () => reject(req.error ?? new Error("listPhotosByStop failed"));
  });
}

export async function listAllPhotos(): Promise<PhotoRecord[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => {
      const rows = (req.result as PhotoRecord[]).sort(
        (a, b) => a.createdAt - b.createdAt,
      );
      resolve(rows);
    };
    req.onerror = () => reject(req.error ?? new Error("listAllPhotos failed"));
  });
}

export async function addPhoto(stopId: string, blob: Blob): Promise<PhotoRecord> {
  const record: PhotoRecord = {
    id: crypto.randomUUID(),
    stopId,
    createdAt: Date.now(),
    blob,
  };
  const db = await openDb();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).add(record);
  await txDone(tx);
  return record;
}

export async function deletePhoto(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).delete(id);
  await txDone(tx);
}

/** Downscale camera shots so IndexedDB stays manageable on phones. */
export async function compressImage(
  file: File,
  maxEdge = 1600,
  quality = 0.82,
): Promise<Blob> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Not an image");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Canvas unavailable");
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality),
  );
  if (!blob) throw new Error("Compress failed");
  return blob;
}
