let mix = require('laravel-mix');
const path = require("path")
mix
    .browserSync({
        proxy: {
            target: 'http://localhost:2025/'
        },
        port: 2025,
    })
    .alias({
        '@': path.join(__dirname, 'resources')
    })
    .js('resources/js/app.js', 'public/js')
    .js('resources/js/login/index.js', 'public/js/login')
    .js('resources/js/main/dashboard/index.js', 'public/js/main/dashboard')
    .js('resources/js/main/master/data-karyawan/index.js', 'public/js/main/master/data-karyawan')
    .js('resources/js/main/master/data-ndvi/index.js', 'public/js/main/master/data-ndvi')
    .js('resources/js/main/ndvi-maps/index.js', 'public/js/main/ndvi-maps')
    .copy('resources/js/plugins/toast.js', 'public/js/plugins')
    .copy('resources/js/plugins/jquery.number.js', 'public/js/plugins')
    .copy('resources/js/plugins/jquery.inputmask.js', 'public/js/plugins')
    .copy('node_modules/select2/dist/js/select2.js', 'public/js/plugins/select2/dist/js')
    .copy('node_modules/select2/dist/js/select2.full.js', 'public/js/plugins/select2/dist/js')
    .copy('node_modules/select2/dist/css/select2.css', 'public/js/plugins/select2/dist/css')
    .copy('node_modules/select2/dist/css/select2.min.css', 'public/js/plugins/select2/dist/css')
    .copy('node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.js', 'public/js/plugins/datetimepicker/dist/js')
    .copy('node_modules/jquery-datetimepicker/build/jquery.datetimepicker.min.css', 'public/js/plugins/datetimepicker/dist/css')
    .sass('resources/css/app.scss', 'public/css')
    .sass('resources/css/toast.scss', 'public/css')
