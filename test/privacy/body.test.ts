import { describe, expect, it } from 'vitest';
import { privacyBody } from '../../src/lib/privacy/body';

const body = '<h2>App</h2><p>Run by {operator}.</p><p>{files}</p><p>Write to {contact}.</p>';

describe('privacyBody', () => {
  it('splits at the one files paragraph', () => {
    const result = privacyBody(body, 'OnlyDev India', 'a@b.dev');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.before).toBe('<h2>App</h2><p>Run by OnlyDev India.</p>');
    expect(result.value.after).toBe('<p>Write to <a href="mailto:a@b.dev">a@b.dev</a>.</p>');
  });

  it('fails when the marker is missing', () => {
    const result = privacyBody('<p>Run by {operator}, {contact}.</p>', 'x', 'a@b.dev');
    expect(result).toEqual({ ok: false, error: expect.stringContaining('but has 0') });
  });

  it('fails when the marker appears twice', () => {
    const result = privacyBody(`${body}<p>{files}</p>`, 'x', 'a@b.dev');
    expect(result).toEqual({ ok: false, error: expect.stringContaining('but has 2') });
  });

  it('ignores {files} inside other text', () => {
    const result = privacyBody('<p>See {files} below, {operator}, {contact}</p>', 'x', 'a@b.dev');
    expect(result.ok).toBe(false);
  });

  it('fails when the operator or the contact is never named', () => {
    expect(privacyBody('<p>{files}</p><p>{contact}</p>', 'x', 'a@b.dev')).toEqual({ ok: false, error: 'never names {operator}' });
    expect(privacyBody('<p>{files}</p><p>{operator}</p>', 'x', 'a@b.dev')).toEqual({ ok: false, error: 'never gives {contact}' });
  });

  it('escapes the operator and the contact', () => {
    const result = privacyBody(body, 'A <b> & Co', 'a"x@b.dev');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.before).toContain('A &lt;b&gt; &amp; Co');
    expect(result.value.after).toContain('href="mailto:a&quot;x@b.dev"');
  });
});
