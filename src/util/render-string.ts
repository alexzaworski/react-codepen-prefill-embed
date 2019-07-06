import {ReactElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const renderString = (node: React.ReactNode): string => {
  return typeof node === 'string'
    ? node
    : renderToStaticMarkup(node as ReactElement);
};

export default renderString;
