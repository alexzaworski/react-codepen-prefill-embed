import {mount} from 'enzyme';
import {JSDOM} from 'jsdom';
import * as React from 'react';

import {EMBED_SCRIPT_ID} from '../config';
import useCodePenEmbed from '../lib/use-codepen-embed';

const FAKE_SRC = 'http://foo.bar';

const ComponentWithHook = () => {
  useCodePenEmbed();
  return <div>hello</div>;
};

const ComponentWithHookOptions = () => {
  useCodePenEmbed({async: false, srcOverride: FAKE_SRC});
  return <div>hello</div>;
};

beforeEach(() => {
  const jsdom = new JSDOM();
  const {window} = jsdom;
  (global as any).window = window;
  (global as any).document = window.document;
});

describe('useCodePenEmbed hook', () => {
  it('Adds a script tag to the document body', () => {
    mount(<ComponentWithHook />);
    const scripts = document.body.querySelectorAll(`#${EMBED_SCRIPT_ID}`);
    expect(scripts.length).toBe(1);
  });

  it('Only appends a single script tag', () => {
    mount(<ComponentWithHook />);
    mount(<ComponentWithHook />);
    const scripts = document.querySelectorAll(`#${EMBED_SCRIPT_ID}`);
    expect(scripts.length).toBe(1);
  });

  it('Uses async by default', () => {
    mount(<ComponentWithHook />);
    const script = document.querySelector('script');
    expect(script.getAttribute('async')).toBe('true');
  });

  it('Respects srcOverride option', () => {
    mount(<ComponentWithHookOptions />);
    const script = document.querySelector('script');
    expect(script.getAttribute('src')).toBe(FAKE_SRC);
  });

  it('Respects async option', () => {
    mount(<ComponentWithHookOptions />);
    const script = document.querySelector('script');
    expect(script.hasAttribute('async')).toBe(false);
  });
});
