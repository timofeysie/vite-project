# Stan Test

This is a test submission project for the Stan.tv coding challenge.

## Workflow

```sh
npm run dev
run npm run test
```

## The Challenge

The guidelines of [the challenge](https://github.com/StreamCo/stan-tv-coding-challenge/tree/master/reactjs) state: *application should be built using Babel along with webpack into a dist folder containing four files (app.js, styles.css, logo.svg and index.html)*.

I was under the impression that Stan uses Next.js, so my first try was creating a new Next.js project and trying to get it to do a minimal build as required.  The Next.js builds are huge affairs, especially with the emphasis on server components these days.  My main experience with Next.js involves using it to create a Preact AMP (Accelerated Mobile Pages) app using SSG (Server Side Generation) geared for high SEO.  This project is built and deployed on Netlify by dropping the out directory into a web folder.  However, that out directory has hundreds of files.  It doesn't really make much sense using Next.js if I am then going to have to remove all that great stuff.

Vite is a good choice but it doesn't use Webpack.  I actually wouldn't consider these limitations modern.

The vanilla approach means starting from cratch.  However, I haven't had experience with starting a React project from scratch since the old days (who has?) so worth a shot.  It goes something like this:

```sh
npm init -y
npm install webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript typescript react react-dom @types/react @types/react-dom --save-dev
```

The next few steps involves creating these files and scripts:

- webpack.config.js
- .babelrc
- tsconfig.json
- src/index.tsx
- index.html
- start and build scripts

However, after all this, I can't get past a "Cannot GET /" error when serving the app.  Since I have already spent over an hour on the above, I am faced with a tough choice: follow the rules and not have enough time to finish the app, or break the rules and use Vite and get on with the app.

I choose the second option here.  I will have to admit that my solution does not use Webpack, but if the goal is a build with four files, then Vite with Rollup does the job.  If a tool works to solve a problem, does it really matter which tool it is?  I don't know how important Webpack is at Stan, but I know that running out of time and not finishing the other requirements wont go over well.

The essential goal of a developer is to solve problems.  In this case I had to solve the problem of a four file deployment using Rollup and not Webpack.

## Getting started with Vite

This is a very straight forward route, and the current defacto *simple* way to start an app in React at a time when there are many options.

- create project with Vite and configure build to create a minimal dist directory.
- add styled-components and implement basic carousel-like layout
- create a type for programs

I am using Node.js vv18.19.1 for this.

### Interface vs. Type

I usually follow the best practice of using type over an interface by default.  Why is this?

We use Interfaces for [object inheritance](https://www.totaltypescript.com/type-vs-interface-which-should-you-use).

An interface has *declaration merging* which means we can declare multiple interfaces with the same name.

A type has *computed properties* which are a way of dynamically generating property names in an object literal.

For example:

```js
type Student = {
  name: string;
  age: number;
  [key: string]: unknown; // Computed property
};

const student: Student = {
  name: "John",
  age: 30,
  address: "123 ABC", // Computed property
  phone: "111-111-1111", // Computed property
};
```

A type is useful to store key:value pairs that come from an API because we may not know exactly about key:value that is coming from API response.  This doesn't mean that interfaces shouldn't be used for APIs, but it tips the scale in favor of using types by default.

To deal with this sample data:

```json
[
    {
      "id": 67298,
      "title": "Dr. Death",
      "description": "Dr. Death tells the terrifying true story of Dr. Christopher Duntsch (Joshua Jackson), a brilliant but sociopathic neurosurgeon whose patients leave his operating room either permanently maimed or dead, and the two doctors who set out to stop him.",
      "type": "series",
      "image": "https://streamcoimg-a.akamaihd.net/000/672/98/67298-PosterArt-2039396c9e27d6271c96776414d6a38c.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg",
      "rating": "MA 15+",
      "genre": "Drama",
      "year": 2021,
      "language": "English"
    },
]
```

I created a types directory with this data model:

```js
export type Program = {
    id: number;
    title: string;
    description: string;
    type: string;
    image: string;
    rating: string;
    genre: string;
    year: number;
    language: string;
  };
```

The fetch should happen with an async Thunk using Axios is a Redux slice, which can happen soon.  Fist unit tests need to be setup, as this is a requirement.

## Setting up Jest

I will just [Jest](https://jestjs.io/docs/snapshot-testing) with the React [testing-library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests.

```sh
npm i jest --save-dev @testing-library/react ts-jest @types/jest --save-dev
```

In the package.json, add "test": jest to the script

```sh
run npm run test
```

Works now so add a simple test file: App.test.tsx and the first test passes.

There is still a bit more to go to test the App.tsx file.

To avoid the "Jest encountered an unexpected token" error when the test actually tries to ```render(<App />) expect(true).toBeTruthy()``` there are some more libraries needed.

```sh
npm install ts-node @testing-library/jest-dom --save-dev
npm install jest-environment-jsdom
npm install identity-obj-proxy --save-dev
```

Then create a jest.config.ts file.

npm install --save-dev @babel/preset-typescript

The link in the error message says *If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript*.

This details the babel.config.js file required.

```js
module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
    ],
  };
```

when you create a Vite project for React using TypeScript, you're using the ECMAScript module system (ES modules), so that actually has to be a .ts file.

That webpage also says *there are some caveats to using TypeScript with Babel. Because TypeScript support in Babel is purely transpilation, Jest will not type-check your tests as they are run.*

However, this does not help to resolve the "Jest encountered an unexpected token" error.

I think I need to read more of this error:

```sh
 FAIL  src/App.test.tsx
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    SyntaxError: C:\Users\timof\repos\temp\vite-project\src\App.test.tsx: Support for the experimental syntax 'jsx' isn't currently enabled (10:10):

       8 |
       9 | test("Renders the main page", () => {
    > 10 |   render(<App />);
         |          ^
      11 |   expect(true).toBeTruthy();
      12 | });
      13 |

    Add @babel/preset-react (https://github.com/babel/babel/tree/main/packages/babel-preset-react) to the 'presets' section of your Babel config to enable transformation.
    If you want to leave it as-is, add @babel/plugin-syntax-jsx (https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-jsx) to the 'plugins' section to enable parsing.

    If you already added the plugin for this syntax to your config, it's possible that your config isn't being loaded.
    You can re-run Babel with the BABEL_SHOW_CONFIG_FOR environment variable to show the loaded configuration:
        npx cross-env BABEL_SHOW_CONFIG_FOR=C:\Users\timof\repos\temp\vite-project\src\App.test.tsx <your build command>
    See https://babeljs.io/docs/configuration#print-effective-configs for more info.

      at toParseError (node_modules/@babel/parser/src/parse-error.ts:74:19)
      at Parser.raise (node_modules/@babel/parser/src/tokenizer/index.ts:1497:19)
      ...

Test Suites: 1 failed, 1 total
```

I added "babel/preset-react" to the presets section of the babel.config.ts file.

I added "@babel/plugin-syntax-jsx" to a new plugins section in hte jest.config.ts file.

I tried multiple different transform patterns in the jest.config.ts to process `*.tsx` files with `ts-jest`:

- "^.+\\.tsx?$": "ts-jest",
- "^.+\\.ts?$": "ts-jest",
- "^.+\\.(js|jsx)$": "babel-jest",
- "\\.js$": "<rootDir>/node_modules/babel-jest",
- '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
- "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"

I tried adding an ignore pattern to the same file:

```sh
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
  ],
```

I created a .babelrc file

Then when reading more about this issue on StackOverflow I read this: *I strongly recommend using vitest to set up the configuration. It's a breeze compared to having to jump all the hurdles to set up the testing environment from scratch.  You can find a very simple guide here https://codingpr.com/test-your-react-app-with-vitest-and-react-testing-library/.  You get access to the same methods as jest and have jsdom support, but all in a matter of minutes to get it working, already pre-packed for vite.*

I had read a bit about vitest early on, but didn't want to have to jump to something I hand't used before without good reason.  This error wall is a good reason, especially as described there.

So I will roll back all the work done so far and start from scratch there.

## Unit Test your React TypeScript App With Vitest

```sh
npm i -D vitest
npm i @testing-library/react
```

The package.json already has ```"test": "vitest",``` setup, so after creating a simple .ts sum function and test, that test will pass without any config.  Gotta like that.

It is automatically configure to watch for file updates also.

Next, it trying to test the actual rendered ```<App />``` and avoid a *ReferenceError: document is not defined* error, we need the JSDom lib.

```sh
npm i jsdom --save-dev
```

However, adding a test section to the vite.config.ts as is shown causes a TS editor error:

```err
No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'test' does not exist in type 'UserConfigExport'.ts(2769)
index.d.ts(3154, 18): The last overload is declared here.
```

I had to change the import to ```import { defineConfig } from 'vitest/config';``` and then that error is gone.

The first meaningful test:

```js
describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    render(<App />);
    const h2Elements = screen.getAllByText("Dr. Death");
    expect(h2Elements.length).toBeGreaterThan(0);
  });
});
```

Time for a commit.

## Redux Toolkit

I haven't used RTK 2.0 yet, so this seems like a good opportunity to at least try it out.  I have used RTK 1.0 on the job now for a few years, so I expect I can handle this.

There are the [Usage With TypeScript](https://redux-toolkit.js.org/usage/usage-with-typescript) and the [Redux Toolkit TypeScript Quick Start](https://redux-toolkit.js.org/tutorials/typescript) guides to start.

```sh
npm i @reduxjs/toolkit react-redux
npm i @types/react-redux
```

I create an appSlice.ts file, and a store directory for the store.ts and reducer.ts files set up to hold the programs array for now.

We should be able to move the data load function to an async thunk now and have our app test pass again.

Although not strictly called for I will need Axios for this:

```sh
npm i axios
```

I had to move the sampleData.json to the public directory for it to be available, then I was faced with a failing test:

```err
FAIL  src/App.test.tsx > Renders main page correctly > Should render the page correctly
Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>
```

Right, and use the Provider also in the unit tests.  I wrote a [blog post](https://timothycurchod.com/writings/redux-essentials-app-in-typescript) about this a few years ago.

We will need a React-Redux <Provider> component wrapped around them, with a real Redux store set up and provided.

The [docs](https://redux.js.org/usage/writing-tests) also point out: *test code should create a separate Redux store instance for every test, rather than reusing the same store instance and resetting its state. That ensures no values accidentally leak between tests.*

We will also need the deal with the Thunk middleware.

```sh
npm i redux-mock-store
npm i @types/redux-thunk
npm i --save-dev @types/redux-mock-store
```

However, I was not able to solve the plethora of errors that arose from trying to mock the state.  As it is, the state does not change and we can only test what is there when the App.tsx component is rendered:

```js
describe("App", () => {
  it("full app rendering/navigating", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Stan.com.au/i)).toBeTruthy();
  });
});
```

I have had issues with this before.  In my current project, I only use unit tests to describe Typescript functions.  If I want to really tests the rendered app, its much better to use Cypress to test what the user sees and interacts with.

## The Requirements

So far, I have a most of the items checked off the guidelines:

- TypeScript
- Babel
- Webpack (using Rollup)
- Jest
- React
- Redux (optional)
- Styled Components (optional)
- React Router (optional) -> coming soon

TODO

- ensure responsive support for 720p and 1080p screen sizes.
- text using "Open Sans" font.

## Routing

This can be done at this point and get the two pages working along with the basic components.

```npm i react-router-dom``` results in "react-router-dom": "^6.23.1" installed.

Initially I used the carousel example from the [Styled Components website](https://styled-components.com/) as inspiration for a stylish coursel with awor of cars that are smaller on the edges than the main image that is currently selected in the list.  The code is available on their [Github](https://github.com/styled-components/styled-components-website).

However, the CSS for the SmallShowcase is rather obtuse, so now I will re-interpret that look but with a more simple approach.

### "Home" Page

1. This page should consist of the layout along with a simple and reusable carousel.
2. The provided sample data (data.json) should be retrieved using the fetch API.
3. Each image in the carousel should link to a "Program" page.
4. Navigation between images in the carousel should be handled using the left, right and enter keyboard keys.
5. No more than six carousel images should be in the DOM at any time.
6. When the UI is in a loading state render a skeleton. (home-loading.jpg).
7. When an error occurs an error message message should be rendered. (error.jpg)
8. This functionality should be unit tested.

### "Program" Page

1. This page should consist of the layout along with a program overview.
2. The program to display should be determined by the ID.
3. You should only fetch the provided sample data if the "Home" page has not been visited first.
4. Pressing the backspace keyboard key should take you back to the "Home" page.
5. When the UI is in a loading state render a skeleton. (program-loading.jpg).
6. When an error occurs an error message message should be rendered. (error.jpg)
7. This functionality should be unit tested.

## React + TypeScript + Vite (old README)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
