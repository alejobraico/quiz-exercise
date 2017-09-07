## Simple JAMStack static site generator for quiz application

Simple [JAMStack](https://jamstack.org/) [static site generator](https://www.staticgen.com/about) made with [ryor](https://github.com/ryor/ryor) which uses [TypeScript](https://www.typescriptlang.org/), [TSLint](https://palantir.github.io/tslint/), [Preact](https://github.com/developit/preact) (the "fast 3kB alternative to React"), [PostCSS](https://github.com/postcss/postcss) with [cssnext](https://github.com/MoOx/postcss-cssnext), [TOML](https://github.com/toml-lang/toml) for simple content authoring, [chokidar](https://github.com/paulmillr/chokidar) for file-watching during development, [jsdom](https://github.com/tmpvar/jsdom) for HTML pre-rendering and optimizes build with [cssnano](https://github.com/ben-eb/cssnano), [htmlclean](https://github.com/anseki/htmlclean), [UglifyJS](https://github.com/mishoo/UglifyJS2) and [optimize-js](https://github.com/nolanlawson/optimize-js).

Optimized production build requires only one 6.5K (gzipped) request for initial page render.  HTML for welcome screen is pre-rendered so initial page render should be lightning fast.

Content updates can be handled by adding/removing/editing questions in the TOML source file (content/questions.toml), commiting changes to the Git repository and pushing the commit to Github.  [Netlify](https://www.netlify.com) handles deployment from there.

The ryor runnable **commit** can handle "releases" (updates patch version number in package.json file, tags commit and pushes to Github) with the following command: `node run commit -r "Some commit message"`

The ryor runnable **develop** runs initial development build and then starts file watchers and development server (`node run develop`).

[Demo](http://quiz-exercise.netlify.com/)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/movecodemove/quiz-exercise)
