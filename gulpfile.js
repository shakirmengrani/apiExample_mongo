var gulp = require("gulp");
var ts = require("gulp-typescript");

var paths = {
    src: "src/**/*.ts",
    dest: "dist/"
}


gulp.task('clean',function(){
    return null;
});

gulp.task('transplie',['clean'],function(){
    return gulp.src(paths.src)
    .pipe(ts({
        target: "es5",
        module: "commonjs",
        moduleResolution: "node",
        sourceMap: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        removeComments: false,
        noImplicitAny: false
  }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('watch',['transplie'],function(){
    gulp.watch(paths.src,['transplie']);
});

gulp.task('travis',function(){
    process.exit(0);
});

gulp.task('default',['watch','transplie']);