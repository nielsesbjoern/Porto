import { useId, useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";
import {
  addPhoto,
  compressImage,
  deletePhoto,
  listPhotosByStop,
  type PhotoRecord,
} from "../utils/photos";

interface StopPhotosProps {
  stopId: string;
  /** grid = stop detail; book = album chapter */
  layout?: "grid" | "book";
}

export function StopPhotos({ stopId, layout = "grid" }: StopPhotosProps) {
  const { t, format } = useI18n();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<PhotoRecord[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const rows = await listPhotosByStop(stopId);
        if (cancelled) return;
        setPhotos(rows);
      } catch {
        if (!cancelled) setError(t.ui.photoError);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [stopId, t.ui.photoError]);

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const photo of photos) {
      next[photo.id] = URL.createObjectURL(photo.blob);
    }
    setUrls(next);
    return () => {
      for (const url of Object.values(next)) URL.revokeObjectURL(url);
    };
  }, [photos]);

  async function onFilesSelected(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError(null);
    try {
      const added: PhotoRecord[] = [];
      for (const file of Array.from(files)) {
        const blob = await compressImage(file);
        added.push(await addPhoto(stopId, blob));
      }
      setPhotos((prev) => [...prev, ...added]);
    } catch {
      setError(t.ui.photoError);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function onDelete(id: string) {
    setError(null);
    try {
      await deletePhoto(id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError(t.ui.photoError);
    }
  }

  const fileInput = (
    <input
      ref={inputRef}
      id={inputId}
      type="file"
      accept="image/*"
      multiple
      className="sr-only"
      disabled={busy}
      onChange={(e) => void onFilesSelected(e.target.files)}
    />
  );

  const addLabel = (
    <label
      htmlFor={inputId}
      className={`btn-ghost meta-mono inline-flex min-h-11 cursor-pointer items-center px-3.5 py-2.5 ${
        busy ? "pointer-events-none opacity-60" : ""
      }`}
    >
      {busy ? t.ui.photoSaving : t.ui.addPhotos}
    </label>
  );

  if (layout === "book") {
    return (
      <div className="photo-book__media">
        <div className="flex items-center justify-between gap-3">
          <p className="meta-mono text-[color:var(--color-muted)]">
            {photos.length === 0
              ? t.ui.photosEmptyStop
              : format(t.album.photoCount, { n: photos.length })}
          </p>
          {addLabel}
          {fileInput}
        </div>

        {error && (
          <p className="mt-3 text-[0.9rem] text-[color:var(--color-burgundy)]">
            {error}
          </p>
        )}

        {photos.length > 0 && (
          <div className="photo-book__polaroids mt-5">
            {photos.map((photo, photoIndex) => (
              <figure
                key={photo.id}
                className={`photo-book__polaroid photo-book__polaroid--${(photoIndex % 3) + 1} group`}
              >
                <img src={urls[photo.id]} alt="" loading="lazy" />
                <button
                  type="button"
                  onClick={() => void onDelete(photo.id)}
                  className="meta-mono absolute right-2 top-2 bg-[color:var(--color-ink)]/75 px-2 py-1 text-[0.7rem] text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                >
                  {t.ui.deletePhoto}
                </button>
              </figure>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="mt-6 border-t border-[color:var(--color-line)] pt-5">
      <div className="flex items-center justify-between gap-3">
        <p className="meta-mono text-[color:var(--color-burgundy)]">
          {t.ui.photosLabel}
        </p>
        {addLabel}
        {fileInput}
      </div>

      {error && (
        <p className="mt-3 text-[0.9rem] text-[color:var(--color-burgundy)]">
          {error}
        </p>
      )}

      {photos.length === 0 ? (
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--color-muted)]">
          {t.ui.photosEmptyStop}
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {photos.map((photo) => (
            <li key={photo.id} className="group relative overflow-hidden">
              <img
                src={urls[photo.id]}
                alt=""
                className="aspect-[4/5] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => void onDelete(photo.id)}
                className="meta-mono absolute right-1.5 top-1.5 bg-[color:var(--color-ink)]/75 px-2 py-1 text-[0.7rem] text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
              >
                {t.ui.deletePhoto}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
