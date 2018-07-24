var gulp = require("gulp"),
sass = require("gulp-sass"),
autoprefixer = require("gulp-autoprefixer"),
browserSync = require("browser-sync"),
webpack = require("webpack");

gulp.task("sass", function(){
    return gulp.src("./src/assets/sass/**/*.scss")
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest("./dist/assets/css"))
})
gulp.task("script",function(){
    return gulp.src("./src/assets/js/app.js")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("./dist/assets/js/"));
})
gulp.task("serve", function(){
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    })

    gulp.watch("./src/assets/sass/**/*.scss",['sass']);
    gulp.watch("./src/assets/js/**/*.js",['script']);
    gulp.watch("./dist/assets/css/**/*.css").on("change", browserSync.reload);
    gulp.watch("./dist/assets/js/app.js").on("change", browserSync.reload);
    gulp.watch("./dist/*.html").on("change", browserSync.reload);;
})