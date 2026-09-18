// One-time extraction from the preserved prototype; never used at runtime.
import fs from 'node:fs';
import vm from 'node:vm';
import { JSDOM } from 'jsdom';
const dom = new JSDOM(fs.readFileSync('dist/index.html', 'utf8'));
const code = fs.readFileSync('dist/app.js', 'utf8');
const context = vm.createContext({
  document: dom.window.document,
  window: dom.window,
  setTimeout,
  clearTimeout,
});
vm.runInContext(
  code.replace(/render\(\);\s*registerWebMCP\(\);\s*$/, '') +
    '\nglobalThis.data = {paths,chapters,finalQuestions,builderItems,state,renderStart,renderPaths,renderConverge,renderObserve,renderPrepare,renderPrepareReveal,renderChallenge,renderLiberation,renderIndependence,renderMap,renderResults};',
  context,
);
const d = context.data;
const parse = (html) => new JSDOM(html).window.document;
const text = (doc, selector) =>
  doc.querySelector(selector)?.textContent.trim() ?? '';
const image = (doc) => {
  const el = doc.querySelector('.chapter-image img');
  return el
    ? {
        src: el.getAttribute('src'),
        alt: el.alt,
        caption: text(doc, '.image-caption'),
      }
    : undefined;
};
const milestones = (doc, selector) =>
  [...doc.querySelectorAll(selector)].map((el) => ({
    year: text(el, 'time,.timeline-year'),
    title: text(el, 'h3'),
    description: text(el, 'p'),
  }));
fs.mkdirSync('content', { recursive: true });
const write = (file, type, name, value) =>
  fs.writeFileSync(
    `content/${file}.ts`,
    `import type { ${type.replace('[]', '')} } from './types';\n\nexport const ${name} = ${JSON.stringify(value, null, 2)} satisfies ${type};\n`,
  );
write('branches', 'Branches', 'branches', d.paths);
write(
  'questions',
  'Question[]',
  'finalQuestions',
  d.finalQuestions.map((q) => ({
    question: q.q,
    options: q.options,
    correct: q.answer,
    explanation: q.note,
  })),
);
write('builder', 'BuilderItem[]', 'builderItems', d.builderItems);
const chapters = {};
for (const [key, fn] of Object.entries({
  paths: 'renderPaths',
  observe: 'renderObserve',
  prepare: 'renderPrepare',
  challenge: 'renderChallenge',
  liberation: 'renderLiberation',
  independence: 'renderIndependence',
})) {
  let quiz;
  context.capture = (...args) => {
    quiz = {
      question: args[1],
      options: args[2],
      correct: args[3],
      explanation: args[4],
    };
    return '';
  };
  vm.runInContext('quizPanel = capture', context);
  d.state.chapterAnswers.liberation = 1;
  const doc = parse(d[fn]());
  chapters[key] = {
    key,
    label: text(doc, '.eyebrow'),
    title: text(doc, 'h2'),
    lead: text(doc, '.lead'),
    image: image(doc),
    milestones: milestones(doc, '.timeline-item'),
    artifacts: milestones(doc, '.artifact'),
    context: [...doc.querySelectorAll('.context-strip > div')].map((el) => ({
      title: text(el, 'b'),
      description: text(el, 'small'),
    })),
    ...(quiz ? { question: quiz } : {}),
  };
}
write('chapters', 'Chapters', 'chapters', chapters);
const reveal = parse(d.renderPrepareReveal());
write(
  'milestones',
  'Milestone[]',
  'preparationMilestones',
  milestones(reveal, '.artifact'),
);
const map = parse(d.renderMap());
write('timeline', 'Milestone[]', 'timeline', milestones(map, '.map-card'));
write(
  'sources',
  'Source[]',
  'sources',
  [...dom.window.document.querySelectorAll('.sources-list a')].map((a) => ({
    title: a.textContent,
    href: a.href,
  })),
);
const hero = parse(d.renderStart());
const converge = parse(d.renderConverge());
const results = parse(d.renderResults());
fs.writeFileSync(
  'content/copy.ts',
  `export const copy = ${JSON.stringify({ hero: { eyebrow: text(hero, '.eyebrow'), lead: text(hero, '.lead'), fineprint: text(hero, '.fineprint'), stats: [...hero.querySelectorAll('.hero-stat')].map((el) => ({ title: text(el, 'b'), description: text(el, 'small') })) }, converge: { title: text(converge, 'h2'), lead: text(converge, '.lead') }, reveal: { title: text(reveal, 'h2'), lead: text(reveal, '.lead'), calloutTitle: text(reveal, '.converge h3'), callout: text(reveal, '.converge p') }, results: { title: text(results, 'h2'), lead: text(results, '.lead') }, sources: { intro: text(dom.window.document, '.sources-list p'), fineprint: text(dom.window.document, '.sources-list .fineprint') } }, null, 2)} as const;\n`,
);
