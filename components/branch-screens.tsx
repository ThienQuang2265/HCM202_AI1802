'use client';
import { branches } from '../content/branches';
import { chapters } from '../content/chapters';
import { copy } from '../content/copy';
import { convergenceSteps } from '../content/narrative';
import type { BranchId } from '../content/types';
import { useGame } from './game-provider';
import { DocumentaryImage } from './documentary-image';
import { ChapterHead, QuestionPanel, Screen } from './shared';
export function PathsScreen() {
  const {
    session: { game },
    dispatch,
  } = useGame();
  return (
    <Screen>
      <ChapterHead chapter={chapters.paths} />
      <div className="choice-grid">
        {(Object.entries(branches) as [BranchId, typeof branches.world][]).map(
          ([id, p], i) => (
            <button
              type="button"
              key={id}
              className={`choice-card has-image ${id === 'world' ? 'correct' : ''}`}
              onClick={() => dispatch({ type: 'branch', id })}
            >
              <DocumentaryImage src={p.image} alt="" />
              <span className="choice-content">
                <span className="choice-index" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="card-title">{p.title}</span>
                <span className="choice-subtitle">{p.subtitle}</span>
              </span>
              {game.explored.includes(id) && (
                <span className="explored-badge">Đã khám phá</span>
              )}
            </button>
          ),
        )}
      </div>
      <div className="tag-row">
        {[
          'Chọn bất kỳ nhánh nào',
          'Nhánh sai không kết thúc trò chơi',
          'Có thể quay lại khám phá',
        ].map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </Screen>
  );
}
export function BranchScreen() {
  const {
    session: { game },
    dispatch,
  } = useGame();
  const id = game.currentPath!;
  const p = branches[id];
  return (
    <Screen>
      <div className="branch-layout">
        <figure className="branch-portrait">
          <DocumentaryImage src={p.image} alt={p.caption} />
          <figcaption>{p.caption}</figcaption>
        </figure>
        <div>
          <span className="eyebrow">
            Nhánh {id === 'world' ? 'lịch sử' : 'giả định để học'}
          </span>
          <h1 className="chapter-title">{p.title}</h1>
          <p className="lead">{p.subtitle}</p>
          <div className="branch-callout">
            <b>Bối cảnh</b>
            <p>{p.background}</p>
          </div>
          <div className="branch-facts">
            {[
              ['Đóng góp', p.contribution],
              ['Giới hạn', p.limit],
              ['Điều cần mang theo', p.lesson],
            ].map(([title, body]) => (
              <div className="fact" key={title}>
                <b>{title}:</b> {body}
              </div>
            ))}
          </div>
          <QuestionPanel
            eyebrow="Dừng lại một nhịp"
            question={{
              question: p.question,
              options: p.answers,
              correct: p.correct,
              explanation: p.lesson,
            }}
            selected={game.reflections[id]}
            onAnswer={(answer) => dispatch({ type: 'answer', answer })}
          />
          <div className="button-row">
            <button
              className="primary-button"
              disabled={game.reflections[id] === undefined}
              onClick={() => dispatch({ type: 'next' })}
            >
              {id === 'world'
                ? 'Tiếp tục theo dòng lịch sử'
                : 'Chọn hướng đã diễn ra: đi để khảo nghiệm'}{' '}
              →
            </button>
            <button
              className="ghost-button"
              onClick={() => dispatch({ type: 'back-paths' })}
            >
              Khám phá nhánh khác
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
export function ConvergeScreen() {
  const {
    session: { game },
    dispatch,
  } = useGame();
  return (
    <Screen>
      <div className="converge">
        <span className="eyebrow">Các nhánh hội tụ</span>
        <h1 className="chapter-title">{copy.converge.title}</h1>
        <p className="lead">{copy.converge.lead}</p>
        <div className="flow-line">
          {[
            ['Nhìn lại', `${game.explored.length} nhánh đã khám phá`],
            ...convergenceSteps.map((step) => [step.title, step.description]),
          ].map(([title, body]) => (
            <div className="flow-node" key={title}>
              <b>{title}</b>
              <br />
              <small>{body}</small>
            </div>
          ))}
        </div>
        <div className="button-row">
          <button
            className="primary-button"
            onClick={() => dispatch({ type: 'next' })}
          >
            Lên tàu và bắt đầu hành trình →
          </button>
          <button
            className="ghost-button"
            onClick={() => dispatch({ type: 'back-paths' })}
          >
            Trở lại các nhánh
          </button>
        </div>
      </div>
    </Screen>
  );
}
