const gulp = require('gulp'); // Подключаем Gulp
const sass = require('gulp-sass'); //Подключаем Sass пакет
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
var concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    //   browserSync = require('browser-sync'), // Подключаем Browser Sync    
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'); // Подключаем библиотеку для автоматического добавления префиксов


gulp.task('sass-compile', function() { // Создаем таск Sass
    return gulp.src('./src/scss/**/*.scss') // Берем источник
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        // .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/css')) // Выгружаем результата в папку app/css
        // .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass-compile'))
});


gulp.task('sass', function() {
    return gulp.src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('src/css'))
        //.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

/*gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'src' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});*/

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
            'src/lib/jquery-3.4.0.min.js', // Берем jQuery
            'src/lib/swiper.js' // Берем swiper
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('src/js')); // Выгружаем в папку app/js
});

/*gulp.task('code', function() {
    return gulp.src('src/*.html')
        .pipe(browserSync.reload({ stream: true }))
});*/

gulp.task('css-libs', function() {
    return gulp.src('src/scss/*.scss') // Выбираем файл для минификации
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({ suffix: '.min' })) // Добавляем суффикс .min
        .pipe(gulp.dest('src/css')); // Выгружаем в папку app/css
});

gulp.task('clean', async function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('src/assets/images/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // С кешированием
            // .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })) /**/ )
        .pipe(gulp.dest('dist/assets/imageMin')); // Выгружаем на продакшен
});

gulp.task('prebuild', async function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
            'src/lib/*.min.css',
            'src/css/*.min.css'
        ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('src/assets/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/assets/fonts'))

    var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});
/*
gulp.task('clear', function(callback) {
    return cache.clearAll();
})*/

//gulp.task('watch', function() {
// gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
//  gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
//gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
//});


gulp.task('default', gulp.parallel('css-libs', 'sass', 'scripts' /*, 'watch'*/ ));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass-compile', 'scripts'));