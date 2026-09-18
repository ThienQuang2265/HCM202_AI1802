'use client';
import { useState } from 'react';
import { builderItems } from '../content/builder';
import { chapters } from '../content/chapters';
import { copy } from '../content/copy';
import { preparationMilestones } from '../content/milestones';
import { builderCorrect } from '../lib/game-state';
import { useGame } from './game-provider';
import { ChapterHead, Milestones, Screen } from './shared';
export function BuilderScreen() {
  const {
    session: { game },
    dispatch,
  } = useGame();
  const [message, setMessage] = useState('');
  return (
    <Screen>
      <ChapterHead chapter={chapters.prepare} />
      <div className="builder">
        <div>
          <span className="eyebrow">Các mảnh ghép</span>
          <p className="fineprint" id="builder-help">
            Kéo-thả hoặc bấm vào từng thẻ để xếp chuỗi logic chiến lược. Đây
            không phải niên biểu tuyệt đối. Dùng Tab và Enter để chọn; chọn Xếp
            lại để làm lại chuỗi.
          </p>
          <div className="builder-pool">
            {builderItems.map((item) => (
              <button
                type="button"
                key={item.id}
                draggable={!game.builder.includes(item.id)}
                aria-disabled={game.builder.includes(item.id)}
                aria-describedby="builder-help"
                className={`builder-card ${game.builder.includes(item.id) ? 'selected' : ''}`}
                data-builder={item.id}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', item.id);
                  e.dataTransfer.effectAllowed = 'move';
                }}
                onClick={() => {
                  dispatch({ type: 'add-builder', id: item.id });
                  setMessage(`Đã chọn: ${item.title}`);
                }}
              >
                <span className="drag-icon" aria-hidden="true">
                  ⋮⋮
                </span>
                <span>
                  <b>{item.title}</b>
                  <br />
                  <small>{item.detail}</small>
                  {game.builder.includes(item.id) && (
                    <small className="answer-label">Đã xếp</small>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="eyebrow">Chuỗi chuẩn bị</span>
          <ol className="builder-slots">
            {[0, 1, 2, 3].map((i) => {
              const item = builderItems.find((x) => x.id === game.builder[i]);
              return (
                <li
                  key={i}
                  className={`drop-slot ${item ? 'filled' : ''}`}
                  data-slot={i}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const id = e.dataTransfer.getData('text/plain');
                    const card = builderItems.find((x) => x.id === id);
                    if (!card) return;
                    if (i > game.builder.length) {
                      setMessage('Hãy điền lần lượt từ bước 1.');
                      return;
                    }
                    dispatch({ type: 'add-builder', id: card.id, index: i });
                    setMessage(`Đã xếp: ${card.title}`);
                  }}
                >
                  <span className="slot-number" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>
                    {item ? (
                      <>
                        <b>{item.title}</b>
                        <br />
                        <small>{item.detail}</small>
                      </>
                    ) : (
                      'Thả hoặc chọn một mảnh ghép'
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="builder-actions">
          <p role="status" className="feedback">
            {message || `Đã xếp ${game.builder.length}/4 bước.`}
          </p>
          <div className="button-row">
            <button
              className="primary-button"
              disabled={game.builder.length < 4}
              onClick={() => {
                if (builderCorrect(game.builder))
                  dispatch({ type: 'check-builder' });
                else
                  setMessage(
                    'Chuỗi chưa hợp lý — hãy bắt đầu từ phương hướng lý luận. Chọn Xếp lại để thử lại.',
                  );
              }}
            >
              Kiểm tra chuỗi
            </button>
            <button
              className="ghost-button"
              onClick={() => {
                dispatch({ type: 'reset-builder' });
                setMessage('Đã xóa chuỗi. Hãy xếp lại từ bước 1.');
              }}
            >
              Xếp lại
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
export function PreparationReveal() {
  const { dispatch } = useGame();
  return (
    <Screen>
      <span className="eyebrow">Chuỗi đã hoàn chỉnh · 1920–1930</span>
      <h1 className="chapter-title">{copy.reveal.title}</h1>
      <p className="lead">{copy.reveal.lead}</p>
      <Milestones items={preparationMilestones} artifacts />
      <div className="converge reveal-callout">
        <h2 className="card-title">{copy.reveal.calloutTitle}</h2>
        <p>{copy.reveal.callout}</p>
        <button
          className="primary-button"
          onClick={() => dispatch({ type: 'next' })}
        >
          Đi vào thử thách mới →
        </button>
      </div>
    </Screen>
  );
}
