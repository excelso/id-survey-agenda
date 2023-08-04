<x-guest-layout>
    <x-auth-session-status class="mb-4" :status="session('status')"/>
    <div class="login">
        <div class="login-left-container">
            <div class="login-box">
                <div class="login-header">
                    <img src="{{url('/images/logo-color.png')}}" class="mx-auto w-[150px]" alt="Logo"/>
                    <div class="mt-7">
                        <div class="font-bold text-5xl">
                            Welcome Back
                        </div>
                        <div class="font-normal text-sm">
                            Please Login to your Account
                        </div>
                    </div>
                </div>

                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="login-body">
                        <div class="form-group">
                            <label> Email Address </label>
                            <div class="form-group-control">
                                <span class="icon">
                                    <i class="far fa-envelope"></i>
                                </span>
                                <input type="text" name="email" class="form-control input email"
                                       placeholder="name@mail.com"/>
                            </div>
                            @if(count($errors) != 0 && isset($errors->get('email')[0]))
                                <div class="info-alert-text error errorEmail">
                                    <i class="fas fa-exclamation-circle"></i>
                                    <div class="errorEmailText">{{$errors->get('email')[0]}}</div>
                                </div>
                            @endif
                        </div>

                        <div class="form-group">
                            <label> Password </label>
                            <div class="form-group-control">
                                <span class="icon">
                                    <i class="fa fa-lock"></i>
                                </span>
                                <input type="password" name="password" class="form-control passw" placeholder="······"/>
                                <a class="show-pass btnLookPass">
                                    <i class="fas fa-eye-slash"></i>
                                </a>
                            </div>
                            @if(count($errors) != 0 && isset($errors->get('password')[0]))
                                <div class="info-alert-text error errorPassword">
                                    <i class="fas fa-exclamation-circle"></i>
                                    <div class="errorPasswordText">{{$errors->get('password')[0]}}</div>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div class="block mt-4">
                        <label for="remember_me" class="inline-flex items-center">
                            <input id="remember_me" type="checkbox"
                                   class="rounded border-gray-300 text-primary shadow-sm focus:ring-primary"
                                   name="remember" checked>
                            <span class="ml-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
                        </label>
                    </div>

                    @if(count($errors) != 0 && $errors->first('login-failed') !== null)
                        <div class="ds-alert ds-alert-error rounded-md mt-4">
                            <div class="text-white text-sm">
                                <i class="fas fa-exclamation-circle"></i>
                                <span>{{ $errors->first('login-failed') }}</span>
                            </div>
                        </div>
                    @endif

                    <div class="mt-4">
                        <button type="submit" class="btn btn-primary w-full">Login</button>
                    </div>
                </form>

                <div class="login-footer">
                    <div>Agenda @2023</div>
                    <div>Powered By ID Survey</div>
                </div>
            </div>
        </div>

        <div class="login-right-container">
            <div class="p-[40px]">
                <div id="typewriter"></div>
                {{-- <img src="{{asset('images/bg.png')}}" alt="background" width="700"> --}}
            </div>
        </div>
    </div>
</x-guest-layout>

@env('local')
    @vite(['resources/js/login/index.js'])
@endenv
@env(['staging', 'production'])
    <script src="/js/login/index.js"></script>
@endenv
