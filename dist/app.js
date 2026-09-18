const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const chapters = [
  { key: "paths", label: "Chặng 1 · 1911" },
  { key: "observe", label: "Chặng 2 · 1911–1920" },
  { key: "prepare", label: "Chặng 3 · 1920–1930" },
  { key: "challenge", label: "Chặng 4 · 1930–1941" },
  { key: "liberation", label: "Chặng 5 · 1941–1945" },
  { key: "independence", label: "Chặng 6 · 1945–1969" },
];

const paths = {
  dongdu: {
    title: "Đi theo phong trào Đông Du",
    subtitle: "Dựa vào Nhật Bản để đào tạo nhân lực và tìm ngoại viện",
    image: "/assets/phan_boi_chau.jpg",
    caption: "Phan Bội Châu — ảnh tư liệu có sẵn.",
    background: "Đầu thế kỷ XX, Phan Bội Châu và Duy Tân Hội chủ trương đưa thanh niên sang Nhật học tập, kỳ vọng một nước châu Á đã canh tân có thể hỗ trợ Việt Nam giành độc lập.",
    contribution: "Khơi mạnh tinh thần yêu nước, mở tầm nhìn ra bên ngoài và tạo nên một lớp thanh niên có ý thức canh tân.",
    limit: "Hy vọng vào sự giúp đỡ của một cường quốc bên ngoài khiến phong trào phụ thuộc vào quan hệ quốc tế. Khi Nhật thỏa hiệp với Pháp, lưu học sinh Việt Nam bị trục xuất và phong trào tan rã.",
    lesson: "Độc lập không thể được bảo đảm chỉ bằng việc trông chờ một quốc gia khác.",
    question: "Điểm giới hạn cốt lõi của lựa chọn này là gì?",
    answers: ["Thiếu lòng yêu nước", "Phụ thuộc nhiều vào ngoại viện", "Không có thanh niên tham gia"],
    correct: 1,
  },
  reform: {
    title: "Chọn con đường Duy Tân",
    subtitle: "Khai dân trí, chấn dân khí, cải cách xã hội",
    image: "/assets/phan_chau_trinh_rgb.jpg",
    caption: "Phan Châu Trinh — University of Oregon.",
    background: "Phan Châu Trinh nhấn mạnh giáo dục, dân quyền và cải cách xã hội. Ông phản đối bạo động vội vàng và muốn nâng cao năng lực tự quản của người dân.",
    contribution: "Đặt giáo dục, dân quyền và đổi mới xã hội vào trung tâm; góp phần đánh thức ý thức công dân và tinh thần cải cách.",
    limit: "Kỳ vọng chính quyền thực dân thực hiện cải cách sâu rộng khó giải quyết trực tiếp mâu thuẫn về chủ quyền dân tộc trong một chế độ thuộc địa.",
    lesson: "Cải cách xã hội có giá trị lâu dài, nhưng chưa tự nó trả lời câu hỏi giành lại chủ quyền bằng cách nào.",
    question: "Vì sao con đường này chưa giải quyết trọn vẹn bài toán năm 1911?",
    answers: ["Vì giáo dục không quan trọng", "Vì chưa trực tiếp giải quyết vấn đề chủ quyền", "Vì không có tư tưởng mới"],
    correct: 1,
  },
  armed: {
    title: "Tiếp tục khởi nghĩa vũ trang kiểu cũ",
    subtitle: "Dựa vào căn cứ địa và sức chiến đấu tại địa phương",
    image: "/assets/hoang_hoa_tham.jpg",
    caption: "Hoàng Hoa Thám — ảnh tư liệu báo chí.",
    background: "Khởi nghĩa Yên Thế do Hoàng Hoa Thám lãnh đạo là một trong những cuộc chống Pháp kéo dài nhất, dựa vào địa bàn rừng núi và sự ủng hộ của cư dân địa phương.",
    contribution: "Thể hiện sức bền, ý chí chiến đấu và khả năng dựa vào dân để chống lại bộ máy thuộc địa trong thời gian dài.",
    limit: "Phạm vi chủ yếu vẫn mang tính địa phương, thiếu một chương trình chính trị và tổ chức thống nhất đủ sức liên kết phong trào trên toàn quốc.",
    lesson: "Tinh thần chiến đấu là điều kiện cần, nhưng còn cần đường lối, tổ chức và lực lượng có quy mô toàn dân tộc.",
    question: "Bài toán tổ chức nào vẫn còn bỏ ngỏ?",
    answers: ["Liên kết lực lượng trên phạm vi toàn quốc", "Xây thêm căn cứ địa phương", "Chỉ tăng số lượng vũ khí"],
    correct: 0,
  },
  world: {
    title: "Đi ra thế giới để khảo nghiệm",
    subtitle: "Quan sát các nước, hiểu bản chất thuộc địa và tìm một con đường mới",
    image: "/assets/latouche_treville.jpg",
    caption: "Tàu Amiral Latouche-Tréville — ảnh tư liệu.",
    background: "Ngày 5/6/1911, Nguyễn Tất Thành rời Bến Nhà Rồng trên tàu Amiral Latouche-Tréville. Đây không phải một đáp án có sẵn, mà là khởi đầu của quá trình quan sát, lao động, học hỏi và kiểm nghiệm thực tế.",
    contribution: "Tạo điều kiện tiếp xúc trực tiếp với đời sống của người lao động và các dân tộc thuộc địa, đồng thời quan sát xã hội tư bản từ bên trong.",
    limit: "Ở thời điểm khởi hành, con đường giải phóng dân tộc vẫn chưa được xác định hoàn chỉnh.",
    lesson: "Đi để tìm hiểu, rồi dùng thực tiễn và lý luận để nhận ra con đường phù hợp với Việt Nam.",
    question: "Điểm quan trọng nhất của quyết định này là gì?",
    answers: ["Đã có sẵn toàn bộ đáp án", "Khảo nghiệm thực tiễn để tìm một con đường mới", "Chỉ nhằm học nghề ở nước ngoài"],
    correct: 1,
  },
};

