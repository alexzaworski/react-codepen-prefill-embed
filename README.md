# React CodPen Prefill Embed

An unofficial, TypeScript-powered React wrapper around CodePen's very-official [Prefill Embed API.](https://blog.codepen.io/documentation/prefill-embeds/)

## Is this for me?

From CodePen's docs:

> Here's why Prefill Embeds are useful: say you have a blog or documentation site displaying important bits of code within `<pre><code>` tags. Perhaps you need to show a bit of HTML, CSS, or JavaScript.

> ...

> CodePen Prefill Embeds are designed to render that code for you in a safe and isolated environment to help your users see, understand, and play with it more easily.

This wrapper might be a good fit for you if you're already using React to power something like a blog (maybe with [Gatsby](https://www.gatsbyjs.org/) or [Next.js](https://www.gatsbyjs.org/)) and don't wanna fuss about things like [escaping markup](https://blog.codepen.io/documentation/prefill-embeds/#what-could-go-wrong-2).

## Installation

### From your favorite package registry

- `yarn add react-codepen-prefill-embed`
- `npm install --save react-codepen-prefill-embed`

```
import {
  PrefillEmbed,
  PrefillLang,
  useCodePenEmbed,
  stripIndent
} = from 'react-codepen-prefill-embed`;
// ...
```

### From a CDN

```html
<!--
  React and ReactDOMServer (yep, even in the browser)
  are required. You probably want regular ol' ReactDOM too.
-->
<script src="https://unpkg.com/react@16.8/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.8/umd/react-dom-server.browser.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.8/umd/react-dom.browser.production.min.js"></script>

<!--
  If you're not using the `useCodePenEmbed` hook documented below
  you'll also need CodePen's API script
-->
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<script src="https://unpkg.com/react-codepen-prefill-embed@latest/dist/umd/index.js"></script>
<script>
  const {
    PrefillEmbed,
    PrefillLang,
    useCodePenEmbed,
    stripIndent,
  } = ReactCodePenPrefillEmbed;
  // ...
</script>
```

### Use on CodePen

[Here's a template](https://codepen.io/pen?template=e0925944542ee1f8bb7d108f2015def1) that has all the scripts loaded for you.

## Usage example

```jsx
const App = () => {
  useCodePenEmbed();
  return (
    <PrefillEmbed
      className="codepen"
      penTitle="My sweet demo"
      embedHeight="400"
      themeId="31205"
      editable
      description="Renders a barebones React component"
      tags={['react', 'react-docs-demo']}
      htmlClasses={['loading', 'no-js']}
      head={
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      }
      scripts={[
        'https://unpkg.com/react@16.8.6/umd/react.development.js',
        'https://unpkg.com/react-dom@16.8.6/umd/react-dom.development.js',
      ]}
      stylesheets={['https://unpkg.com/normalize.css@8.0.1/normalize.css']}
    >
      <PrefillLang lang="html">
        {stripIndent`
            <div id="root"></div>
        `}
      </PrefillLang>
      <PrefillLang lang="scss">
        {stripIndent`
            $bg: #eee;
            body {
              background: $bg; 
            }
        `}
      </PrefillLang>
      <PrefillLang lang="babel">
        {stripIndent`
          const App = () => <h1>Hello</h1>;
          ReactDOM.render(
            <App/>,
            document.getElementById('root')
          );
        `}
      </PrefillLang>
    </PrefillEmbed>
  );
};
```

## Components

### `<PrefillEmbed>`

The root of your embed. This is where you set Pen-specific settings like description or theme.

#### Props

[Type annotations here](/src/components/prefill-embed.tsx) if you prefer. Any props not listed will be passed to the wrapping `<div>` element. All `<PrefillEmbed>` props are optional.

##### Related to the Pen:

| Prop        | Type   | Default | Description                                                  |
| ----------- | ------ | ------- | ------------------------------------------------------------ |
| penTitle    | string | --      | Title of your Pen                                            |
| description | string | --      | Description of your Pen                                      |
| tags        | array  | --      | Tags for your Pen. Max 5.                                    |
| htmlClasses | array  | --      | Classes to add to the html element of your Pen               |
| stylesheets | array  | --      | Stylesheets to include as external resources                 |
| scripts     | array  | --      | Scripts to include as external resources                     |
| head        | node   | --      | Content for the `<head>` of the document                     |
| prefillData | object | --      | Any additional keys/values you want passed to `data-prefill` |

##### Related to the embed:

| Prop        | Type   | Default    | Description                                                                                                                                                                                                                              |
| ----------- | ------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| embedHeight | string | --         | Height of the generated iframe                                                                                                                                                                                                           |
| themeId     | string | --         | [Theme](https://blog.codepen.io/documentation/features/embedded-pens/#embed-themes-1) id to use in the embed                                                                                                                             |
| editable    | bool   | false      | Whether or not the embed should be editable                                                                                                                                                                                              |
| defaultTabs | array  | ['result'] | Default open tab(s)                                                                                                                                                                                                                      |
| className   | string | 'codepen'  | Class for the wrapping `<div>`. If you change this, you'll be responsible for [invoking the prefill API](https://blog.codepen.io/documentation/prefill-embeds/#enhance-pre-blocks-into-editable-embeds-on-click-or-on-any-other-event-3) |

### `<PrefillLang>`

Used as children of `<PrefillEmbed>`— your HTML, CSS, and JS tabs.

#### Props

`lang` is the only prop, everything else is passed to the wrapping `<pre>` element.

| Prop | Type   | Default | Required | Description                                |
| ---- | ------ | ------- | -------- | ------------------------------------------ |
| lang | string | --      | ⚠️       | What kinda code is it? Support table below |

##### Supported languages

HTML: `html`, `slim`, `haml`, `markdown`, `pug`

JS: `js`, `babel`, `typescript`, `coffeescript`, `livescript`

CSS: `css`, `scss`, `sass`, `less`, `stylus`

## Hooks and Utilities

### `usePrefillEmbed`

A [hook](https://reactjs.org/docs/hooks-overview.html) to load CodePen's prefill API. This may be useful if you don't want to deal with adding a CDN-only script to your build process, but isn't recommended in the browser.

The script is loaded from `https://static.codepen.io/assets/embed/ei.js` and is `async` by default.

#### Options

| Option      | Type    | Default | Description                                |
| ----------- | ------- | ------- | ------------------------------------------ |
| async       | boolean | true    | Load the script with the `async` attribute |
| srcOverride | string  | --      | Override the source of the loaded script   |

### `stripIndent`

Multi-line strings are easiest to work with in [template literals.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) This can cause headaches when dealing with indented JSX code, however— consider this:

```jsx
<App>
  <PrefillEmbed>
    <PrefillLang lang="html">
      {`
        <div>
          <span>Hello</span>
        </div>
      `}
    </PrefillLang>
  <PrefillEmbed>
</App>
```

Which will yield the following markup in your Pen:

```text
        <div>
          <span>Hello</span>
        </div>
```

In order for whitespace to look normal you'd need to do something like this:

```jsx
<App>
  <PrefillEmbed>
    <PrefillLang lang="html">
{`<div>
  <span>Hello</span>
</div>`}
    </PrefillLang>
  <PrefillEmbed>
</App>
```

And that's a bummer. Instead, you can use the provided [template tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) to strip leading indents and leading/trailing newlines.

Whitespace to strip is determined based on the first line of text after removing a leading newline. Tabs or spaces should both be fine so long as you're consistent.

```jsx
<App>
  <PrefillEmbed>
    <PrefillLang lang="html">
      {stripIndent`
        <div>
          <span>Hello</span>
        </div>
      `}
    </PrefillLang>
  <PrefillEmbed>
</App>
```

...would become:

```
<div>
  <span>Hello</span>
</div>
```
