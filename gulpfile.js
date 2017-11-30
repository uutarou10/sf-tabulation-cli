const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const babel = require('gulp-babel')

gulp.task('compile-main', ['clean-main'], () => {
  gulp.src('./src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/'))
})

gulp.task('clean-main', () => {
  return del.sync('./dist/main/**')
})