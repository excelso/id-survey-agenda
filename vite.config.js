import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.scss',
                'resources/css/toast.scss',
                'resources/js/app.js',
                'resources/js/login/index.js',
                'resources/js/main/master/data-karyawan/index.js',
                'resources/js/main/master/data-customer/index.js',
                'resources/js/main/pengaturan/data-periode-account/index.js',
                'resources/js/main/master/data-portofolio/index.js',
                'resources/js/main/master/data-unit-kerja/index.js',
                'resources/js/main/master/data-profesi/index.js',
                'resources/js/main/account-planning/index.js',
                'resources/js/main/account-planning/process-approval.js',
                'resources/js/main/leads/index.js',
                'resources/js/main/leads/show.js',
                'resources/js/main/leads/process-approval.js',
                'resources/js/main/dashboard/admin/index.js',
                'resources/js/main/opportunity/index.js',
                'resources/js/main/opportunity/show.js',
                'resources/js/main/order/index.js',
                'resources/js/main/order/show.js',
                'resources/js/main/knowledges/repository/index.js',
                'resources/js/main/knowledges/tenaga-ahli/index.js',
                'resources/js/main/knowledges/tenaga-ahli/show.js',
                'resources/js/main/knowledges/info-tender/index.js',
                'resources/js/plugins/toast.js',
            ],
            refresh: true,
        })
    ],
    server: {
        host: false
    },
    resolve: {
        alias: {
            '@': '/resources',
        },
    },
});
