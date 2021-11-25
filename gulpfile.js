const {src, dest, task} = require('gulp');

// function copy() {
//     return src('scripts/*.js').pipe(dest('dist'))
// }

task('scripts', () => {
    return src('scripts/*.js')
    .pipe(concat("main.js"))
    .pipe(dest("dist"))
})

// exports.copy = copy;