import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function createHarness(initialState) {
  const html = fs.readFileSync(new URL('./deep_work.html', import.meta.url), 'utf8');
  const script = html.match(/<script>([\s\S]*)<\/script>/)?.[1];
  assert.ok(script, 'deep_work.html should contain an inline script');

  const elements = new Map();
  const getElementById = (id) => {
    if (!elements.has(id)) {
      elements.set(id, {
        id,
        innerHTML: '',
        textContent: '',
        style: {},
        offsetTop: 0,
      });
    }
    return elements.get(id);
  };

  const storage = new Map([
    ['deepwork-v1', JSON.stringify(initialState)],
  ]);

  const context = {
    console,
    Date,
    JSON,
    Math,
    String,
    Array,
    document: { getElementById },
    window: { scrollTo() {} },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key),
    },
  };

  vm.createContext(context);
  vm.runInContext(script, context);

  return {
    element: getElementById,
    storage,
  };
}

function problem(checks, status = 'attempting') {
  return { status, checks, notes: '' };
}

const sevenChecks = Array(7).fill(true);

{
  const page = createHarness({
    problems: {
      'minimum-window-substring': problem(sevenChecks),
      'sliding-window-maximum': problem(sevenChecks),
      'longest-substring-without-repeating-characters': problem(sevenChecks),
      'longest-repeating-character-replacement': problem(sevenChecks),
    },
    activeWeek: 1,
    startDate: Date.now(),
    expanded: {},
  });

  assert.match(
    page.element('weeksNav').innerHTML,
    /<span>4\/13<\/span>/,
    'week progress should count problems with all seven completion checks marked',
  );
  assert.equal(page.element('statSolved').textContent, 5);
  assert.equal(page.element('topSolved').textContent, '5 / 157');
}
