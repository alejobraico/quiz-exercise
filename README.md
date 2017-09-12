## Simple static site generator for quiz application

Simple [static site generator](https://www.staticgen.com/about) made with [ryor](https://github.com/ryor/ryor) which uses [TypeScript](https://www.typescriptlang.org/), [TSLint](https://palantir.github.io/tslint/), [Preact](https://github.com/developit/preact) (the "fast 3kB alternative to React"), [PostCSS](https://github.com/postcss/postcss) with [cssnext](https://github.com/MoOx/postcss-cssnext) and [stylelint](https://github.com/stylelint/stylelint), [chokidar](https://github.com/paulmillr/chokidar) for file-watching during development, [jsdom](https://github.com/tmpvar/jsdom) for HTML pre-rendering and optimizes build with [cssnano](https://github.com/ben-eb/cssnano), [htmlclean](https://github.com/anseki/htmlclean), [UglifyJS](https://github.com/mishoo/UglifyJS2) and [optimize-js](https://github.com/nolanlawson/optimize-js).

Optimized production build requires only one ~7K (gzipped) request for initial page render.  HTML for welcome screen is pre-rendered so initial page render should be lightning fast.

Question data courtesy of [Open Trivia Database](https://opentdb.com/).

The ryor runnable **commit** can handle "releases" (updates patch version number in package.json file, tags commit and pushes to Github) with the following command: `node run commit -r "Some commit message"`

The ryor runnable **develop** runs initial development build and then starts file watchers and development server (`node run develop`).

[Demo](http://quiz-exercise.netlify.com/)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/movecodemove/quiz-exercise)
