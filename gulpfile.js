const {src, dest, task} = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// function copy() {
//     return src('scripts/*.js').pipe(dest('dist'))
// }

function scripts() {
    return src('scripts/*.js')
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("dist"))
}

exports.scripts = scripts;

// task("default", series("scripts"));