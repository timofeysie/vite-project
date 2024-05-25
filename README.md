# Stan Test

This is a test submission project for the Stan.tv coding challenge.

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

This is a very straight forward route, and the current defacto *simple* way to start an app in React.

- create project with Vite and configure build to create a minimal dist directory.
- add styled-components and implement basic carousel-like layout
- create a type for programs

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

## React + TypeScript + Vite (old)

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
