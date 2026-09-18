# Hành trình tìm đường

Website giáo dục lịch sử bằng Next.js App Router + TypeScript, xuất HTML tĩnh. Sáu chặng từ 1911 đến 1969, bốn nhánh năm 1911 và sáu câu hỏi tổng kết được giữ từ prototype. Các nhánh đều hội tụ về dòng lịch sử thật sau phần bối cảnh, đóng góp, giới hạn và phản tư.

Không có backend, tài khoản, database, CMS, analytics hay ảnh tạo sinh. `dist/` và `tests/flow.mjs` giữ nguyên để đối chiếu prototype; bản triển khai mới nằm trong `out/`.

## Chạy local

Yêu cầu Node.js **22.22.2 trở lên**; đã kiểm tra với 22.23.2 và npm 10.9.8. Cài đúng dependency bằng lockfile:

```sh
npm ci
npm run assets
npm run dev
```

Mở `http://localhost:3000`. Ảnh WebP đã có trong `public/assets/`; `npm run assets` tạo lại chúng từ tám ảnh tư liệu gốc trong `dist/assets/`. Font được đóng gói từ `@fontsource`, không tải Google Fonts khi chơi.

Máy của phiên nâng cấp chưa có Node trong PATH. Một bản portable đã được đặt ngoài repository tại `../.tools/node-v22.23.2-win-x64`. Nếu dùng chính workspace này, chạy trong PowerShell từ thư mục repository trước các lệnh npm:

```powershell
$env:PATH = (Resolve-Path '../.tools/node-v22.23.2-win-x64').Path + ';' + $env:PATH
```

## Kiểm tra

