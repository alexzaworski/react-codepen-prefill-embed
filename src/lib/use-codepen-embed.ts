import {useEffect} from 'react';
import {EMBED_SCRIPT_ID, EMBED_SCRIPT_SRC} from '../config';

interface HookOptions {
  async: boolean;
  srcOverride?: string;
}

const defaultOptions: HookOptions = {
  async: true,
};

const useCodePenEmbed = (userOptions?: HookOptions): void => {
  const options = {...defaultOptions, ...userOptions};
  useEffect(() => {
    /**
     * Checking the window here in case someone loads the script
     * themselves and tries to use the hook regardless.
     *
     * Won't save us if someone adds the script manually and
     * the hook is called before it loads but meh.
     */
    const existsInWindow = window.hasOwnProperty('__CPEmbed');
    const existsInDOM = Boolean(document.getElementById(EMBED_SCRIPT_ID));
    const exists = existsInWindow || existsInDOM;

    if (exists) return;

    const s = document.createElement('script');
    const {async, srcOverride} = options;

    if (async) s.setAttribute('async', 'true');
    s.setAttribute('src', srcOverride || EMBED_SCRIPT_SRC);
    s.setAttribute('id', EMBED_SCRIPT_ID);

    document.body.appendChild(s);
  });
};

export default useCodePenEmbed;
