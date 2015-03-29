#Design Boilerplate

This repository contains a set of configurations for building a website (Frontend at least).

This is what i use on a daily basis. I usually start by planning what i need and add modules and functionalities as i need.

##Contents
As the main piece of engineering here, we have Gulp.js for running common tasks. The following gulp modules are bundled by default:

- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
- [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)
- [gulp-sass](https://www.npmjs.com/packages/gulp-sass)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [BrowserSync](http://www.browsersync.io/)
- [run-sequence](https://www.npmjs.com/package/run-sequence)

And for the templating modules:

- [Bootstrap 3](http://getbootstrap.com)
- [Font-Awesome Icons](http://fortawesome.github.io/Font-Awesome/icons/)

As well as the latest **jQuery** version.

##Installation

First of all, simply run:

    npm install

then:

    gulp build

After this, you should have Font-Awesome, Bootstrap and jQuery installed in your assets directory.

Finally, for livereloading just run:

    gulp serve

And access http://localhost:3000 in your web browser. (If you need more info or configurations go to the [BrowserSync](http://www.browsersync.io/docs) doc page)