const finalQuestions = [
  { q: "Vì sao năm 1911 được xem là một bước ngoặt?", options: ["Vì cách mạng đã thành công ngay", "Vì mở đầu hành trình khảo nghiệm một con đường mới", "Vì Việt Nam đã có chính đảng"], answer: 1, note: "Năm 1911 mở đầu quá trình tìm tòi, chứ chưa phải lúc đáp án đã hoàn chỉnh." },
  { q: "Sự kiện nào tạo chuyển biến quyết định về nhận thức trong năm 1920?", options: ["Bản yêu sách năm 1919", "Đọc Luận cương của Lênin về vấn đề dân tộc và thuộc địa", "Xuất bản báo Le Paria"], answer: 1, note: "Luận cương giúp nối vấn đề giải phóng dân tộc với cách mạng vô sản." },
  { q: "Chuẩn bị cho sự ra đời của Đảng cần tổ hợp nào?", options: ["Chỉ lòng yêu nước", "Lý luận, tuyên truyền, cán bộ, tổ chức", "Chỉ sự giúp đỡ quốc tế"], answer: 1, note: "Đường lối phải được truyền bá, tổ chức hóa và chuyển thành lực lượng." },
  { q: "Năm 1930 có ý nghĩa nổi bật nào?", options: ["Thành lập Đảng và xác lập cương lĩnh chính trị đầu tiên", "Tuyên ngôn Độc lập", "Thành lập Việt Minh"], answer: 0, note: "Đây là bước ngoặt về tổ chức và đường lối lãnh đạo cách mạng." },
  { q: "Tại Hội nghị Trung ương 8 năm 1941, nhiệm vụ nào được đặt lên hàng đầu?", options: ["Cải cách giáo dục", "Giải phóng dân tộc", "Phát triển thương mại"], answer: 1, note: "Độc lập dân tộc được đặt ở vị trí cấp bách nhất trong hoàn cảnh chiến tranh." },
  { q: "Thông điệp xuyên suốt giai đoạn 1945–1969 là gì?", options: ["Độc lập có thể tách khỏi tự do của nhân dân", "Bảo vệ độc lập, thống nhất và xây dựng xã hội mới", "Chỉ tập trung vào đối ngoại"], answer: 1, note: "Độc lập gắn với tự do, đời sống nhân dân và mục tiêu thống nhất đất nước." },
];

const state = {
  view: "start",
  explored: new Set(),
  currentPath: null,
  reflections: {},
  chapterAnswers: {},
  builder: [],
  finalIndex: 0,
  finalAnswers: [],
};

const main = $("#game");
const chapterLabel = $("#chapterLabel");
const progressText = $("#progressText");
const progressBar = $("#progressBar");
const sourcesDialog = $("#sourcesDialog");

function setView(view, options = {}) {
  state.view = view;
  if (options.path) state.currentPath = options.path;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => main.focus({ preventScroll: true }), 60);
}

function chapterIndexForView(view) {
  if (["paths", "branch", "converge"].includes(view)) return 0;
  if (view === "observe") return 1;
  if (["prepare", "prepare-reveal"].includes(view)) return 2;
  if (view === "challenge") return 3;
  if (view === "liberation") return 4;
  if (view === "independence") return 5;
  if (["final", "results", "map"].includes(view)) return 6;
  return -1;
}

function updateProgress() {
  const i = chapterIndexForView(state.view);
  if (i < 0) {
    chapterLabel.textContent = "Mở đầu";
    progressText.textContent = "0 / 6 chặng";
    progressBar.style.width = "0%";
    return;
  }
  if (i === 6) {
    chapterLabel.textContent = state.view === "results" ? "Hoàn thành" : "Tổng kết";
    progressText.textContent = "6 / 6 chặng";
    progressBar.style.width = "100%";
    return;
  }
  chapterLabel.textContent = chapters[i].label;
  progressText.textContent = `${i + 1} / 6 chặng`;
  progressBar.style.width = `${((i + 1) / 6) * 100}%`;
}

function screen(content, className = "") {
  return `<section class="screen ${className}"><div class="screen-inner">${content}</div></section>`;
}

