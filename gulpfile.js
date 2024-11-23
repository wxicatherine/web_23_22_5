// Імпортуємо всі необхідні модулі
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

// Таск для HTML
gulp.task("html", () => {
  return gulp
    .src("./app/**/*.html")
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

// Таск для SCSS
gulp.task("scss", () => {
  return gulp
    .src("./app/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

// Таск для JS
gulp.task("js", () => {
  return gulp
    .src("./app/js/**/*.js")
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());
});

// Таск для зображень
gulp.task("images", () => {
  return gulp
    .src("./app/img/**/*", { encoding: false })
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/img"))
    .pipe(browserSync.stream());
});

// Таск для data.json
gulp.task("data", () => {
  return gulp
    .src("./app/data/**/*.json")
    .pipe(gulp.dest("./dist/data"))
    .on("end", browserSync.reload);
});

// Таск для запуску сервера
gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    reloadDebounce: 1000,
    injectChanges: true,
    reloadOnRestart: true,
    notify: false,
  });

  gulp.watch("./app/**/*.html", gulp.series("html"));
  gulp.watch("./app/scss/**/*.scss", gulp.series("scss"));
  gulp.watch("./app/js/**/*.js", gulp.series("js"));
  gulp.watch("./app/img/**/*", gulp.series("images"));
  gulp.watch("./app/data/**/*.json", gulp.series("data"));
});

// Таск за замовчуванням (виконується при запуску gulp)
gulp.task(
  "default",
  gulp.series("html", "scss", "js", "images", "data", "serve")
);
