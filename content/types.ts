export type BranchId = 'dongdu' | 'reform' | 'armed' | 'world';
export type ChapterId =
  'paths' | 'observe' | 'prepare' | 'challenge' | 'liberation' | 'independence';
export type QuizChapterId = Exclude<ChapterId, 'paths' | 'prepare'>;
export type View =
  | 'start'
  | ChapterId
  | 'branch'
  | 'converge'
  | 'prepare-reveal'
  | 'final'
  | 'results'
  | 'map';
export type BuilderId = 'theory' | 'press' | 'cadres' | 'party';
export interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}
export interface Branch {
  title: string;
  subtitle: string;
  image: string;
  caption: string;
  background: string;
  contribution: string;
  limit: string;
  lesson: string;
  question: string;
  answers: string[];
  correct: number;
}
export type Branches = Record<BranchId, Branch>;
export interface Milestone {
  year: string;
  title: string;
  description: string;
}
export interface DocumentaryImage {
  src: string;
  alt: string;
  caption: string;
}
export interface Chapter {
  key: ChapterId;
  label: string;
  title: string;
  lead: string;
  image: DocumentaryImage;
  milestones: Milestone[];
  artifacts: Milestone[];
  context: { title: string; description: string }[];
  question?: Question;
}
export type Chapters = Record<ChapterId, Chapter>;
export interface BuilderItem {
  id: BuilderId;
  title: string;
  detail: string;
}
export interface Source {
  title: string;
  href: string;
}
export interface GameState {
  version: 1;
  view: View;
  explored: BranchId[];
  currentPath: BranchId | null;
  reflections: Partial<Record<BranchId, number>>;
  chapterAnswers: Partial<Record<QuizChapterId, number>>;
  builder: BuilderId[];
  finalIndex: number;
  finalAnswers: number[];
}