function renderStart() {
  return `<section class="screen hero">
    <img class="hero-bg" src="/assets/nha_rong_1911.jpg" alt="Bến Nhà Rồng, nơi Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911">
    <div class="screen-inner"><div class="hero-copy">
      <span class="eyebrow">Một game lịch sử tương tác · 1911–1969</span>
      <h1 class="hero-title">Hành trình <span>tìm đường</span></h1>
      <p class="lead">Bạn không “thay” nhân vật lịch sử. Bạn đứng trước những bài toán của từng thời điểm, thử các hướng đi, hiểu vì sao có giới hạn — rồi trở lại dòng lịch sử đã thực sự diễn ra.</p>
      <div class="hero-stats">
        <div class="hero-stat"><b>6 chặng</b><small>Từ ra đi đến Di chúc</small></div>
        <div class="hero-stat"><b>4 nhánh</b><small>Cùng hội tụ về lịch sử</small></div>
        <div class="hero-stat"><b>12–15 phút</b><small>Một lượt trải nghiệm</small></div>
      </div>
      <div class="button-row"><button class="primary-button" data-action="start">Bắt đầu hành trình <span aria-hidden="true">→</span></button><button class="ghost-button" data-action="sources">Xem nguồn tư liệu</button></div>
      <p class="fineprint">Ảnh trong trải nghiệm đều là ảnh tư liệu có sẵn, không phải ảnh tạo sinh.</p>
    </div></div>
  </section>`;
}

function renderPaths() {
  const card = (key, index) => {
    const p = paths[key];
    const explored = state.explored.has(key) ? " explored" : "";
    const correct = key === "world" ? " correct" : "";
    return `<button class="choice-card has-image${explored}${correct}" data-path="${key}">
      <img src="${p.image}" alt="" loading="lazy"><span class="choice-content"><span class="choice-index">${index}</span><h3>${p.title}</h3><p>${p.subtitle}</p></span>
    </button>`;
  };
  return screen(`<div class="chapter-head"><div><span class="eyebrow">Chặng 1 · Trước ngày 5/6/1911</span><h2>Đứng trước ngã rẽ cứu nước</h2><p class="lead">Các phong trào đi trước đều chứa lòng yêu nước và những đóng góp đáng kể. Câu hỏi đặt ra là: con đường nào có thể đi xa hơn những giới hạn đã bộc lộ?</p></div><div class="chapter-image"><img src="/assets/nha_rong_1911.jpg" alt="Bến Nhà Rồng"><span class="image-caption">Bến Nhà Rồng · Sài Gòn · 1911</span></div></div>
    <div class="choice-grid">${card("dongdu", "A")}${card("reform", "B")}${card("armed", "C")}${card("world", "D")}</div>
    <div class="tag-row"><span class="tag">Chọn bất kỳ nhánh nào</span><span class="tag">Nhánh sai không kết thúc trò chơi</span><span class="tag">Có thể quay lại khám phá</span></div>`);
}

function renderBranch() {
  const p = paths[state.currentPath];
  const reflection = state.reflections[state.currentPath];
  const answerButtons = p.answers.map((answer, i) => {
    let cls = "option";
    if (reflection !== undefined) cls += i === p.correct ? " is-correct" : i === reflection ? " is-wrong" : "";
    return `<button class="${cls}" data-reflect="${i}" ${reflection !== undefined ? "disabled" : ""}>${answer}</button>`;
  }).join("");
  const isWorld = state.currentPath === "world";
  return screen(`<div class="branch-layout">
    <figure class="branch-portrait"><img src="${p.image}" alt="${p.title}"><figcaption>${p.caption}</figcaption></figure>
    <div><span class="eyebrow">Nhánh ${isWorld ? "lịch sử" : "giả định để học"}</span><h2>${p.title}</h2><p class="lead">${p.subtitle}</p>
      <div class="branch-callout"><b>Bối cảnh</b><br>${p.background}</div>
      <div class="branch-facts"><div class="fact"><b>Đóng góp:</b> ${p.contribution}</div><div class="fact"><b>Giới hạn:</b> ${p.limit}</div><div class="fact"><b>Điều cần mang theo:</b> ${p.lesson}</div></div>
      <div class="mini-question"><span class="eyebrow">Dừng lại một nhịp</span><h3>${p.question}</h3><div class="option-row">${answerButtons}</div>${reflection !== undefined ? `<div class="feedback">${reflection === p.correct ? "Đúng. " : "Chưa chính xác. "}${p.lesson}</div>` : ""}</div>
      <div class="button-row">
        <button class="primary-button" data-action="converge" ${reflection === undefined ? "disabled" : ""}>${isWorld ? "Tiếp tục theo dòng lịch sử" : "Chọn hướng đã diễn ra: đi để khảo nghiệm"} <span aria-hidden="true">→</span></button>
        <button class="ghost-button" data-action="back-paths">Khám phá nhánh khác</button>
      </div>
    </div>
  </div>`);
}

