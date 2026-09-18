import type { GameState } from '../content/types';
import { builderCorrect, chapterIndex } from './game-state';
export const STORAGE_KEY = 'hanh-trinh-tim-duong:v1';
const views = [
  'start',
  'paths',
  'branch',
  'converge',
  'observe',
  'prepare',
  'prepare-reveal',
  'challenge',
  'liberation',
  'independence',
  'final',
  'results',
  'map',
];
const branches = ['dongdu', 'reform', 'armed', 'world'];
const chapters = ['observe', 'challenge', 'liberation', 'independence'];
const builders = ['theory', 'press', 'cadres', 'party'];
const answer = (v: unknown): v is number =>
  Number.isInteger(v) && Number(v) >= 0 && Number(v) <= 2;
const record = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);
const selection = (v: unknown, ids: string[]): boolean =>
  Array.isArray(v) &&
  v.every((x) => typeof x === 'string' && ids.includes(x)) &&
  new Set(v).size === v.length;
const answers = (v: unknown, ids: string[]): boolean =>
  record(v) &&
  Object.entries(v).every(([key, value]) => ids.includes(key) && answer(value));
/** Treat storage as untrusted: reject unknown versions, invalid answers and unreachable screens. */
export function parseProgress(raw: string | null): GameState | null {
  try {
    if (!raw || raw.length > 10000) return null;
    const v: unknown = JSON.parse(raw);
    if (
      !record(v) ||
      v.version !== 1 ||
      typeof v.view !== 'string' ||
      !views.includes(v.view) ||
      !selection(v.explored, branches) ||
      !(
        v.currentPath === null ||
        (typeof v.currentPath === 'string' && branches.includes(v.currentPath))
      ) ||
      !answers(v.reflections, branches) ||
      !answers(v.chapterAnswers, chapters) ||
      !selection(v.builder, builders) ||
      !Array.isArray(v.finalAnswers) ||
      v.finalAnswers.length > 6 ||
      !v.finalAnswers.every(answer) ||
      !Number.isInteger(v.finalIndex) ||
      Number(v.finalIndex) < 0 ||
      Number(v.finalIndex) > 5
    )
      return null;
    const s = v as unknown as GameState;
    if (s.currentPath && !s.explored.includes(s.currentPath)) return null;
    if (
      Object.keys(s.reflections).some(
        (id) => !s.explored.includes(id as GameState['explored'][number]),
      )
    )
      return null;
    if (['branch', 'converge'].includes(s.view) && !s.currentPath) return null;
    if (s.view === 'converge' && s.reflections[s.currentPath!] === undefined)
      return null;
    const index = chapterIndex(s.view);
    if (index >= 1 && Object.keys(s.reflections).length === 0) return null;
    if (index >= 2 && s.chapterAnswers.observe === undefined) return null;
    if (
      (index >= 3 || s.view === 'prepare-reveal') &&
      !builderCorrect(s.builder)
    )
      return null;
    if (index >= 4 && s.chapterAnswers.challenge === undefined) return null;
    if (index >= 5 && s.chapterAnswers.liberation === undefined) return null;
    if (index >= 6 && s.chapterAnswers.independence === undefined) return null;
    if (
      s.finalAnswers.length < s.finalIndex ||
      s.finalAnswers.length > s.finalIndex + 1
    )
      return null;
    if (['results', 'map'].includes(s.view) && s.finalAnswers.length !== 6)
      return null;
    return s;
  } catch {
    return null;
  }
}
