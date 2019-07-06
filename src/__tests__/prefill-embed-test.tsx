import {shallow} from 'enzyme';
import * as React from 'react';

import PrefillEmbed from '../components/prefill-embed';

const embed = shallow(
  <PrefillEmbed
    penTitle="A test"
    description="This tests some stuff"
    tags={['react']}
    htmlClasses={['a-class']}
    head={<meta name="something" content="whatever" />}
    stylesheets={['some-file.css']}
    scripts={['first-style-sheet.css', 'another-style-sheet.css']}
    embedHeight="400"
    editable
    defaultTabs={['js', 'result']}
    themeId="1234"
    prefillData={{someCustomJSON: 'foo'}}
    data-custom-thing="foo"
  />
);

const expectedJSON = {
  description: 'This tests some stuff',
  head: '<meta name="something" content="whatever"/>',
  html_classes: ['a-class'],
  scripts: ['first-style-sheet.css', 'another-style-sheet.css'],
  someCustomJSON: 'foo',
  stylesheets: ['some-file.css'],
  tags: ['react'],
  title: 'A test',
};

const expectedData = {
  'data-custom-thing': 'foo',
  'data-default-tab': 'js,result',
  'data-editable': 'true',
  'data-height': '400',
  'data-theme-id': '1234',
};

describe('PrefillLang component', () => {
  const embedProps = embed.props();
  const parsedPrefillProp = JSON.parse(embedProps['data-prefill']);

  const jsonValuePairs = Object.keys(expectedJSON).map((key: keyof object) => {
    return [
      key,
      JSON.stringify(parsedPrefillProp[key]),
      JSON.stringify(expectedJSON[key]),
    ];
  });

  const dataValuePairs = Object.keys(expectedData).map(
    (attribute: keyof object) => {
      return [attribute, embedProps[attribute], expectedData[attribute]];
    }
  );

  describe('Generates expected prefill JSON', () => {
    test.each(jsonValuePairs)('%s', (_key, actualVal, expectedVal) => {
      expect(actualVal).toBe(expectedVal);
    });
  });

  describe('Generates expected data-* attributes', () => {
    test.each(dataValuePairs)('%s', (_key, actualVal, expectedVal) => {
      expect(actualVal).toBe(expectedVal);
    });
  });

  describe('Renders default props', () => {
    const noPropsEmbed = shallow(<PrefillEmbed />);
    expect(noPropsEmbed.prop('className')).toBe('codepen');
    expect(noPropsEmbed.prop('data-default-tab')).toBe('result');
  });
});
