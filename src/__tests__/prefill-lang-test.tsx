import {shallow} from 'enzyme';
import * as React from 'react';

import PrefillLang from '../components/prefill-lang';

describe('PrefillLang component', () => {
  it('Renders a single <pre> element', () => {
    const wrapper = shallow(
      <PrefillLang lang="html">
        <pre>Inner pre</pre>
      </PrefillLang>
    );
    expect(wrapper.find('pre')).toHaveLength(1);
  });

  it('Escapes html in children', () => {
    const wrapper = shallow(
      <PrefillLang lang="html">
        <p>hello world</p>
      </PrefillLang>
    );
    expect(wrapper.html()).toMatch('&lt;p&gt;');
  });

  it('Supports unknown props', () => {
    const wrapper = shallow(
      <PrefillLang lang="css" data-options-autoprefixer="true">
        {`body: {color: red;}`}
      </PrefillLang>
    );
    expect(wrapper.find('[data-options-autoprefixer="true"]')).toHaveLength(1);
  });
});
