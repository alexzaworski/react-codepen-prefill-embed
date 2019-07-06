import * as React from 'react';

import Lang from '../types/lang';
import renderString from '../util/render-string';

export interface PrefillLangProps extends React.HTMLAttributes<HTMLPreElement> {
  lang: Lang;
}

const PrefillLang: React.FunctionComponent<PrefillLangProps> = ({
  lang,
  children,
  ...rest
}) => {
  return (
    <pre data-lang={lang} {...rest}>
      {renderString(children)}
    </pre>
  );
};

export default PrefillLang;