function renderConverge() {
  const count = state.explored.size;
  return screen(`<div class="converge"><span class="eyebrow">Các nhánh hội tụ</span><h2>Không lặp lại con đường cũ — đi tìm một con đường mới</h2><p class="lead">Nguyễn Tất Thành không phủ nhận lòng yêu nước của những người đi trước. Người quan sát các giới hạn của từng khuynh hướng và chọn ra đi để tự mình khảo nghiệm thế giới.</p>
    <div class="flow-line"><div class="flow-node"><b>Nhìn lại</b><br><small>${count} nhánh đã khám phá</small></div><div class="flow-node"><b>Rút kinh nghiệm</b><br><small>Không phụ thuộc, không cải cách nửa vời, không chỉ cục bộ</small></div><div class="flow-node"><b>Hành động</b><br><small>Ngày 5/6/1911 rời Bến Nhà Rồng</small></div></div>
    <div class="button-row"><button class="primary-button" data-action="next-observe">Lên tàu và bắt đầu hành trình <span aria-hidden="true">→</span></button><button class="ghost-button" data-action="back-paths">Trở lại các nhánh</button></div>
  </div>`);
}

function quizPanel(id, question, options, correct, explanation, nextAction) {
  const answered = state.chapterAnswers[id];
  const buttons = options.map((opt, i) => {
    let cls = "quiz-option";
    if (answered !== undefined) cls += i === correct ? " is-correct" : i === answered ? " is-wrong" : "";
    return `<button class="${cls}" data-chapter-answer="${id}:${i}" ${answered !== undefined ? "disabled" : ""}><span>${String.fromCharCode(65+i)}</span><span>${opt}</span></button>`;
  }).join("");
  return `<div class="quiz-panel"><span class="eyebrow">Quyết định của bạn</span><h3>${question}</h3><div class="quiz-options">${buttons}</div>${answered !== undefined ? `<div class="feedback"><b>${answered === correct ? "Chính xác." : "Hãy nhìn lại mạch sự kiện."}</b> ${explanation}</div><div class="button-row"><button class="primary-button" data-action="${nextAction}">Tiếp tục <span aria-hidden="true">→</span></button></div>` : ""}</div>`;
}

function renderObserve() {
  return screen(`<div class="chapter-head"><div><span class="eyebrow">Chặng 2 · 1911–1920</span><h2>Thực tiễn đặt câu hỏi, lý luận mở đường</h2><p class="lead">Gần mười năm lao động, quan sát và hoạt động chính trị giúp Nguyễn Ái Quốc nhận ra: các lời tuyên bố về tự do chưa tự động đem lại quyền tự quyết cho dân tộc thuộc địa.</p></div><div class="chapter-image"><img src="/assets/petition_1919.jpg" alt="Bản Yêu sách của nhân dân An Nam năm 1919"><span class="image-caption">Yêu sách của nhân dân An Nam · 1919</span></div></div>
    <div class="timeline">
      <div class="timeline-item"><div class="timeline-year">1917</div><div class="timeline-card"><h3>Trở lại Pháp</h3><p>Tham gia hoạt động trong phong trào công nhân và đời sống chính trị Pháp; tiếp xúc trực tiếp với các tư tưởng tiến bộ.</p></div></div>
      <div class="timeline-item"><div class="timeline-year">1919</div><div class="timeline-card"><h3>Gửi bản Yêu sách</h3><p>Thay mặt nhóm người Việt yêu nước, Nguyễn Ái Quốc gửi Yêu sách của nhân dân An Nam đến Hội nghị Versailles. Những quyền tối thiểu không được đáp ứng.</p></div></div>
      <div class="timeline-item"><div class="timeline-year">7/1920</div><div class="timeline-card"><h3>Đọc Luận cương của Lênin</h3><p>Tìm thấy cách đặt vấn đề dân tộc và thuộc địa trong quan hệ với phong trào cách mạng thế giới.</p></div></div>
      <div class="timeline-item"><div class="timeline-year">12/1920</div><div class="timeline-card"><h3>Đại hội Tours</h3><p>Bỏ phiếu tán thành Quốc tế Cộng sản, tham gia sáng lập Đảng Cộng sản Pháp — bước chuyển từ người yêu nước đến người cộng sản.</p></div></div>
    </div>
    ${quizPanel("observe", "Yếu tố nào tạo nên bước chuyển quyết định năm 1920?", ["Chỉ một văn bản lý luận", "Sự gặp gỡ giữa trải nghiệm thực tiễn và lý luận giải phóng dân tộc", "Một lời hứa cải cách từ chính quốc"], 1, "Không phải lý luận tách rời đời sống: trải nghiệm về thuộc địa và lao động giúp Nguyễn Ái Quốc nhận ra ý nghĩa của Luận cương.", "next-prepare")}`);
}

const builderItems = [
  { id: "theory", title: "Xác lập phương hướng lý luận", detail: "Giải phóng dân tộc gắn với cách mạng vô sản" },
  { id: "press", title: "Truyền bá qua báo chí", detail: "Le Paria và các bài viết chống chủ nghĩa thực dân" },
  { id: "cadres", title: "Đào tạo cán bộ, xây dựng tổ chức", detail: "Hội Việt Nam Cách mạng Thanh niên, các lớp huấn luyện" },
  { id: "party", title: "Thành lập chính đảng", detail: "Hợp nhất các tổ chức cộng sản, thông qua cương lĩnh" },
];

