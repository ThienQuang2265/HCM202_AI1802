import { describe, expect, it } from 'vitest';
import { branches } from '../../content/branches';
import { builderItems } from '../../content/builder';
import { finalQuestions } from '../../content/questions';
import type { BranchId, GameState } from '../../content/types';
import {
  gameReducer as reduce,
  initialState,
  score,
} from '../../lib/game-state';
import { parseProgress } from '../../lib/storage';
function toFinal(): GameState {
  let s = reduce(initialState(), { type: 'start' });
  s = reduce(s, { type: 'branch', id: 'world' });
  s = reduce(s, { type: 'answer', answer: 0 });
  s = reduce(s, { type: 'next' });
  s = reduce(s, { type: 'next' });
  s = reduce(s, { type: 'answer', answer: 0 });
  s = reduce(s, { type: 'next' });
  for (const item of builderItems)
    s = reduce(s, { type: 'add-builder', id: item.id });
  s = reduce(s, { type: 'check-builder' });
  s = reduce(s, { type: 'next' });
  for (let i = 0; i < 3; i++) {
    s = reduce(s, { type: 'answer', answer: 0 });
    s = reduce(s, { type: 'next' });
  }
  return s;
}
describe('historical journey invariants', () => {
  it('every branch converges, even after an incorrect reflection', () => {
    let s = reduce(initialState(), { type: 'start' });
    for (const id of Object.keys(branches) as BranchId[]) {
      s = reduce(s, { type: 'branch', id });
      expect(reduce(s, { type: 'next' })).toBe(s);
      s = reduce(s, { type: 'answer', answer: (branches[id].correct + 1) % 3 });
      s = reduce(s, { type: 'next' });
      expect(s.view).toBe('converge');
      s = reduce(s, { type: 'back-paths' });
    }
    expect(s.explored).toHaveLength(4);
    expect(Object.keys(s.reflections)).toHaveLength(4);
  });
  it('rejects skipped questions, duplicate cards and out-of-order drop targets', () => {
    let s = toFinal();
    expect(s.view).toBe('final');
    expect(reduce(s, { type: 'next' })).toBe(s);
    s = { ...s, view: 'prepare', builder: [] };
    expect(reduce(s, { type: 'add-builder', id: 'party', index: 3 })).toBe(s);
    s = reduce(s, { type: 'add-builder', id: 'party' });
    expect(reduce(s, { type: 'add-builder', id: 'party' })).toBe(s);
    expect(reduce(s, { type: 'check-builder' })).toBe(s);
  });
  it.each([0, 1, 2, 3, 4, 5, 6])(
    'scores exactly %i/6 and resets all prior progress',
    (target) => {
      let s = toFinal();
      for (const [i, q] of finalQuestions.entries()) {
        s = reduce(s, {
          type: 'answer',
          answer: i < target ? q.correct : (q.correct + 1) % 3,
        });
        const locked = reduce(s, { type: 'answer', answer: 2 });
        expect(locked).toBe(s);
        s = reduce(s, { type: 'next' });
      }
      expect(s.view).toBe('results');
      expect(score(s)).toBe(target);
      expect(parseProgress(JSON.stringify(s))).toEqual(s);
      expect(reduce(s, { type: 'reset' })).toEqual(initialState());
    },
  );
  it('restores partial progress through every screen', () => {
    const s = toFinal();
    expect(parseProgress(JSON.stringify(s))).toEqual(s);
    const partial = reduce(s, { type: 'answer', answer: 1 });
    expect(parseProgress(JSON.stringify(partial))).toEqual(partial);
  });
  it.each([
    'broken',
    'null',
    '[]',
    '{"version":9}',
    JSON.stringify({ ...initialState(), view: 'branch' }),
    JSON.stringify({ ...initialState(), view: ['start'] }),
    JSON.stringify({ ...initialState(), currentPath: ['world'] }),
    JSON.stringify({ ...initialState(), view: 'results' }),
    JSON.stringify({ ...initialState(), finalIndex: 99 }),
    JSON.stringify({ ...initialState(), builder: ['theory', 'theory'] }),
    JSON.stringify({ ...initialState(), reflections: { world: 8 } }),
  ])('rejects corrupt or unreachable saved progress: %s', (raw) =>
    expect(parseProgress(raw)).toBeNull(),
  );
});
