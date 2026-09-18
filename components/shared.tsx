import type { ReactNode } from 'react';
import type { Chapter, Milestone, Question } from '../content/types';
import { DocumentaryImage } from './documentary-image';
export function Screen({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`screen ${className}`}>
      <div className="screen-inner">{children}</div>
    </section>
  );
}
export function ChapterHead({ chapter }: { chapter: Chapter }) {
  return (
    <div className="chapter-head">
      <div>
        <span className="eyebrow">{chapter.label}</span>
        <h1 className="chapter-title">{chapter.title}</h1>
        <p className="lead">{chapter.lead}</p>
      </div>
      <figure className="chapter-image">
        <DocumentaryImage src={chapter.image.src} alt={chapter.image.alt} />
        <figcaption className="image-caption">
          {chapter.image.caption}
        </figcaption>
      </figure>
    </div>
  );
}
export function Milestones({
  items,
  artifacts = false,
}: {
  items: Milestone[];
  artifacts?: boolean;
}) {
  return (
    <div className={artifacts ? 'artifact-grid' : 'timeline'}>
      {items.map((item) => (
        <article
          key={item.year}
          className={artifacts ? 'artifact' : 'timeline-item'}
        >
          <time className={artifacts ? '' : 'timeline-year'}>{item.year}</time>
          <div className={artifacts ? '' : 'timeline-card'}>
            <h2 className="card-title">{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
export function QuestionPanel({
  question,
  selected,
  onAnswer,
  children,
  eyebrow = 'Quyết định của bạn',
}: {
  question: Question;
  selected: number | undefined;
  onAnswer: (answer: number) => void;
  children?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="quiz-panel">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="card-title">{question.question}</h2>
      <div className="quiz-options">
        {question.options.map((option, i) => (
          <button
            key={option}
            type="button"
            className={`quiz-option ${selected !== undefined ? (i === question.correct ? 'is-correct' : i === selected ? 'is-wrong' : '') : ''}`}
            aria-disabled={selected !== undefined}
            aria-pressed={selected === i}
            onClick={() => {
              if (selected === undefined) onAnswer(i);
            }}
          >
            <span aria-hidden="true">{String.fromCharCode(65 + i)}</span>
            <span>
              {option}
              {selected !== undefined && i === question.correct && (
                <small className="answer-label">Đáp án đúng</small>
              )}
              {selected === i && i !== question.correct && (
                <small className="answer-label">
                  Bạn đã chọn · Chưa chính xác
                </small>
              )}
            </span>
          </button>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true">
        {selected !== undefined && (
          <p className="feedback">
            <b>
              {selected === question.correct ? 'Chính xác.' : 'Chưa chính xác.'}
            </b>{' '}
            {question.explanation}
          </p>
        )}
      </div>
      {selected !== undefined && children}
    </div>
  );
}