function renderPrepare() {
  const selected = new Set(state.builder);
  const cards = builderItems.map(item => `<button draggable="true" class="builder-card ${selected.has(item.id) ? "done" : ""}" data-builder="${item.id}"><span class="drag-icon">⋮⋮</span><span><b>${item.title}</b><br><small>${item.detail}</small></span></button>`).join("");
  const slots = [0,1,2,3].map(i => {
    const item = builderItems.find(x => x.id === state.builder[i]);
    return `<div class="drop-slot ${item ? "filled" : ""}" data-slot="${i}"><span class="slot-number">${i+1}</span><span>${item ? `<b>${item.title}</b><br><small>${item.detail}</small>` : "Thả hoặc chọn một mảnh ghép"}</span></div>`;
  }).join("");
  return screen(`<div class="chapter-head"><div><span class="eyebrow">Chặng 3 · 1920–1930</span><h2>Từ nhận thức đến lực lượng có tổ chức</h2><p class="lead">Một con đường chỉ trở thành sức mạnh khi được truyền bá, có cán bộ, có tổ chức và có một chính đảng đủ năng lực lãnh đạo.</p></div><div class="chapter-image"><img src="/assets/le_paria.jpg" alt="Báo Le Paria"><span class="image-caption">Le Paria · Diễn đàn chống chủ nghĩa thực dân</span></div></div>
    <div class="builder"><div><span class="eyebrow">Các mảnh ghép</span><p class="fineprint">Kéo-thả hoặc bấm vào từng thẻ để xếp chuỗi logic chiến lược. Đây không phải niên biểu tuyệt đối.</p><div class="builder-pool">${cards}</div></div><div><span class="eyebrow">Chuỗi chuẩn bị</span><div class="builder-slots">${slots}</div></div>
      <div class="builder-actions"><div class="button-row"><button class="primary-button" data-action="check-builder" ${state.builder.length < 4 ? "disabled" : ""}>Kiểm tra chuỗi</button><button class="ghost-button" data-action="reset-builder">Xếp lại</button></div></div>
    </div>`);
}

function renderPrepareReveal() {
  return screen(`<span class="eyebrow">Chuỗi đã hoàn chỉnh · 1920–1930</span><h2>Đường lối được chuyển thành tổ chức</h2><p class="lead">Mười năm chuẩn bị tạo ra sự thống nhất giữa lý luận, tuyên truyền, cán bộ và tổ chức.</p>
    <div class="artifact-grid">
      <article class="artifact"><time>1922</time><h3>Le Paria</h3><p>Lên án chế độ thuộc địa, kết nối tiếng nói của các dân tộc bị áp bức.</p></article>
      <article class="artifact"><time>1925</time><h3>Thanh niên</h3><p>Thành lập Hội Việt Nam Cách mạng Thanh niên, mở lớp đào tạo cán bộ.</p></article>
      <article class="artifact"><time>1927</time><h3>Đường Kách Mệnh</h3><p>Hệ thống hóa bài giảng về tư cách, tổ chức và phương pháp của người cách mạng.</p></article>
      <article class="artifact"><time>1930</time><h3>Đảng ra đời</h3><p>Hợp nhất các tổ chức cộng sản và thông qua cương lĩnh chính trị đầu tiên.</p></article>
    </div>
    <div class="converge" style="margin-top:2rem"><h3>Bước ngoặt 1930</h3><p>Từ những phong trào rời rạc, cách mạng Việt Nam có một tổ chức lãnh đạo thống nhất và một phương hướng kết hợp độc lập dân tộc với lợi ích của đại đa số nhân dân.</p><div class="button-row"><button class="primary-button" data-action="next-challenge">Đi vào thử thách mới <span aria-hidden="true">→</span></button></div></div>`);
}

function renderChallenge() {
  return screen(`<div class="chapter-head"><div><span class="eyebrow">Chặng 4 · 1930–1941</span><h2>Giữ vững mục tiêu, điều chỉnh cách đi</h2><p class="lead">Sau khi Đảng ra đời, cách mạng đối diện đàn áp, tranh luận đường lối và những biến động quốc tế. Câu hỏi không còn chỉ là “đi con đường nào”, mà là vận dụng thế nào cho đúng hoàn cảnh Việt Nam.</p></div><div class="chapter-image"><img src="/assets/tours_1920.jpg" alt="Ảnh tư liệu phong trào cách mạng đầu thế kỷ XX"><span class="image-caption">Từ lựa chọn năm 1920 đến thử thách vận dụng</span></div></div>
    <div class="context-strip"><div><b>Đàn áp</b><small>Nhiều cơ sở cách mạng bị tổn thất</small></div><div><b>Tranh luận</b><small>Quan hệ giữa dân tộc và giai cấp</small></div><div><b>Chiến tranh</b><small>Tình hình thế giới biến đổi nhanh</small></div></div>
    ${quizPanel("challenge", "Trước phê bình và biến động, lựa chọn nào phù hợp nhất?", ["Từ bỏ đường lối vì gặp khó khăn", "Áp dụng máy móc mọi chỉ dẫn, không xét hoàn cảnh Việt Nam", "Kiên định mục tiêu nhưng sáng tạo trong cách vận dụng vào vấn đề dân tộc"], 2, "Tư tưởng cốt lõi được kiểm nghiệm và phát triển trong thực tiễn: giải phóng dân tộc phải được đặt đúng vị trí trong hoàn cảnh thuộc địa.", "next-liberation")}`);
}

