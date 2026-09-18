'use client';
import type { CSSProperties } from 'react';
import { copy } from '../content/copy';
import { finalIntroduction } from '../content/narrative';
import { finalQuestions } from '../content/questions';
import { timeline } from '../content/timeline';
import { score } from '../lib/game-state';
import { useGame } from './game-provider';
import { QuestionPanel, Screen } from './shared';
export function FinalQuiz() {
  const {
    session: { game },
    dispatch,
  } = useGame();
  return (
    <Screen>
      <div className="final-quiz">
        <span className="eyebrow">
          Tổng kết · Câu {game.finalIndex + 1}/{finalQuestions.length}
        </span>
        <h1 className="chapter-title">Ghép lại hành trình</h1>
        <p className="lead">{finalIntroduction}</p>
        <QuestionPanel
          key={game.finalIndex}
          question={finalQuestions[game.finalIndex]}
          selected={game.finalAnswers[game.finalIndex]}
          onAnswer={(answer) => dispatch({ type: 'answer', answer })}
        >
          <div className="button-row">
            <button
              className="primary-button"
              onClick={() => dispatch({ type: 'next' })}
            >
              {game.finalIndex === 5 ? 'Xem kết quả' : 'Câu tiếp theo'} →
            </button>
          </div>
        </QuestionPanel>
      </div>
    </Screen>
  );
}
export function ResultsScreen() {
  const {
    session: { game },
    dispatch,
  } = useGame();
  const total = score(game);
  const pct = Math.round((total / 6) * 100);
  return (
    <Screen>
      <div className="final-grid">
        <aside className="score-card">
          <span className="eyebrow">Hành trình hoàn thành</span>
          <div
            className="score-ring"
            style={{ '--score-angle': `${pct * 3.6}deg` } as CSSProperties}
          >
            <span>
              <b>{total}/6</b>
              <small>{pct}% chính xác</small>
            </span>
          </div>
          <h2 className="card-title">
            {pct >= 80
              ? 'Bạn đã nắm được mạch chính'
              : pct >= 50
                ? 'Bạn đã thấy được các bước ngoặt'
                : 'Hãy thử lại để nối rõ các mốc'}
          </h2>
          <p className="fineprint">
            Đã khám phá {game.explored.length}/4 nhánh ở chặng 1911.
          </p>
          <div className="button-row">
            <button
              className="primary-button"
              onClick={() => dispatch({ type: 'map' })}
            >
              Xem toàn bộ timeline
            </button>
            <button
              className="ghost-button"
              onClick={() => dispatch({ type: 'reset' })}
            >
              Chơi lại từ đầu
            </button>
          </div>
        </aside>
        <div>
          <span className="eyebrow">Điều mang theo</span>
          <h1 className="chapter-title">{copy.results.title}</h1>
          <p className="lead">{copy.results.lead}</p>
          <div className="result-list">
            {finalQuestions.map((q, i) => (
              <article className="result-item" key={q.question}>
                <h2 className="card-title">
                  {i + 1}. {q.question}
                </h2>
                <p>
                  <b>
                    {game.finalAnswers[i] === q.correct ? 'Đúng' : 'Chưa đúng'}
                  </b>{' '}
                  Bạn chọn: {q.options[game.finalAnswers[i]]}
                </p>
                <p>Đáp án đúng: {q.options[q.correct]}</p>
                <p>{q.explanation}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}
export function MapScreen() {
  const { dispatch } = useGame();
  return (
    <Screen>
      <span className="eyebrow">Bản đồ sau hành trình</span>
      <h1 className="chapter-title">Toàn bộ flow trong một màn hình</h1>
      <p className="lead">
        Dùng trang này như bản tóm tắt nội dung và logic điều hướng của hành
        trình.
      </p>
      <div className="chapter-map">
        {timeline.map((m) => (
          <article className="map-card" key={m.year}>
            <time>{m.year}</time>
            <h2 className="card-title">{m.title}</h2>
            <p>{m.description}</p>
          </article>
        ))}
      </div>
      <div className="button-row">
        <button
          className="primary-button"
          onClick={() => dispatch({ type: 'reset' })}
        >
          Chơi lại
        </button>
        <button
          className="ghost-button"
          onClick={() => dispatch({ type: 'results' })}
        >
          Trở về kết quả
        </button>
      </div>
    </Screen>
  );
}
