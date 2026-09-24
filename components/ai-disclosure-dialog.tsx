'use client';

import { useRef } from 'react';
import { containDialogFocus } from '../lib/dialog-focus';

export function AiDisclosureDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className="footer-link"
        aria-haspopup="dialog"
        onClick={() => ref.current?.showModal()}
      >
        Khai báo sử dụng AI
      </button>
      <dialog
        ref={ref}
        className="modal"
        aria-labelledby="ai-disclosure-title"
        onKeyDown={containDialogFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            ) {
              ref.current?.close();
            }
          }
        }}
      >
        <div className="modal-head">
          <div>
            <span className="eyebrow">Minh bạch trong quá trình thực hiện</span>
            <h2 id="ai-disclosure-title">Khai báo sử dụng AI</h2>
          </div>
          <button
            type="button"
            className="close-button"
            aria-label="Đóng khai báo sử dụng AI"
            onClick={() => ref.current?.close()}
          >
            ×
          </button>
        </div>
        <div className="modal-body ai-disclosure-content">
          <section>
            <h3>AI hỗ trợ thiết kế website</h3>
            <p>
              Ý tưởng, cách tương tác và trải nghiệm của website do nhóm đề
              xuất. AI được sử dụng như một công cụ hỗ trợ hiện thực hóa những ý
              tưởng đó thành giao diện website.
            </p>
          </section>
          <section>
            <h3>AI hỗ trợ trình bày và bổ sung nội dung</h3>
            <p>
              Nội dung chính của website được xây dựng dựa trên bài thuyết trình
              do nhóm biên soạn trước. AI hỗ trợ chuyển nội dung đã soạn sang
              hình thức phù hợp với website, đồng thời gợi ý và tìm kiếm một số
              thông tin bổ sung. Nhóm đã kiểm tra lại nội dung và đối chiếu các
              nguồn thông tin trước khi đưa lên website.
            </p>
          </section>
        </div>
      </dialog>
    </>
  );
}