function renderLiberation() {
  return screen(`<div class="chapter-head"><div><span class="eyebrow">Chặng 5 · 1941–1945</span><h2>Việc cấp bách nhất lúc này là gì?</h2><p class="lead">Năm 1941, Nguyễn Ái Quốc trở về nước sau ba mươi năm. Đông Dương chịu ách thống trị của Pháp và Nhật; nguy cơ mất nước, chiến tranh và nạn đói đẩy mâu thuẫn dân tộc lên cao nhất.</p></div><div class="chapter-image"><img src="/assets/latouche_treville.jpg" alt="Tàu biển gợi hành trình từ lúc ra đi đến ngày trở về"><span class="image-caption">Từ cuộc ra đi năm 1911 đến ngày trở về năm 1941</span></div></div>
    ${quizPanel("liberation", "Trong hoàn cảnh đó, nhiệm vụ nào cần đặt lên hàng đầu?", ["Tiến hành ngay mọi nhiệm vụ giai cấp bất kể điều kiện", "Giải phóng dân tộc, tập hợp rộng rãi mọi lực lượng yêu nước", "Chờ chiến tranh thế giới kết thúc rồi mới hành động"], 1, "Hội nghị Trung ương 8 xác định giải phóng dân tộc là nhiệm vụ bức thiết; Việt Minh trở thành hình thức mặt trận đoàn kết rộng rãi.", "next-independence")}
    ${state.chapterAnswers.liberation !== undefined ? `<div class="artifact-grid"><article class="artifact"><time>5/1941</time><h3>Trung ương 8</h3><p>Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.</p></article><article class="artifact"><time>1941</time><h3>Việt Minh</h3><p>Tập hợp rộng rãi các tầng lớp yêu nước.</p></article><article class="artifact"><time>1944</time><h3>Lực lượng vũ trang</h3><p>Chuẩn bị lực lượng cho thời cơ cách mạng.</p></article><article class="artifact"><time>8–9/1945</time><h3>Độc lập</h3><p>Cách mạng Tháng Tám và Tuyên ngôn Độc lập.</p></article></div>` : ""}`);
}

function renderIndependence() {
  return screen(`<div class="chapter-head"><div><span class="eyebrow">Chặng 6 · 1945–1969</span><h2>Giành được độc lập — rồi phải giữ và làm cho độc lập có ý nghĩa</h2><p class="lead">Từ Nhà nước non trẻ đến hai cuộc kháng chiến, tư tưởng độc lập tiếp tục gắn với tự do của nhân dân, thống nhất đất nước và xây dựng một xã hội mới.</p></div><div class="chapter-image"><img src="/assets/petition_1919.jpg" alt="Tư liệu về hành trình đòi quyền dân tộc"><span class="image-caption">Từ yêu sách về quyền dân tộc đến một nhà nước độc lập</span></div></div>
    <div class="timeline">
      <div class="timeline-item"><div class="timeline-year">1945–46</div><div class="timeline-card"><h3>Bảo vệ chính quyền non trẻ</h3><p>Đối diện giặc đói, giặc dốt, ngoại xâm; tổ chức tổng tuyển cử và xây dựng nền tảng pháp lý của nhà nước mới.</p></div></div>
      <div class="timeline-item"><div class="timeline-year">1946–54</div><div class="timeline-card"><h3>Kháng chiến và kiến quốc</h3><p>Tiến hành cuộc kháng chiến toàn dân, toàn diện, trường kỳ, dựa vào sức mình là chính.</p></div></div>
      <div class="timeline-item"><div class="timeline-year">1954–69</div><div class="timeline-card"><h3>Hai nhiệm vụ chiến lược</h3><p>Xây dựng miền Bắc, đấu tranh giải phóng miền Nam, hướng tới thống nhất đất nước.</p></div></div>
      <div class="timeline-item"><div class="timeline-year">1966</div><div class="timeline-card"><h3>“Không có gì quý hơn độc lập, tự do”</h3><p>Mệnh đề cô đọng giá trị cao nhất của chủ quyền dân tộc và quyền sống tự do.</p></div></div>
      <div class="timeline-item"><div class="timeline-year">1969</div><div class="timeline-card"><h3>Di chúc</h3><p>Gửi lại những căn dặn về đoàn kết, xây dựng Đảng, chăm lo con người và mục tiêu một nước Việt Nam hòa bình, thống nhất.</p></div></div>
    </div>
    ${quizPanel("independence", "Điều gì làm cho độc lập trở nên có ý nghĩa lâu dài?", ["Chỉ có một tuyên bố pháp lý", "Độc lập gắn với tự do, đời sống nhân dân và năng lực bảo vệ đất nước", "Tách mình khỏi mọi quan hệ quốc tế"], 1, "Độc lập là nền tảng, nhưng phải được bảo vệ và chuyển hóa thành quyền sống, quyền làm chủ và tương lai tốt đẹp hơn cho nhân dân.", "next-final")}`);
}

