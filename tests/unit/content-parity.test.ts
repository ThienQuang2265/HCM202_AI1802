import fs from 'node:fs';
import vm from 'node:vm';
import { describe, expect, it } from 'vitest';
import { branches } from '../../content/branches';
import { chapters } from '../../content/chapters';
import { finalQuestions } from '../../content/questions';
import { builderItems } from '../../content/builder';
import { timeline } from '../../content/timeline';
import { preparationMilestones } from '../../content/milestones';
describe('prototype content parity', () => {
  it('preserves all branch text and final answers verbatim', () => {
    const code = fs.readFileSync('dist/app.js', 'utf8');
    const context = vm.createContext({});
    vm.runInContext(
      code.slice(code.indexOf('const paths ='), code.indexOf('const state =')) +
        '; globalThis.extracted={paths,finalQuestions};',
      context,
    );
    expect(branches).toEqual(
      JSON.parse(JSON.stringify(context.extracted.paths)),
    );
    expect(finalQuestions).toEqual(
      JSON.parse(JSON.stringify(context.extracted.finalQuestions)).map(
        (q: {
          q: string;
          options: string[];
          answer: number;
          note: string;
        }) => ({
          question: q.q,
          options: q.options,
          correct: q.answer,
          explanation: q.note,
        }),
      ),
    );
  });
  it('preserves chapter, timeline, artifact and builder text from the prototype', () => {
    const code = fs.readFileSync('dist/app.js', 'utf8');
    for (const c of Object.values(chapters)) {
      expect(code).toContain(c.title);
      expect(code).toContain(c.lead);
      for (const m of [...c.milestones, ...c.artifacts]) {
        expect(code).toContain(m.title);
        expect(code).toContain(m.description);
      }
    }
    for (const m of [...timeline, ...preparationMilestones])
      expect(code).toContain(m.description);
    for (const item of builderItems) expect(code).toContain(item.detail);
  });
});
