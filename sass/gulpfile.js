const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const del = require('del');

gulp.task('styles', () => {
    return gulp.src('sass/app.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../static/css/'));
});

gulp.task('clean', () => {
    return del([
        '../static/css/app.css',
    ]);
});

gulp.task('watch', () => {
    gulp.watch('sass/**/*.sass', (done) => {
        gulp.series(['styles'])(done);
    });
});

// gulp.task('default', gulp.watch());
gulp.task('default', gulp.series(['clean', 'styles']));