function renderFinalQuiz() {
  const i = state.finalIndex;
  const q = finalQuestions[i];
  const selected = state.finalAnswers[i];
  const options = q.options.map((opt, j) => {
    let cls = "quiz-option";
    if (selected !== undefined) cls += j === q.answer ? " is-correct" : j === selected ? " is-wrong" : "";
    return `<button class="${cls}" data-final-answer="${j}" ${selected !== undefined ? "disabled" : ""}><span>${String.fromCharCode(65+j)}</span><span>${opt}</span></button>`;
  }).join("");
  return screen(`<div style="max-width:850px;margin:0 auto"><span class="eyebrow">Tổng kết · Câu ${i+1}/${finalQuestions.length}</span><h2>Ghép lại hành trình</h2><p class="lead">Bốn bước ngoặt lớn: ra đi năm 1911, chuyển biến năm 1920, thành lập Đảng năm 1930 và trở về trực tiếp lãnh đạo năm 1941.</p>
    <div class="quiz-panel"><h3>${q.q}</h3><div class="quiz-options">${options}</div>${selected !== undefined ? `<div class="feedback"><b>${selected === q.answer ? "Chính xác." : "Chưa đúng."}</b> ${q.note}</div><div class="button-row"><button class="primary-button" data-action="next-final-question">${i === finalQuestions.length-1 ? "Xem kết quả" : "Câu tiếp theo"} <span aria-hidden="true">→</span></button></div>` : ""}</div>
  </div>`);
}

function renderResults() {
  const score = state.finalAnswers.reduce((n, answer, i) => n + (answer === finalQuestions[i].answer ? 1 : 0), 0);
  const pct = Math.round(score / finalQuestions.length * 100);
  const results = finalQuestions.map((q, i) => `<div class="result-item"><b>${state.finalAnswers[i] === q.answer ? "✓" : "○"} ${q.q}</b><p>${q.note}</p></div>`).join("");
  return screen(`<div class="final-grid"><aside class="score-card"><span class="eyebrow">Hành trình hoàn thành</span><div class="score-ring" style="--score-angle:${pct*3.6}deg"><span><b>${score}/${finalQuestions.length}</b><small>${pct}% chính xác</small></span></div><h3>${pct >= 80 ? "Bạn đã nắm được mạch chính" : pct >= 50 ? "Bạn đã thấy được các bước ngoặt" : "Hãy thử lại để nối rõ các mốc"}</h3><p class="fineprint">Đã khám phá ${state.explored.size}/4 nhánh ở chặng 1911.</p><div class="button-row"><button class="primary-button" data-action="show-map">Xem toàn bộ timeline</button><button class="ghost-button" data-action="restart">Chơi lại từ đầu</button></div></aside><div><span class="eyebrow">Điều mang theo</span><h2>Lịch sử không đi theo một đường thẳng</h2><p class="lead">Mỗi bước ngoặt là kết quả của quan sát thực tiễn, tiếp thu lý luận, xây dựng tổ chức và điều chỉnh cách hành động theo hoàn cảnh Việt Nam.</p><div class="result-list">${results}</div></div></div>`);
}

