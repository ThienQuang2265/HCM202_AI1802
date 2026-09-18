'use client';
import { useRef } from 'react';
import { sources } from '../content/sources';
import { copy } from '../content/copy';
import { containDialogFocus } from '../lib/dialog-focus';
export function SourcesDialog({ hero = false }: { hero?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className={hero ? 'ghost-button' : 'icon-button'}
        type="button"
        aria-haspopup="dialog"
        onClick={() => ref.current?.showModal()}
      >
        {hero ? 'Xem nguồn tư liệu' : 'Nguồn tư liệu'}
      </button>
      <dialog
        onKeyDown={containDialogFocus}
        ref={ref}
        className="modal"
        aria-labelledby={hero ? 'hero-sources-title' : 'sources-title'}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const rect = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < rect.left ||
              e.clientX > rect.right ||
              e.clientY < rect.top ||
              e.clientY > rect.bottom
            )
              ref.current?.close();
          }
        }}
      >
        <div className="modal-head">
          <div>
            <span className="eyebrow">Đối chiếu nội dung</span>
            <h2 id={hero ? 'hero-sources-title' : 'sources-title'}>
              Nguồn tư liệu &amp; hình ảnh
            </h2>
          </div>
          <button
            type="button"
            className="close-button"
            aria-label="Đóng nguồn tư liệu"
            onClick={() => ref.current?.close()}
          >
            ×
          </button>
        </div>
        <div className="modal-body sources-list">
          <p>{copy.sources.intro.replace('Prototype dùng', 'Nội dung dùng')}</p>
          <ol>
            {sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.title}
                  <span className="sr-only"> (mở tab mới)</span>
                </a>
              </li>
            ))}
          </ol>
          <p className="fineprint">{copy.sources.fineprint}</p>
        </div>
      </dialog>
    </>
  );
}
