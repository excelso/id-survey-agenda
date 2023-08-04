const defaultTheme = require('tailwindcss/defaultTheme');
const screen = require('./screen.json')

/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
        './node_modules/flowbite/**/*.js'
    ],
    theme: {
        screens: {...screen},
        fontFamily: {
            nunito: ['Nunito', ...defaultTheme.fontFamily.sans],
            materialIcon: ['Material Icons'],
        },
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            content: {
                chevronRight: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20px\" viewBox=\"0 0 20 20\" fill=\"currentColor\"> <path fill-rule=\"evenodd\" d=\"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z\" clip-rule=\"evenodd\"/> </svg>')"
            },
            colors: {
                "primary": 'rgb(29 78 216)',
                "secondary": 'rgb(48, 51, 77)',
                "accent": 'rgb(185 28 28)',
                "dark": '#282942',
                "dark-1": '#30334d',
                "dark-2": '#4a4d66',
                "grey1": '#cecece',
                "grey2": '#dcdcdc',
                "grey3": '#f5f5f5',
                "light": '#ffffff',
                "green1": '#5db553',
                "green2": '#28a745',
                "yellow1": '#ebd650',
                "yellow2": '#c6b025',
                "red1": '#f66e6e',
                "blue1": '#4979e7',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require("daisyui"),
        require("flowbite/plugin"),
    ],
    daisyui: {
        styled: true,
        themes: false,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "ds-",
        darkTheme: "light",
    },
};
