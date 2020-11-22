const { dest, series, src } = require('gulp');
const chalk = require( 'chalk' );
const cleanCSS = require('gulp-clean-css');
const gulp = require( 'gulp' );
const pipeline = require( 'readable-stream' ).pipeline;
const uglify = require( 'gulp-uglify-es' ).default;

const target = 'prod/';

function minifyJS() {
	return pipeline(
		gulp.src( target + 'js/*.js' ),
		uglify({
			compress: {
				drop_console: true,
				toplevel: true
			}
		}),
		gulp.dest( target + 'js/' )
	);
}

function minifyCSS() {
	return src( target + 'css/*.css' )
		.pipe( cleanCSS() )
		.pipe( dest( target + 'css/' ) );
}

exports.default = series( minifyJS, minifyCSS );