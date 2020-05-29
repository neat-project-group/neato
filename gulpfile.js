const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const xo = require('gulp-xo');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('ts', () => {
	return tsProject.src()
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'));
});
gulp.task('lint', () => {
	return gulp.src('src/**.*s') // All *script files
		.pipe(xo())
		.pipe(xo.format())
		.pipe(xo.results(results => {
			console.log(`Linting finished with ${results.warningCount} warnings and ${results.errorCount} errors.`);
		}));
});

gulp.task('default', gulp.series('lint', 'ts'));
gulp.task('ci', gulp.series('ts'));
