import type { Metadata } from 'next';
import { timeline } from '../../content/timeline';
import { chapters } from '../../content/chapters';
import { preparationMilestones } from '../../content/milestones';
import { sources } from '../../content/sources';
import { Milestones } from '../../components/shared';
export const metadata: Metadata = {
  title: 'Dòng thời gian 1911–1969',
  alternates: { canonical: '/timeline/' },
  openGraph: { title: 'Dòng thời gian 1911–1969', url: '/timeline/' },
};
export default function TimelinePage() {
  return (
    <>
      <a className="skip-link" href="#timeline">
        Bỏ qua đến nội dung chính
      </a>
      <main id="timeline" className="screen" tabIndex={-1}>
        <div className="screen-inner">
          <a href="/">← Hành trình tìm đường</a>
          <span className="eyebrow static-eyebrow">
            1911–1969 · Đối chiếu lịch sử
          </span>
          <h1 className="chapter-title">Dòng thời gian lịch sử</h1>
          <Milestones items={timeline} />
          <h2 className="section-title">1911–1920 · Thực tiễn và lý luận</h2>
          <Milestones items={chapters.observe.milestones} />
          <h2 className="section-title">1920–1930 · Chuẩn bị tổ chức</h2>
          <Milestones items={preparationMilestones} artifacts />
          <h2 className="section-title">1941–1945 · Giải phóng dân tộc</h2>
          <Milestones items={chapters.liberation.artifacts} artifacts />
          <h2 className="section-title">1945–1969 · Độc lập và tự do</h2>
          <Milestones items={chapters.independence.milestones} />
          <h2 className="section-title">Nguồn tư liệu</h2>
          <ol className="sources-list">
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.title} <span className="sr-only">(mở tab mới)</span>
                </a>
              </li>
            ))}
          </ol>
          <a className="primary-button" href="/">
            Bắt đầu hành trình
          </a>
        </div>
      </main>
    </>
  );
}
