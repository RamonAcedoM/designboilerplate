/*------------------------------------------------------------------------------
* Gulp module load
*-----------------------------------------------------------------------------*/
var gulp = require('gulp'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
plumber = require('gulp-plumber'),
minify = require('gulp-minify-css'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
bower = require('gulp-bower'),
browserify = require('browserify'),
transform = require('vinyl-transform'),
runSequence = require('run-sequence'),
browserSync = require('browser-sync'),
reload = browserSync.reload;

/*------------------------------------------------------------------------------
* Variables for directories
*-----------------------------------------------------------------------------*/

// Directories for compiled elements
var directories = {
	sass: 	"assets/sass/",
	css: 	"assets/css/",
	fonts: 	"assets/fonts",
	js: 	"assets/js/"
}

/*------------------------------------------------------------------------------
* Main Sass Compile Function
*-----------------------------------------------------------------------------*/
gulp.task('sass',function(){
	gulp.src(directories.sass + "style.scss")
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(directories.css))
		.pipe(reload({stream:true}));
});

/*------------------------------------------------------------------------------
* Minify Sass output
*-----------------------------------------------------------------------------*/

gulp.task('minify',function(){
	gulp.src(directories.css + "style.css")
		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest(directories.css))
		.pipe(reload({stream:true}));
});

/*------------------------------------------------------------------------------
* Run tasks in sequence
*-----------------------------------------------------------------------------*/

gulp.task('sequence:css',function(){
	runSequence('sass','minify');
});

/*------------------------------------------------------------------------------
* Browserify - Gulp Recipes
*-----------------------------------------------------------------------------*/
gulp.task('javascript', function () {
  // transform regular node stream to gulp (buffered vinyl) stream 
  var browserified = transform(function(filename) {
    var b = browserify({entries: filename, debug: true});
    return b.bundle();
  });

  return gulp.src(directories.js + "main.js")
    .pipe(browserified)
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .pipe(rename('main.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(directories.js))
    .pipe(reload({stream:true}));
});

/*------------------------------------------------------------------------------
* Runs Bower Install command
*-----------------------------------------------------------------------------*/

gulp.task('bower',function(){
	return bower({ cmd: "install" });
});

/*------------------------------------------------------------------------------
* BrowserSync for Livereload of documents
*-----------------------------------------------------------------------------*/

gulp.task('serve',function(){
	browserSync({
		server:{
			baseDir: "./"
		}
	});

	gulp.watch([directories.scss + "**/*.scss", directories.sass + "style.scss"],['sequence:css']);
	gulp.watch(directories.js + "main.js",['javascript']);
	gulp.watch('*.html').on('change',reload);
});

/*------------------------------------------------------------------------------
* Build - Get stuff up and running!
*-----------------------------------------------------------------------------*/
gulp.task('build',function(){
	runSequence('bower','javascript','sequence:css');
});
/*------------------------------------------------------------------------------
* Gulp Default task
*-----------------------------------------------------------------------------*/
gulp.task('default',['sequence:css','serve']);