import { useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Icon } from '../Icon';
import './PhotoListField.css';

export interface PhotoEntry {
  id: string;
  file: File;
  previewUrl: string;
}

interface PhotoListFieldProps {
  photos: PhotoEntry[];
  onChange: (photos: PhotoEntry[]) => void;
  required?: boolean;
}

export function PhotoListField({ photos, onChange, required }: PhotoListFieldProps) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const additions: PhotoEntry[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    onChange([...photos, ...additions]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const remove = (id: string) => {
    onChange(photos.filter((p) => p.id !== id));
  };

  return (
    <div className="field">
      <label className="field__label">
        {t('package.photoLabel')}
        {required && <span className="field__required"> *</span>}
      </label>

      {photos.length > 0 && (
        <ul className="photo-list">
          {photos.map((photo) => (
            <li className="photo-list__item" key={photo.id}>
              <img src={photo.previewUrl} alt="" className="photo-list__thumb" />
              <span className="photo-list__name">{photo.file.name}</span>
              <button
                type="button"
                className="photo-list__remove"
                onClick={() => remove(photo.id)}
                aria-label={t('package.removePhoto')}
              >
                <Icon name="close" size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <button type="button" className="photo-list__add" onClick={() => inputRef.current?.click()}>
        {t('package.addPhoto')}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/gif,image/jpeg"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      <p className="field__hint">{t('package.photoHint')}</p>
    </div>
  );
}
