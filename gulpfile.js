const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');



gulp.task('clean', async function () {
    del.sync('dist');
});

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss')
        // .pipe(sass({outputStyle: 'expanded'}))
        .pipe(sass(({outputStyle: 'compressed'})))
        .pipe(autoprefixer({
            browsers: ['last 8 versions']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('export', async function () {
    let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));

    let buildCss= gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    let buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    let buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    let buildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
});


gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('scss', 'script', 'browser-sync', 'watch'));