```sh
npm run lint
npm run typecheck
npm test
npm run test:prototype
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright tự phục vụ `out/` tại cổng 3000. Test chạy Chromium desktop 1440 px và mobile 375 px; bài responsive kiểm tra thêm 768 và 1024 px. Bao gồm cả bốn nhánh hội tụ, trả lời sai, điểm 0/6 và 6/6, kéo-thả bằng chuột, Enter bằng bàn phím, localStorage bị chặn/hỏng, tiếp tục sau refresh, chơi lại, modal và kiểm tra WCAG bằng axe. Báo cáo HTML ở `playwright-report/index.html`; screenshot/trace ở `test-results/`.

Unit test kiểm tra các chuyển trạng thái, khóa câu trả lời, ngăn bỏ qua bước, mọi mức điểm 0–6, dữ liệu lưu không hợp lệ và nội dung khớp prototype. CI trong `.github/workflows/ci.yml` chạy lint → typecheck → unit/baseline → build → E2E.

Để đo Lighthouse, chạy `npm run start` trong một terminal và lệnh sau ở terminal khác:

```sh
npm run test:lighthouse
```

Script đo desktop/mobile, ghi HTML/JSON vào `test-results/` và trả lỗi nếu Accessibility hoặc Best Practices dưới 90. `npm run test:sources` kiểm tra URL nguồn qua mạng riêng; không gọi các nguồn trong lúc chơi và không phụ thuộc mạng bên ngoài trong E2E. Các website nguồn có thể chặn trình kiểm tra tự động; HTTP 403/timeout không đủ để kết luận bài viết đã bị gỡ.

## Cấu trúc và chỉnh nội dung

| File/thư mục                                           | Trách nhiệm                                                                 |
| ------------------------------------------------------ | --------------------------------------------------------------------------- |
| `content/types.ts`                                     | `Chapter`, `Branch`, `Question`, `Milestone`, `GameState` và ID hợp lệ      |
| `content/branches.ts`                                  | Bốn nhánh, ảnh, phản tư và đáp án                                           |
| `content/chapters.ts`, `milestones.ts`, `timeline.ts`  | Nội dung sáu chặng, hiện vật và niên biểu                                   |
| `content/questions.ts`, `copy.ts`, `narrative.ts`      | Tổng kết và phần dẫn chuyện                                                 |
| `content/sources.ts`                                   | Bảy nguồn tư liệu kế thừa prototype                                         |
| `lib/game-state.ts`                                    | Reducer thuần, điều kiện chuyển màn và chấm điểm                            |
| `lib/storage.ts`                                       | Schema phiên bản 1, kiểm tra dữ liệu và trạng thái hợp lệ                   |
| `components/game-provider.tsx`                         | React Context, lựa chọn lưu, khôi phục và xóa tiến độ                       |
| `components/*screen*.tsx`, `journey.tsx`, `shared.tsx` | UI, timeline, phản hồi câu hỏi, tiến độ và focus                            |
| `components/sources-dialog.tsx`, `lib/dialog-focus.ts` | Dialog native, Escape, Tab và trả focus                                     |
| `app/`                                                 | Trang chủ, timeline đọc không cần JavaScript, metadata, 404, robots/sitemap |
| `app/globals.css`                                      | Bảng màu/bố cục prototype, responsive, focus, reduced motion                |
| `scripts/optimize-images.mjs`                          | WebP 480/960/1600 và ảnh Open Graph từ ảnh gốc                              |

`scripts/migrate-content.mjs` là công cụ trích xuất một lần từ prototype, **không chạy trong build**. Chỉnh nội dung production trực tiếp trong `content/`; chỉ chạy lại migration khi chủ động muốn nhập lại dữ liệu gốc.

Nội dung hiển thị qua JSX, không dùng `dangerouslySetInnerHTML`. Ảnh chính có preload responsive; ảnh khác lazy-load. Điều hướng giữa hai trang tĩnh dùng anchor HTML để hoạt động trên các static host mà không yêu cầu runtime Next.js hoặc các request RSC.

## Tiến độ và accessibility

- Lựa chọn “Lưu tiến độ trên thiết bị này” ở màn đầu; khóa lưu: `hanh-trinh-tim-duong:v1`.
- Refresh luôn cho người học chọn “Tiếp tục lượt trước” hoặc “Xóa tiến độ” trước khi khôi phục. Không đồng bộ giữa thiết bị/tài khoản.
- Chơi lại đặt toàn bộ state về rỗng và xóa khóa localStorage. Xóa giữa hành trình có dialog xác nhận để tránh mất bài do bấm nhầm.
- Dữ liệu hỏng/phiên bản lạ bị bỏ qua với thông báo. Nếu storage bị chặn hoặc hết chỗ, hành trình vẫn chạy trong bộ nhớ của tab.
- Tab/Enter dùng được cho câu hỏi và xếp chuỗi; kéo-thả chỉ là lựa chọn bổ sung. Khi chuyển màn, focus về nội dung chính; thông báo đáp án có live region và nhãn chữ, không chỉ dựa vào màu.
- Có skip link, progressbar có nhãn, alt/chú thích ảnh, dialog có tên và hỗ trợ `prefers-reduced-motion`.

## Build và triển khai

1. Cấu hình `NEXT_PUBLIC_SITE_URL` thành **origin HTTPS thực tế** trên nền tảng deploy, ví dụ `https://lichsu.example.org`. Có thể sao chép `.env.example` sang `.env.local` khi build trên máy.
2. Chạy `npm ci` và `npm run build`.
3. Phục vụ thư mục **`out/`**, không phải `dist/`. Build tạo `/`, `/timeline/`, `404.html`, `robots.txt`, `sitemap.xml`, favicon và Open Graph.

Vercel có thể nhận repository Next.js với cấu hình `output: 'export'`. Cloudflare Pages hoặc static host khác dùng build command `npm run build`, output directory `out`; bật directory index cho `/timeline/` và dùng `404.html` cho trang không tồn tại. Không cần serverless function hay API ảnh.

Nếu chưa đặt tên miền, bản build dùng localhost và **noindex**; robots chặn crawl và sitemap rỗng. Đây là mặc định preview có chủ ý. Đổi tên miền cần build lại vì metadata được tạo lúc build. Chưa thực hiện triển khai công khai trong lần nâng cấp này.

## Đối chiếu nguồn

Giữ nguyên bảy URL nguồn trong prototype. Cả bảy bài có nội dung đọc được qua công cụ web/tìm kiếm, gồm [bài Quân đội Nhân dân](https://www.qdnd.vn/da-phuong-tien/longform/ky-2-nguoi-thanh-nien-khong-tuoi-trong-ngoi-nha-bon-khong-661330). Kiểm tra HTTP trực tiếp từ máy này đạt 4/7; University of Oregon trả 406, DocsTeach trả 403 và Quân đội Nhân dân lỗi kết nối. Vì vậy chưa khẳng định việc truy cập trực tiếp cả bảy nguồn từ mọi mạng/trình duyệt. Không tự thay nguồn hoặc ảnh. Xem `reports/sources.json` để biết kết quả cụ thể và chạy lại `npm run test:sources` khi cần.

Kết quả kiểm chứng và giới hạn nghiệm thu được ghi trong [reports/validation.md](reports/validation.md).

Tài liệu kỹ thuật tham chiếu: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports) và [Image component](https://nextjs.org/docs/app/api-reference/components/image).
