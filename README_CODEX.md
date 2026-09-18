# Handoff cho Codex — Hành trình tìm đường

## 1. Mục tiêu

Nâng cấp prototype hiện có thành website giáo dục lịch sử hoàn chỉnh, có thể triển khai công khai và sử dụng ổn định trên desktop lẫn mobile.

Prototype tham chiếu: https://hanh-trinh-tu-tuong-hcm.quangkootenhatvutru.chatgpt.site

Đây là trải nghiệm học tập theo nhánh, không phải trò chơi “viết lại lịch sử”. Khi người chơi chọn một hướng khác với tiến trình đã diễn ra, website phải:

1. Giải thích bối cảnh của hướng đi đó.
2. Nêu đóng góp lịch sử một cách tôn trọng.
3. Phân tích giới hạn trong hoàn cảnh đương thời.
4. Cho người chơi thực hiện một câu hỏi phản tư ngắn.
5. Hội tụ trở lại dòng lịch sử thật mà không bắt đầu lại trò chơi.

## 2. Tài sản đã có

- `dist/index.html`: khung HTML và hộp nguồn tư liệu.
- `dist/styles.css`: toàn bộ giao diện responsive hiện tại.
- `dist/app.js`: dữ liệu nội dung, state và logic trò chơi.
- `dist/assets/`: ảnh tư liệu thật; không thay bằng ảnh tạo sinh.
- `tests/flow.mjs`: bài kiểm thử tự động đi trọn hành trình.

Prototype hiện tại đã hoạt động hoàn chỉnh bằng HTML/CSS/JavaScript thuần. Hãy dùng nó làm nguồn sự thật về flow và nội dung, không thiết kế lại từ đầu nếu không có yêu cầu.

## 3. Stack đề xuất

- Next.js App Router + TypeScript.
- Tailwind CSS hoặc CSS Modules; được phép tái sử dụng trực tiếp hệ màu và layout trong `dist/styles.css`.
- Nội dung lịch sử lưu trong các file typed data/JSON, không hard-code rải rác trong component.
- React Context hoặc Zustand cho game state; chưa cần backend.
- `localStorage` để lưu tiến độ trên cùng thiết bị.
- Vitest/React Testing Library cho logic và Playwright cho luồng end-to-end.
- Triển khai bằng Vercel, Cloudflare Pages hoặc nền tảng mà repository đang dùng.

Không thêm database, tài khoản hoặc CMS nếu chưa được yêu cầu. Đây là website nội dung tĩnh có trạng thái phía trình duyệt.

## 4. Flow bắt buộc

### Mở đầu

- Hero “Hành trình tìm đường”.
- Giải thích người chơi đứng trước bài toán lịch sử, không “đóng vai” hay thay thế Hồ Chí Minh.
- CTA bắt đầu và nút xem nguồn.

### Chặng 1 — Trước ngày 5/6/1911

Bốn lựa chọn:

1. Phong trào Đông Du.
2. Con đường Duy Tân.
3. Khởi nghĩa vũ trang kiểu cũ.
4. Đi ra thế giới để khảo nghiệm.

Ba nhánh đầu phải có background, đóng góp, giới hạn và câu hỏi phản tư. Sau đó CTA đưa người chơi về quyết định ra đi khảo nghiệm thế giới. Cho phép quay lại khám phá nhánh khác và đánh dấu nhánh đã xem.

### Chặng 2 — 1911–1920

- Timeline: 1917, 1919, tháng 7/1920 và tháng 12/1920.
- Làm rõ sự gặp gỡ giữa trải nghiệm thực tiễn và Luận cương của Lênin.
- Một câu hỏi kiểm tra trước khi đi tiếp.

### Chặng 3 — 1920–1930

- Tương tác kéo-thả và click dự phòng.
- Chuỗi logic: phương hướng lý luận → báo chí/tuyên truyền → cán bộ/tổ chức → chính đảng.
- Sau khi hoàn thành, mở các mốc Le Paria, Hội Việt Nam Cách mạng Thanh niên, Đường Kách Mệnh và thành lập Đảng năm 1930.

### Chặng 4 — 1930–1941

- Bối cảnh đàn áp, tranh luận đường lối và biến động quốc tế.
- Lựa chọn đúng về nguyên tắc: kiên định mục tiêu nhưng vận dụng sáng tạo vào hoàn cảnh Việt Nam.

### Chặng 5 — 1941–1945

- Quyết định ưu tiên giải phóng dân tộc.
- Các mốc Hội nghị Trung ương 8, Việt Minh, lực lượng vũ trang, Cách mạng Tháng Tám và Tuyên ngôn Độc lập.

### Chặng 6 — 1945–1969

