import * as React from 'react';

import Lang from '../types/lang';
import renderString from '../util/render-string';

interface PrefillEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  penTitle?: string;
  embedHeight?: string;
  themeId?: string;
  editable?: boolean;
  description?: string;
  tags?: [string?, string?, string?, string?, string?];
  htmlClasses?: string[];
  stylesheets?: string[];
  scripts?: string[];
  head?: React.ReactNode;
  defaultTabs?: [Lang?, 'result'?] | ['result'?, Lang?];
  prefillData?: object;
}

const PrefillEmbed: React.FunctionComponent<PrefillEmbedProps> = ({
  penTitle,
  embedHeight,
  themeId,
  editable,
  description,
  tags,
  htmlClasses,
  stylesheets,
  scripts,
  head,
  defaultTabs = ['result'],
  prefillData,
  children,
  className = 'codepen',
  ...embedProps
}) => {
  const prefillJSON = JSON.stringify({
    description,
    head: renderString(head),
    html_classes: htmlClasses,
    scripts,
    stylesheets,
    tags,
    title: penTitle,
    ...prefillData,
  });

  return (
    <div
      className={className}
      data-prefill={prefillJSON}
      data-height={embedHeight}
      data-theme-id={themeId}
      data-editable={`${editable}`}
      data-default-tab={defaultTabs.join(',')}
      {...embedProps}
    >
      {children}
    </div>
  );
};

export default PrefillEmbed;
