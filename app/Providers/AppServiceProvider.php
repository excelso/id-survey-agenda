<?php

    namespace App\Providers;

    use Carbon\Carbon;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
    use Illuminate\Support\Facades\Blade;
    use Illuminate\Support\Facades\URL;

    // use Illuminate\Support\ServiceProvider;

    class AppServiceProvider extends ServiceProvider {
        /**
         * Register any application services.
         *
         * @return void
         */
        public function register() {
            //
        }

        /**
         * Bootstrap any application services.
         *
         * @return void
         */
        public function boot(): void {
            $this->registerPolicies();
            Auth::provider('external-api', function ($app, array $config) {
                return new ExternalApiUserProvider();
            });

            if (in_array(env('APP_ENV'), ['staging', 'production'])) {
                URL::forceScheme('https');
            }

            config(['app.locale' => 'id']);
            Carbon::setLocale('id');
        }
    }