- Timeline: 1945–1946, 1946–1954, 1954–1969, năm 1966 và Di chúc năm 1969.
- Làm rõ độc lập gắn với tự do, đời sống nhân dân, bảo vệ đất nước và thống nhất.

### Tổng kết

- Sáu câu hỏi như prototype.
- Chấm điểm, giải thích từng câu, thống kê số nhánh năm 1911 đã khám phá.
- CTA chơi lại và xem toàn bộ timeline.

## 5. Yêu cầu thiết kế

- Giữ phong cách bảo tàng–tư liệu: nền nâu đen, đỏ trầm, vàng, typography serif cho tiêu đề.
- Không biến thành landing page marketing.
- Mỗi màn hình phải có một hành động chính rõ ràng.
- Thanh tiến độ cố định, hiển thị chặng hiện tại.
- Responsive tại tối thiểu 375 px, 768 px, 1024 px và 1440 px.
- Hỗ trợ bàn phím, focus state rõ, semantic HTML và `prefers-reduced-motion`.
- Ảnh phải có chú thích và alt text phù hợp.
- Không dùng ảnh AI; chỉ dùng tài sản trong `dist/assets` hoặc ảnh tư liệu có nguồn rõ ràng.

## 6. Yêu cầu kỹ thuật

- Tạo type cho `Chapter`, `Branch`, `Question`, `Milestone` và `GameState`.
- Tách dữ liệu khỏi UI, ví dụ `content/branches.ts`, `content/chapters.ts`, `content/sources.ts`.
- Không dùng `dangerouslySetInnerHTML` cho nội dung.
- State phải hỗ trợ: bắt đầu lại, quay lại nhánh, lưu tiến độ, xóa tiến độ và tiếp tục lượt trước.
- Kéo-thả phải có lựa chọn click tương đương cho mobile và accessibility.
- Không gọi API bên ngoài trong quá trình chơi.
- Tối ưu ảnh, preload ảnh hero và lazy-load ảnh ngoài màn hình.
- Không có lỗi console, link nguồn mở tab mới với `rel="noreferrer"`.
- Thêm metadata, Open Graph, favicon, robots và sitemap phù hợp.

## 7. Tiêu chí nghiệm thu

- Người dùng có thể chơi từ đầu đến kết quả mà không gặp ngõ cụt.
- Chọn một nhánh “không diễn ra” không tạo alternate-history ending và không bắt chơi lại.
- Có thể khám phá cả bốn nhánh năm 1911 trong cùng lượt chơi.
- Kéo-thả hoạt động bằng chuột; click hoạt động trên touch và bàn phím.
- Refresh trang không làm mất tiến độ nếu người dùng đã đồng ý tiếp tục.
- Nút chơi lại xóa sạch state cũ.
- Bài tổng kết chấm đúng 0–6 và hiển thị giải thích.
- Mọi nguồn tư liệu trong modal đều truy cập được.
- Lighthouse mục Accessibility và Best Practices đạt từ 90 trở lên.
- Playwright test thành công trên Chromium cho desktop và mobile viewport.

## 8. Cách Codex nên thực hiện

1. Đọc toàn bộ `README_CODEX.md`, `dist/app.js`, `dist/styles.css` và `tests/flow.mjs` trước khi chỉnh sửa.
2. Chạy prototype và bài test hiện tại để thiết lập baseline.
3. Lập kế hoạch refactor theo component; không thay flow hoặc nội dung nếu không có lý do cụ thể.
4. Triển khai từng chặng, giữ website chạy được sau mỗi bước.
5. Viết unit test cho game state và Playwright test cho toàn bộ happy path cùng ít nhất một nhánh sai.
6. Chạy lint, typecheck, test, production build và kiểm tra responsive trước khi bàn giao.
7. Viết README mới gồm lệnh cài đặt, chạy local, test và deploy.

## 9. Prompt ngắn để gửi Codex

> Hãy đọc `README_CODEX.md` và toàn bộ prototype trong repository trước khi code. Nhiệm vụ của bạn là nâng cấp prototype “Hành trình tìm đường” thành website production-ready bằng Next.js + TypeScript. Giữ nguyên flow lịch sử, nội dung, hệ hình ảnh tư liệu và nguyên tắc các nhánh đều hội tụ trở lại lịch sử thật. Tách dữ liệu khỏi component, lưu tiến độ ở localStorage, bảo đảm accessibility, responsive, SEO và test end-to-end. Không thêm backend, tài khoản, CMS hoặc ảnh tạo sinh. Trước tiên hãy phân tích code hiện có, đề xuất kế hoạch theo file, sau đó mới implement. Hoàn thành bằng lint, typecheck, test, build và báo cáo những gì đã thay đổi.

