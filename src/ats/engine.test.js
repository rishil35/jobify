import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyzeResume } from './engine.js';

const intake = {
  desiredRole: 'Software Engineer', targetIndustry: 'Technology',
  experienceLevel: 'Experienced', targetLocation: 'India',
};
const resume = `Alex Example alex@example.com +91 9876543210 linkedin.com/in/example
Summary Software Engineer
Experience 2020 - 2026
Developed software improving performance by 30%. Led teams and delivered projects.
Education Bachelor of Computer Science
Skills JavaScript React Python SQL Git Docker Testing Agile API Node.js
Projects Built web applications.
${'Developed reliable software and collaborated with teams. '.repeat(60)}`;

test('category ceiling preserves raw results and successful checks', () => {
  const result = analyzeResume(resume, intake);
  assert.equal(result.categoryCeilingPercent, 90);
  assert.equal(result.breakdown.resumeStructure.rawScore, 20);
  assert.equal(result.breakdown.resumeStructure.score, 18);
  for (const category of Object.values(result.breakdown)) {
    assert.equal(category.score, Math.min(category.rawScore, Math.floor(category.max * 0.9)));
  }
  const items = Object.values(result.breakdown).flatMap(category => category.items);
  assert.equal(result.checksPassed, items.filter(item => item.passed).length);
  assert.equal(result.needsAttention, items.filter(item => !item.passed).length);
  assert.equal(result.overallScore, 70);
});

test('low scores remain unchanged by the upper ceiling', () => {
  const result = analyzeResume('hello', intake);
  for (const category of Object.values(result.breakdown)) {
    if (category.rawScore < category.max * 0.9) assert.equal(category.score, category.rawScore);
  }
});

test('repeated scans return identical results', () => {
  assert.deepEqual(analyzeResume(resume, intake), analyzeResume(resume, intake));
});
