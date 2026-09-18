import { branches } from '../content/branches';
import { builderItems } from '../content/builder';
import { finalQuestions } from '../content/questions';
import type {
  BranchId,
  BuilderId,
  GameState,
  QuizChapterId,
  View,
} from '../content/types';

export const initialState = (): GameState => ({
  version: 1,
  view: 'start',
  explored: [],
  currentPath: null,
  reflections: {},
  chapterAnswers: {},
  builder: [],
  finalIndex: 0,
  finalAnswers: [],
});
export type GameAction =
  | {
      type:
        | 'start'
        | 'reset'
        | 'back-paths'
        | 'next'
        | 'reset-builder'
        | 'check-builder'
        | 'map'
        | 'results';
    }
  | { type: 'branch'; id: BranchId }
  | { type: 'answer'; answer: number }
  | { type: 'add-builder'; id: BuilderId; index?: number };
export const builderCorrect = (items: BuilderId[]) =>
  items.join() === builderItems.map((x) => x.id).join();
export const score = (state: GameState) =>
  finalQuestions.reduce(
    (n, q, i) => n + Number(q.correct === state.finalAnswers[i]),
    0,
  );
export function chapterIndex(view: View) {
  return [
    ['paths', 'branch', 'converge'],
    ['observe'],
    ['prepare', 'prepare-reveal'],
    ['challenge'],
    ['liberation'],
    ['independence'],
    ['final', 'results', 'map'],
  ].findIndex((views) => views.includes(view));
}
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'reset':
      return initialState();
    case 'start':
      return state.view === 'start' ? { ...state, view: 'paths' } : state;
    case 'branch':
      return state.view === 'paths' && Object.hasOwn(branches, action.id)
        ? {
            ...state,
            view: 'branch',
            currentPath: action.id,
            explored: [...new Set([...state.explored, action.id])],
          }
        : state;
    case 'back-paths':
      return ['branch', 'converge'].includes(state.view)
        ? { ...state, view: 'paths' }
        : state;
    case 'answer': {
      if (
        !Number.isInteger(action.answer) ||
        action.answer < 0 ||
        action.answer > 2
      )
        return state;
      if (
        state.view === 'branch' &&
        state.currentPath &&
        state.reflections[state.currentPath] === undefined
      )
        return {
          ...state,
          reflections: {
            ...state.reflections,
            [state.currentPath]: action.answer,
          },
        };
      if (
        ['observe', 'challenge', 'liberation', 'independence'].includes(
          state.view,
        ) &&
        state.chapterAnswers[state.view as QuizChapterId] === undefined
      )
        return {
          ...state,
          chapterAnswers: {
            ...state.chapterAnswers,
            [state.view]: action.answer,
          },
        };
      if (
        state.view === 'final' &&
        state.finalAnswers[state.finalIndex] === undefined
      )
        return {
          ...state,
          finalAnswers: [...state.finalAnswers, action.answer],
        };
      return state;
    }
    case 'add-builder': {
      if (
        state.view !== 'prepare' ||
        !builderItems.some((x) => x.id === action.id) ||
        state.builder.includes(action.id)
      )
        return state;
      const index = action.index ?? state.builder.length;
      if (!Number.isInteger(index) || index < 0 || index > state.builder.length)
        return state;
      const builder = [...state.builder];
      builder.splice(index, 0, action.id);
      return { ...state, builder };
    }
    case 'reset-builder':
      return state.view === 'prepare' ? { ...state, builder: [] } : state;
    case 'check-builder':
      return state.view === 'prepare' && builderCorrect(state.builder)
        ? { ...state, view: 'prepare-reveal' }
        : state;
    case 'map':
      return state.view === 'results' ? { ...state, view: 'map' } : state;
    case 'results':
      return state.view === 'map' ? { ...state, view: 'results' } : state;
    case 'next': {
      if (
        state.view === 'branch' &&
        state.currentPath &&
        state.reflections[state.currentPath] !== undefined
      )
        return { ...state, view: 'converge' };
      if (state.view === 'converge') return { ...state, view: 'observe' };
      if (state.view === 'prepare-reveal')
        return { ...state, view: 'challenge' };
      const next: Partial<Record<QuizChapterId, View>> = {
        observe: 'prepare',
        challenge: 'liberation',
        liberation: 'independence',
        independence: 'final',
      };
      const view = next[state.view as QuizChapterId];
      if (
        view &&
        state.chapterAnswers[state.view as QuizChapterId] !== undefined
      )
        return { ...state, view };
      if (
        state.view === 'final' &&
        state.finalAnswers[state.finalIndex] !== undefined
      )
        return state.finalIndex === 5
          ? { ...state, view: 'results' }
          : { ...state, finalIndex: state.finalIndex + 1 };
      return state;
    }
  }
}
