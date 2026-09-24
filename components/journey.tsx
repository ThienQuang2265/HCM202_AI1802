'use client';

import { useEffect, useRef } from 'react';
import { containDialogFocus } from '../lib/dialog-focus';
import { chapters } from '../content/chapters';
import { copy } from '../content/copy';
import { chapterIndex } from '../lib/game-state';
import { GameProvider, useGame } from './game-provider';
import { DocumentaryImage } from './documentary-image';
import { SourcesDialog } from './sources-dialog';
import { AiDisclosureDialog } from './ai-disclosure-dialog';
import { PathsScreen, BranchScreen, ConvergeScreen } from './branch-screens';
import { ChapterScreen } from './chapter-screen';
import { BuilderScreen, PreparationReveal } from './builder-screen';
import { FinalQuiz, ResultsScreen, MapScreen } from './final-screens';
function StartScreen() {
  const { session, dispatch } = useGame();
  return (
    <section className="screen hero">
      <DocumentaryImage
        src="/assets/nha_rong_1911.jpg"
        alt="Bến Nhà Rồng, nơi Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911"
        className="hero-bg"
        hero
      />
      <div className="screen-inner">
        <div className="hero-copy">
          <span className="eyebrow">{copy.hero.eyebrow}</span>
          <h1 className="hero-title">
            Hành trình <span>tìm đường</span>
          </h1>
          <p className="lead">{copy.hero.lead}</p>
          <div className="hero-stats">
            {copy.hero.stats.map((item) => (
              <div className="hero-stat" key={item.title}>
                <b>{item.title}</b>
                <small>{item.description}</small>
              </div>
            ))}
          </div>
          {session.saved ? (
            <div className="resume-panel">
              <h2 className="card-title">Bạn có một hành trình đang lưu</h2>
              <p>Tiến độ chỉ nằm trên trình duyệt và thiết bị này.</p>
              <div className="button-row">
                <button
                  className="primary-button"
                  onClick={() => dispatch({ type: 'resume' })}
                >
                  Tiếp tục lượt trước
                </button>
                <button
                  className="ghost-button"
                  onClick={() => dispatch({ type: 'reset' })}
                >
                  Xóa tiến độ
                </button>
              </div>
            </div>
          ) : (
            <>
              <label className="save-choice">
                <input
                  type="checkbox"
                  checked={session.persist}
                  onChange={(e) =>
                    dispatch({ type: 'persist', value: e.target.checked })
                  }
                />{' '}
                Lưu tiến độ trên thiết bị này
              </label>
              <p className="fineprint">
                Bạn có thể tiếp tục sau khi đóng trang và xóa tiến độ bất cứ lúc
                nào.
              </p>
              <div className="button-row">
                <button
                  className="primary-button"
                  disabled={!session.ready}
                  onClick={() => dispatch({ type: 'start' })}
                >
                  Bắt đầu hành trình <span aria-hidden="true">→</span>
                </button>
                <SourcesDialog hero />
              </div>
            </>
          )}
          <p className="fineprint hero-caption">
            Bến Nhà Rồng · Sài Gòn · 1911. {copy.hero.fineprint}
          </p>
        </div>
      </div>
    </section>
  );
}
function ActiveScreen() {
  const {
    session: { game },
  } = useGame();
  switch (game.view) {
    case 'start':
      return <StartScreen />;
    case 'paths':
      return <PathsScreen />;
    case 'branch':
      return <BranchScreen />;
    case 'converge':
      return <ConvergeScreen />;
    case 'observe':
    case 'challenge':
    case 'liberation':
    case 'independence':
      return <ChapterScreen id={game.view} />;
    case 'prepare':
      return <BuilderScreen />;
    case 'prepare-reveal':
      return <PreparationReveal />;
    case 'final':
      return <FinalQuiz />;
    case 'results':
      return <ResultsScreen />;
    case 'map':
      return <MapScreen />;
  }
}
function JourneyShell() {
  const { session, dispatch } = useGame();
  const main = useRef<HTMLElement>(null);
  const resetDialog = useRef<HTMLDialogElement>(null);
  const previous = useRef('start:0');
  const { game } = session;
  const index = chapterIndex(game.view);
  const progress = Math.min(index + 1, 6);
  const label =
    index < 0
      ? 'Mở đầu'
      : index === 6
        ? game.view === 'results'
          ? 'Hoàn thành'
          : 'Tổng kết'
        : Object.values(chapters)[index].label;
  useEffect(() => {
    const location = `${game.view}:${game.finalIndex}`;
    if (previous.current !== location) {
      previous.current = location;
      main.current?.focus({ preventScroll: true });
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
      document.title = `${game.view === 'start' ? 'Hành trình tìm đường' : label + ' — Hành trình tìm đường'}`;
    }
  }, [game.view, game.finalIndex, label]);
  return (
    <>
      <a className="skip-link" href="#game">
        Bỏ qua đến nội dung chính
      </a>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            ✦
          </span>
          <span>
            <b>Hành trình tìm đường</b>
            <small>1911–1969 · Tư liệu lịch sử</small>
          </span>
        </div>
        <div className="progress-wrap">
          <div className="progress-meta">
            <span>{label}</span>
            <span>{progress} / 6 chặng</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Tiến độ hành trình"
            aria-valuemin={0}
            aria-valuemax={6}
            aria-valuenow={progress}
            aria-valuetext={label}
          >
            <span style={{ width: `${(progress / 6) * 100}%` }} />
          </div>
        </div>
        <SourcesDialog />
      </header>
      {session.notice && (
        <p role="status" className="storage-notice">
          {session.notice}
        </p>
      )}
      <main id="game" tabIndex={-1} ref={main}>
        <ActiveScreen />
        <noscript>
          <p>
            Bật JavaScript để tương tác và lưu tiến độ. Bạn vẫn có thể đọc toàn
            bộ <a href="/timeline/">dòng thời gian lịch sử</a>.
          </p>
        </noscript>
      </main>
      <footer className="site-footer">
        <a href="/timeline/">Dòng thời gian lịch sử</a>
        <AiDisclosureDialog />
        {game.view !== 'start' && (
          <button
            type="button"
            className="ghost-button"
            aria-haspopup="dialog"
            onClick={() => resetDialog.current?.showModal()}
          >
            Xóa tiến độ và bắt đầu lại
          </button>
        )}
        <span>Ảnh tư liệu · Học từ bối cảnh lịch sử</span>
      </footer>
      <dialog
        className="modal"
        ref={resetDialog}
        aria-labelledby="reset-title"
        onKeyDown={containDialogFocus}
      >
        <div className="modal-body">
          <h2 id="reset-title">Xóa tiến độ trên thiết bị?</h2>
          <p>Các nhánh đã khám phá và câu trả lời của lượt này sẽ được xóa.</p>
          <div className="button-row">
            <button
              className="ghost-button"
              onClick={() => resetDialog.current?.close()}
            >
              Giữ lại hành trình
            </button>
            <button
              className="primary-button"
              onClick={() => {
                resetDialog.current?.close();
                dispatch({ type: 'reset' });
              }}
            >
              Xóa và bắt đầu lại
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
export function Journey() {
  return (
    <GameProvider>
      <JourneyShell />
    </GameProvider>
  );
}
