const { src, dest, symlink, watch, parallel } = require('gulp');
const del = require('del');
const gulpass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Browser Sync
function browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch("*.html").on('change', browserSync.reload);
}

//Sass (scss -> css)
function sass(){
  return src('./sass/*.scss')
  .pipe(gulpass())
  .pipe(dest('./css/'))
  .pipe(browserSync.stream());
}

// Watch Sass
function watcher(done){
  watch('./sas/*.scss', sass)
  browserSync.reload();
  done();
}

// Src - dest
function srcExemple () {
   return src('./*.html')
    .pipe(dest('dossier1/'))
}

// clean
function clean () {
  return del('dossier1/*.html')
}

// LinkExemple
function linkExemple () {
  return src('./index.html')
   .pipe(symlink('dossier1'))
}


module.exports = {
  srcExemple,
  clean,
  linkExemple,
  sass,
  watcher,
  browser: parallel(browser, watcher)
}