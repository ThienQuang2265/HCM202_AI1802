# Báo cáo nâng cấp — 18/09/2026

Đã đọc `README_CODEX.md`, toàn bộ `dist/app.js`, `dist/styles.css`, `dist/index.html`, favicon, cấu hình cũ và `tests/flow.mjs` trước khi triển khai. Đã trình bày kế hoạch theo file trước khi sửa mã. Baseline prototype phục vụ HTTP 200 và bài test hành trình gốc PASS.

## Thay đổi

- Next.js App Router + TypeScript strict, xuất website tĩnh trong `out/`.
- Giữ sáu chặng, bốn nhánh có phản tư và hội tụ, chuỗi chuẩn bị, sáu câu tổng kết và ảnh tư liệu gốc. Unit test đối chiếu dữ liệu với prototype. Chỉ bỏ các nhãn UI “prototype” khỏi bản production.
- Dữ liệu có kiểu trong `content/`; component không dựng nội dung qua HTML chuỗi.
- Reducer điều khiển chuyển chặng và chấm điểm; React Context cung cấp state. localStorage có phiên bản, kiểm tra dữ liệu, đồng ý tiếp tục, lựa chọn không lưu và xóa tiến độ.
- Giữ phong cách nâu đen–đỏ–vàng, font serif; font lưu nội bộ, ảnh WebP ba kích thước, hero preload và ảnh khác lazy-load.
- Semantic HTML, skip link, progressbar, focus rõ, live region, nhãn đúng/sai bằng chữ, dialog hỗ trợ Tab/Escape, kéo-thả và click/Enter, reduced motion.
- Metadata/Open Graph, favicon, robots, sitemap, 404 và trang `/timeline/` đọc được khi JavaScript tắt.
- README cài đặt/test/deploy, lockfile và GitHub Actions CI. Đã cài sạch bằng `npm ci` sau khi tạo lockfile đầy đủ.

## Kết quả kiểm tra

| Kiểm tra | Kết quả |
| --- | --- |
| Baseline `npm run test:prototype` | PASS |
| ESLint | PASS, không lỗi/cảnh báo mã nguồn |
| TypeScript strict | PASS |
| Vitest | 23 test PASS |
| Next.js production build | PASS, các route được prerender tĩnh |
| Playwright Chromium | 16 test PASS: 8 desktop + 8 mobile |
| Responsive | 375, 768, 1024, 1440 px, không tràn ngang trong màn được kiểm tra |
| axe WCAG A/AA | Không có violation trong các màn được quét |
| Console / request trong hành trình | Không có console error hoặc request ra ngoài origin |

Playwright kiểm tra bốn nhánh cùng một lượt, phản tư sai vẫn hội tụ, hoàn thành 0/6 và 6/6, mỗi câu có giải thích, xếp sai và thử lại, drag bằng chuột, Enter, khôi phục chuỗi đang xếp/kết quả, reset, storage hỏng/bị chặn, modal giữ/trả focus và timeline không JavaScript. Screenshot và trace được ghi trong `test-results/`; báo cáo HTML trong `playwright-report/`.

## Lighthouse trên production export local

| Preset | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Desktop | 96 | 100 | 100 | 69 |
| Mobile | 97 | 100 | 100 | 69 |

Báo cáo: [desktop](lighthouse-desktop.html), [mobile](lighthouse-mobile.html). SEO bị trừ ở audit `is-crawlable`: bản local chưa cấu hình origin công khai nên có `noindex` và robots chặn crawl. Đặt `NEXT_PUBLIC_SITE_URL` thành tên miền thật và build lại trước khi triển khai. Lighthouse là phép đo tự động trên trang mở đầu, không thay thế đánh giá bằng trình đọc màn hình hoặc thiết bị thật.

## Giới hạn còn lại

- Chưa triển khai lên tên miền công khai; thư mục `out/` sẵn sàng phục vụ bằng static host.
- Các nguồn giữ nguyên. Kiểm tra HTTP trực tiếp đạt 4/7; University of Oregon trả 406, DocsTeach 403, Quân đội Nhân dân lỗi kết nối. Cả bảy bài có nội dung đọc được qua công cụ web/tìm kiếm; không coi HTTP bị chặn là bằng chứng bài bị gỡ. [Chi tiết HTTP](sources.json). Cần kiểm tra bằng trình duyệt/mạng triển khai để nghiệm thu toàn bộ link nguồn.
- Đã chạy Chromium trên Windows, có mobile emulation; chưa chạy Safari, Firefox hoặc máy di động vật lý. Trình duyệt tích hợp của phiên không khả dụng nên kiểm chứng bằng Playwright của repository.
- Không thêm backend, tài khoản, CMS hay ảnh tạo sinh. Tiến độ chỉ có trên trình duyệt/thiết bị đang dùng.
