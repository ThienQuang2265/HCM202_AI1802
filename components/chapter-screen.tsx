'use client';
import { chapters } from '../content/chapters';
import type { QuizChapterId } from '../content/types';
import { useGame } from './game-provider';
import { ChapterHead, Milestones, QuestionPanel, Screen } from './shared';
export function ChapterScreen({ id }: { id: QuizChapterId }) {
  const {
    session: { game },
    dispatch,
  } = useGame();
  const chapter = chapters[id];
  const selected = game.chapterAnswers[id];
  return (
    <Screen>
      <ChapterHead chapter={chapter} />
      {chapter.context.length > 0 && (
        <div className="context-strip">
          {chapter.context.map((item) => (
            <div key={item.title}>
              <b>{item.title}</b>
              <small>{item.description}</small>
            </div>
          ))}
        </div>
      )}
      {chapter.milestones.length > 0 && (
        <Milestones items={chapter.milestones} />
      )}
      <QuestionPanel
        question={chapter.question}
        selected={selected}
        onAnswer={(answer) => dispatch({ type: 'answer', answer })}
      >
        <div className="button-row">
          <button
            className="primary-button"
            onClick={() => dispatch({ type: 'next' })}
          >
            Tiếp tục →
          </button>
        </div>
      </QuestionPanel>
      {selected !== undefined && chapter.artifacts.length > 0 && (
        <Milestones items={chapter.artifacts} artifacts />
      )}
    </Screen>
  );
}
