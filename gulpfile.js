const gulp = require('gulp');
const bable = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const eslint = require('gulp-eslint');
const gulpSequence = require('gulp-sequence');

console.log('状态：', process.env.NODE_ENV);

gulp.task('builddev', () => {
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')
            .pipe(bable({
                // 不让外部的.babelrc影响内部
                babelrc: false,
                'plugins': [
                    'transform-es2015-modules-commonjs',
                    'transform-decorators-legacy'
                ]
            })).pipe(gulp.dest('dist'));
    });
});
gulp.task('buildprod', () => {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(bable({
            // 不让外部的.babelrc影响内部
            babelrc: false,
            'plugins': [
                'transform-es2015-modules-commonjs',
                'transform-decorators-legacy'
            ]
        })).pipe(gulp.dest('dist'));
});

gulp.task('buildconfig', () => {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(rollup({
            output: {
                format: 'cjs'
            },
            input: './src/nodeuii/config/config.js',
            plugins: [
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', () => {
    gulp.src('./src/nodeuii/pm2.json')
        .pipe(gulp.dest('dist'));
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

let _task = ['builddev'];
// 上线阶段 hint 编译 清洗&拷贝热启动文件
if (process.env.NODE_ENV === 'production') {
    _task = gulpSequence(['lint', 'buildprod', 'buildconfig']);
}
if (process.env.NODE_ENV === 'config') {
    _task = ['buildconfig'];
}
if (process.env.NODE_ENV === 'lint') {
    _task = ['lint'];
}
gulp.task('default', _task);
