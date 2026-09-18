import fs from "node:fs";
import path from "node:path";
import { JSDOM, VirtualConsole } from "jsdom";

const root = path.resolve(import.meta.dirname, "..");
const html = fs.readFileSync(path.join(root, "dist/index.html"), "utf8")
  .replace(/<link[^>]+fonts\.googleapis[^>]*>/g, "")
  .replace(/<link[^>]+fonts\.gstatic[^>]*>/g, "")
  .replace('<script src="/app.js" defer></script>', "");
const app = fs.readFileSync(path.join(root, "dist/app.js"), "utf8");

const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on("jsdomError", error => errors.push(error.message));
virtualConsole.on("error", error => errors.push(String(error)));

const dom = new JSDOM(html, {
  runScripts: "outside-only",
  url: "https://prototype.test/",
  pretendToBeVisual: true,
  virtualConsole,
  beforeParse(window) {
    window.scrollTo = () => {};
    window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
    window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  },
});

dom.window.eval(`(() => { ${app} })()`);

const { document } = dom.window;
const click = selector => {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`Missing element: ${selector}\n${document.body.textContent.slice(0, 500)}\nConsole: ${errors.join(" | ")}`);
  element.click();
};
const expectText = text => {
  if (!document.body.textContent.includes(text)) throw new Error(`Expected visible text: ${text}`);
};

expectText("Hành trình tìm đường");
click('[data-action="start"]');
expectText("Đứng trước ngã rẽ cứu nước");

click('[data-path="dongdu"]');
expectText("Đi theo phong trào Đông Du");
click('[data-reflect="1"]');
click('[data-action="converge"]');
expectText("Các nhánh hội tụ");

click('[data-action="next-observe"]');
expectText("Thực tiễn đặt câu hỏi");
click('[data-chapter-answer="observe:1"]');
click('[data-action="next-prepare"]');

for (const id of ["theory", "press", "cadres", "party"]) click(`[data-builder="${id}"]`);
click('[data-action="check-builder"]');
expectText("Chuỗi đã hoàn chỉnh");
click('[data-action="next-challenge"]');

click('[data-chapter-answer="challenge:2"]');
click('[data-action="next-liberation"]');
click('[data-chapter-answer="liberation:1"]');
click('[data-action="next-independence"]');
click('[data-chapter-answer="independence:1"]');
click('[data-action="next-final"]');

const correctAnswers = [1, 1, 1, 0, 1, 1];
for (const answer of correctAnswers) {
  click(`[data-final-answer="${answer}"]`);
  click('[data-action="next-final-question"]');
}

expectText("6/6");
expectText("Hành trình hoàn thành");
click('[data-action="show-map"]');
expectText("Toàn bộ flow trong một màn hình");

if (errors.length) throw new Error(`Console errors: ${errors.join(" | ")}`);
console.log("PASS: complete journey, branching, builder, quizzes, results and timeline");