function renderMap() {
  const milestones = [
    ["1911", "Ra đi tìm đường cứu nước", "Không lặp lại nguyên trạng các khuynh hướng cũ; bắt đầu khảo nghiệm thế giới."],
    ["1919", "Yêu sách của nhân dân An Nam", "Đưa quyền của người Việt ra diễn đàn quốc tế; nhận rõ giới hạn của trật tự thuộc địa."],
    ["1920", "Tìm thấy phương hướng", "Luận cương Lênin và Đại hội Tours đánh dấu bước chuyển về nhận thức và lập trường."],
    ["1922–27", "Truyền bá và chuẩn bị", "Le Paria, Hội Thanh niên, đào tạo cán bộ, Đường Kách Mệnh."],
    ["1930", "Thành lập Đảng", "Thống nhất tổ chức và xác lập cương lĩnh chính trị đầu tiên."],
    ["1941", "Trở về và đặt đúng ưu tiên", "Giải phóng dân tộc là nhiệm vụ bức thiết; thành lập Việt Minh."],
    ["1945", "Giành độc lập", "Cách mạng Tháng Tám và Tuyên ngôn Độc lập ngày 2/9."],
    ["1946–54", "Kháng chiến và kiến quốc", "Bảo vệ nền độc lập bằng sức mạnh toàn dân."],
    ["1954–69", "Độc lập, thống nhất, xã hội mới", "Hai nhiệm vụ chiến lược, tư tưởng độc lập tự do và Di chúc."],
  ];
  return screen(`<span class="eyebrow">Bản đồ sau hành trình</span><h2>Toàn bộ flow trong một màn hình</h2><p class="lead">Dùng trang này như bản tóm tắt nội dung và logic điều hướng của prototype.</p><div class="chapter-map">${milestones.map(x=>`<article class="map-card"><time>${x[0]}</time><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("")}</div><div class="button-row"><button class="primary-button" data-action="restart">Chơi lại</button><button class="ghost-button" data-action="results">Trở về kết quả</button></div>`);
}

function render() {
  updateProgress();
  const views = {
    start: renderStart,
    paths: renderPaths,
    branch: renderBranch,
    converge: renderConverge,
    observe: renderObserve,
    prepare: renderPrepare,
    "prepare-reveal": renderPrepareReveal,
    challenge: renderChallenge,
    liberation: renderLiberation,
    independence: renderIndependence,
    final: renderFinalQuiz,
    results: renderResults,
    map: renderMap,
  };
  main.innerHTML = views[state.view]();
  bindDrag();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function resetGame() {
  state.explored = new Set();
  state.currentPath = null;
  state.reflections = {};
  state.chapterAnswers = {};
  state.builder = [];
  state.finalIndex = 0;
  state.finalAnswers = [];
  setView("start");
}

document.addEventListener("click", event => {
  const pathButton = event.target.closest("[data-path]");
  if (pathButton) {
    const key = pathButton.dataset.path;
    state.explored.add(key);
    setView("branch", { path: key });
    return;
  }
  const reflect = event.target.closest("[data-reflect]");
  if (reflect) {
    state.reflections[state.currentPath] = Number(reflect.dataset.reflect);
    render();
    return;
  }
  const chapterAnswer = event.target.closest("[data-chapter-answer]");
  if (chapterAnswer) {
    const [id, answer] = chapterAnswer.dataset.chapterAnswer.split(":");
    state.chapterAnswers[id] = Number(answer);
    render();
    return;
  }
  const builder = event.target.closest("[data-builder]");
  if (builder && !builder.classList.contains("done")) {
    state.builder.push(builder.dataset.builder);
    render();
    return;
  }
  const finalAnswer = event.target.closest("[data-final-answer]");
  if (finalAnswer) {
    state.finalAnswers[state.finalIndex] = Number(finalAnswer.dataset.finalAnswer);
    render();
    return;
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  const actions = {
    home: () => setView("start"),
    start: () => setView("paths"),
    sources: () => sourcesDialog.showModal(),
    "close-modal": () => sourcesDialog.close(),
    "back-paths": () => setView("paths"),
    converge: () => setView("converge"),
    "next-observe": () => setView("observe"),
    "next-prepare": () => setView("prepare"),
    "reset-builder": () => { state.builder = []; render(); },
    "check-builder": () => {
      const correct = builderItems.map(x => x.id).join(",");
      if (state.builder.join(",") === correct) setView("prepare-reveal");
      else { state.builder = []; render(); showToast("Chuỗi chưa hợp lý — hãy bắt đầu từ phương hướng lý luận."); }
    },
    "next-challenge": () => setView("challenge"),
    "next-liberation": () => setView("liberation"),
    "next-independence": () => setView("independence"),
    "next-final": () => setView("final"),
    "next-final-question": () => {
      if (state.finalIndex < finalQuestions.length - 1) { state.finalIndex += 1; render(); window.scrollTo({top:0,behavior:"smooth"}); }
      else setView("results");
    },
    "show-map": () => setView("map"),
    results: () => setView("results"),
    restart: resetGame,
  };
  actions[action]?.();
});

sourcesDialog.addEventListener("click", event => {
  if (event.target === sourcesDialog) sourcesDialog.close();
});

function bindDrag() {
  $$("[draggable='true']").forEach(card => {
    card.addEventListener("dragstart", event => event.dataTransfer.setData("text/plain", card.dataset.builder));
  });
  $$("[data-slot]").forEach(slot => {
    slot.addEventListener("dragover", event => event.preventDefault());
    slot.addEventListener("drop", event => {
      event.preventDefault();
      const id = event.dataTransfer.getData("text/plain");
      const index = Number(slot.dataset.slot);
      if (!id || state.builder.includes(id)) return;
      if (index > state.builder.length) { showToast("Hãy điền lần lượt từ bước 1."); return; }
      state.builder.splice(index, 0, id);
      render();
    });
  });
}

function registerWebMCP() {
  if (!document.modelContext?.registerTool) return;
  const tools = [
    {
      name: "get_journey_progress",
      description: "Đọc trạng thái hiện tại của hành trình lịch sử đang hiển thị.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: async () => ({ content: [{ type: "text", text: JSON.stringify({ view: state.view, explored_paths: [...state.explored], completed_chapters: Math.min(chapterIndexForView(state.view), 6), quiz_answers: state.finalAnswers.length }) }] }),
    },
    {
      name: "start_journey",
      description: "Bắt đầu hoặc chơi lại hành trình lịch sử từ chặng năm 1911.",
      inputSchema: { type: "object", properties: { reset: { type: "boolean", description: "Xóa tiến độ hiện tại trước khi bắt đầu." } }, additionalProperties: false },
      execute: async ({ reset = false } = {}) => { if (reset) resetGame(); else setView("paths"); return { content: [{ type: "text", text: JSON.stringify({ ok: true, view: state.view }) }] }; },
    },
    {
      name: "choose_1911_path",
      description: "Chọn một nhánh tại ngã rẽ năm 1911 để xem bối cảnh và giới hạn.",
      inputSchema: { type: "object", properties: { path: { type: "string", enum: ["dongdu", "reform", "armed", "world"] } }, required: ["path"], additionalProperties: false },
      execute: async ({ path }) => { if (!paths[path]) throw new Error("Nhánh không hợp lệ"); state.explored.add(path); setView("branch", { path }); return { content: [{ type: "text", text: JSON.stringify({ ok: true, path, title: paths[path].title }) }] }; },
    },
  ];
  tools.forEach(tool => { try { document.modelContext.registerTool(tool); } catch (error) { console.warn("WebMCP tool registration skipped", error); } });
}

render();
registerWebMCP();
