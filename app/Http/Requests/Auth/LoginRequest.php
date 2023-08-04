<?php

    namespace App\Http\Requests\Auth;

    use App\Models\Karyawan;
    use App\Models\Master\Karyawan\User;
    use Illuminate\Auth\Events\Lockout;
    use Illuminate\Contracts\Validation\Rule;
    use Illuminate\Foundation\Http\FormRequest;
    use Illuminate\Support\Facades\App;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\RateLimiter;
    use Illuminate\Support\Str;
    use Illuminate\Validation\ValidationException;

    class LoginRequest extends FormRequest {
        /**
         * Determine if the user is authorized to make this request.
         */
        public function authorize(): bool {
            return true;
        }

        /**
         * Get the validation rules that apply to the request.
         *
         * @return array<string, Rule|array|string>
         */
        public function rules(): array {
            return [
                'email' => [
                    'required',
                    'string',
                    'email'
                ],
                'password' => [
                    'required',
                    'string',
                    'min:8',
                ],
            ];
        }

        public function messages(): array {
            App::setLocale('id');
            return [
                'email.required' => trans('auth.email-required'),
                'email.email' => trans('auth.email-format'),
                'password.required' => trans('auth.password-required'),
                'password.min' => trans('auth.password-min', [
                    'min' => ':min'
                ]),
            ];
        }

        /**
         * Attempt to authenticate the request's credentials.
         *
         * @throws \Illuminate\Validation\ValidationException
         */
        public function authenticate(): void {
            // $this->ensureIsNotRateLimited();

            if (!Auth::attempt($this->only('email', 'password'), $this->input('remember'))) {
                RateLimiter::hit($this->throttleKey());
                App::setLocale('id');

                throw ValidationException::withMessages([
                    'login-failed' => trans('auth.login-failed')
                ]);

            } else {
                $user = User::where('email', $this->input('email'))
                    ->select(
                        'users.*',
                    )
                    ->where('users.status_user', 1)
                    ->get()->first();

                if ($user == null) {
                    throw ValidationException::withMessages([
                        'login-failed' => 'Akun anda telah di nonaktifkan!'
                    ]);
                }
            }

            // RateLimiter::clear($this->throttleKey());
        }

        /**
         * Ensure the login request is not rate limited.
         *
         * @throws \Illuminate\Validation\ValidationException
         */
        public function ensureIsNotRateLimited(): void {
            if (!RateLimiter::tooManyAttempts($this->throttleKey(), 2)) {
                return;
            }

            event(new Lockout($this));

            $seconds = RateLimiter::availableIn($this->throttleKey());

            throw ValidationException::withMessages([
                'login-failed' => trans('auth.throttle', [
                    'seconds' => $seconds,
                    'minutes' => ceil($seconds / 60),
                ]),
            ]);
        }

        /**
         * Get the rate limiting throttle key for the request.
         */
        public function throttleKey(): string {
            return Str::transliterate(Str::lower($this->input('email')) . '|' . $this->ip());
        }
    }
