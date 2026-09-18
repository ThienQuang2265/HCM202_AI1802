'use client';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';
import { gameReducer, initialState, type GameAction } from '../lib/game-state';
import { parseProgress, STORAGE_KEY } from '../lib/storage';
import type { GameState } from '../content/types';
type Session = {
  game: GameState;
  saved: GameState | null;
  ready: boolean;
  persist: boolean;
  notice: string;
};
type Action =
  | GameAction
  | { type: 'boot'; saved: GameState | null; notice: string }
  | { type: 'resume' }
  | { type: 'persist'; value: boolean }
  | { type: 'storage-error' };
const empty = (): Session => ({
  game: initialState(),
  saved: null,
  ready: false,
  persist: true,
  notice: '',
});
function reducer(s: Session, a: Action): Session {
  if (a.type === 'boot')
    return { ...s, ready: true, saved: a.saved, notice: a.notice };
  if (a.type === 'resume')
    return s.saved ? { ...s, game: s.saved, saved: null, persist: true } : s;
  if (a.type === 'persist') return { ...s, persist: a.value };
  if (a.type === 'storage-error')
    return {
      ...s,
      persist: false,
      notice:
        'Trình duyệt không cho phép lưu tiến độ. Bạn vẫn có thể tiếp tục trong phiên này.',
    };
  return {
    ...s,
    game: gameReducer(s.game, a),
    saved: a.type === 'reset' || a.type === 'start' ? null : s.saved,
  };
}
const Context = createContext<{
  session: Session;
  dispatch: React.Dispatch<Action>;
} | null>(null);
export function GameProvider({ children }: { children: ReactNode }) {
  const [session, dispatch] = useReducer(reducer, undefined, empty);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved = parseProgress(raw);
      dispatch({
        type: 'boot',
        saved,
        notice:
          raw && !saved
            ? 'Tiến độ cũ không hợp lệ hoặc không còn tương thích. Hãy bắt đầu một lượt mới.'
            : '',
      });
    } catch {
      dispatch({
        type: 'boot',
        saved: null,
        notice: 'Không thể đọc tiến độ trên thiết bị này.',
      });
    }
  }, []);
  useEffect(() => {
    if (!session.ready || session.saved) return;
    try {
      if (session.persist && session.game.view !== 'start')
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session.game));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      if (session.persist) dispatch({ type: 'storage-error' });
    }
  }, [session.game, session.persist, session.ready, session.saved]);
  return (
    <Context.Provider value={{ session, dispatch }}>
      {children}
    </Context.Provider>
  );
}
export function useGame() {
  const value = useContext(Context);
  if (!value) throw new Error('GameProvider is required');
  return value;
}
