import { describe, expect, it } from 'vitest';
import { finishNotesHtml, isSafeHref, prepareNotes } from '../../src/lib/release/notes';

describe('prepareNotes, raw HTML', () => {
  it('escapes raw HTML outside code so it shows as text', () => {
    expect(prepareNotes('Hi <script>alert(1)</script> and <img src=x onerror=alert(1)>')).toBe(
      'Hi &lt;script>alert(1)&lt;/script> and &lt;img src=x onerror=alert(1)>',
    );
  });

  it('leaves HTML inside a fenced block and inside inline code alone', () => {
    const body = ['Run `<b>bold</b>` here', '', '```html', '<script>alert(1)</script>', '```', '', '<i>after</i>'].join('\n');
    expect(prepareNotes(body)).toBe(
      ['Run `<b>bold</b>` here', '', '```html', '<script>alert(1)</script>', '```', '', '&lt;i>after&lt;/i>'].join('\n'),
    );
  });

  it('keeps tilde fences and longer fences closed only by a matching fence', () => {
    const body = ['````', '```', '<b>', '````', '<b>'].join('\n');
    expect(prepareNotes(body)).toBe(['````', '```', '<b>', '````', '&lt;b>'].join('\n'));
    expect(prepareNotes(['~~~', '<b>', '~~~'].join('\n'))).toBe(['~~~', '<b>', '~~~'].join('\n'));
  });

  it('keeps http, https and mailto autolinks', () => {
    expect(prepareNotes('See <https://github.com> or <mailto:hi@example.com>, not <javascript:alert(1)>')).toBe(
      'See <https://github.com> or <mailto:hi@example.com>, not &lt;javascript:alert(1)>',
    );
  });

  it('treats an unmatched backtick as text', () => {
    expect(prepareNotes('a ` <b>')).toBe('a ` &lt;b>');
  });

  it('normalizes Windows line endings', () => {
    expect(prepareNotes('**New**\r\n- one')).toBe('### New\n- one');
  });
});

describe('prepareNotes, structure', () => {
  it('turns a paragraph that is only bold into a level 3 heading', () => {
    expect(prepareNotes('**New**\n- Connections')).toBe('### New\n- Connections');
    expect(prepareNotes('Intro\n\n__Fixes__\n\nText')).toBe('Intro\n\n### Fixes\n\nText');
  });

  it('leaves bold that shares its paragraph with text', () => {
    expect(prepareNotes('**macOS:** text')).toBe('**macOS:** text');
    expect(prepareNotes('**Install**\nmacOS and Linux:')).toBe('**Install**\nmacOS and Linux:');
    expect(prepareNotes('Intro line\n**Bold**')).toBe('Intro line\n**Bold**');
  });

  it('shifts headings down two levels, capped at 6', () => {
    expect(prepareNotes('# Title')).toBe('### Title');
    expect(prepareNotes('## **Features**')).toBe('#### **Features**');
    expect(prepareNotes('##### x')).toBe('###### x');
    expect(prepareNotes('###### y')).toBe('###### y');
  });

  it('shifts setext headings, but not a rule after a blank line', () => {
    expect(prepareNotes('Title\n=====')).toBe('### Title');
    expect(prepareNotes('Sub\n---')).toBe('#### Sub');
    expect(prepareNotes('Text\n\n---')).toBe('Text\n\n---');
    expect(prepareNotes('- item\nlazy\n---')).toBe('- item\nlazy\n---');
  });

  it('never turns code into headings', () => {
    const body = ['```', '# comment', '**bold**', '```'].join('\n');
    expect(prepareNotes(body)).toBe(body);
  });

  it('keeps a leading --- block from being read as frontmatter', () => {
    // Markdown reads this as a rule, then `title: x` as a setext heading.
    expect(prepareNotes('---\ntitle: x\n---')).toBe('***\n#### title: x');
    expect(prepareNotes('---x\ny')).toBe('\\---x\ny');
    expect(prepareNotes('+++ x\n+++')).toBe('\\+++ x\n+++');
  });
});

describe('finishNotesHtml', () => {
  it('prefixes heading ids with the version', () => {
    expect(finishNotesHtml('<h3 id="new">New</h3><h4 id="fixes">Fixes</h4>', '0.5.5')).toBe(
      '<h3 id="0.5.5-new">New</h3><h4 id="0.5.5-fixes">Fixes</h4>',
    );
  });

  it('drops script and data link targets and keeps safe ones', () => {
    const html = [
      '<a href="javascript:alert(1)">a</a>',
      '<a href="data:text/html,x">b</a>',
      '<a href="https://github.com">c</a>',
      '<a href="mailto:hi@example.com">d</a>',
      '<a href="#x">e</a>',
    ].join('');
    expect(finishNotesHtml(html, '1.0.0')).toBe(
      '<a>a</a><a>b</a><a href="https://github.com">c</a><a href="mailto:hi@example.com">d</a><a href="#x">e</a>',
    );
  });
});

describe('isSafeHref', () => {
  it('allows http, https, mailto, fragments and relative paths', () => {
    expect(['http://x.dev', 'HTTPS://x.dev', 'mailto:a@b.c', '#top', '/changelog/', 'notes.md', '?q=1'].every(isSafeHref)).toBe(true);
  });

  it('rejects other schemes, even when hidden by entities, case or spaces', () => {
    expect(
      ['javascript:alert(1)', 'JavaScript:x', ' java\tscript:x', 'javascript&#x3A;x', 'javascript&colon;x', 'vbscript:x', 'file:///etc'].some(
        isSafeHref,
      ),
    ).toBe(false);
  });

  it('does not throw on an out of range character reference', () => {
    expect(isSafeHref('&#x110000;x')).toBe(true);
  });
});
