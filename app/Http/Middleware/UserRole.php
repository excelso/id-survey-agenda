<?php

    namespace App\Http\Middleware;

    use Closure;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\RedirectResponse;
    use Illuminate\Http\Request;
    use Illuminate\Http\Response;
    use Illuminate\Support\Facades\Auth;

    class UserRole {
        /**
         * Handle an incoming request.
         *
         * @param \Illuminate\Http\Request $request
         * @param \Closure(\Illuminate\Http\Request): (Response|RedirectResponse) $next
         * @return Response|RedirectResponse
         */
        public function handle(Request $request, Closure $next, ...$roles): Response|RedirectResponse|JsonResponse {
            if (Auth::check()) {
                if (in_array(Auth::user()->role_id, $roles)) {
                    return $next($request);
                }

                if (in_array(Auth::user()->role_id, $roles)) {
                    if ($request->ajax()) {
                        return response()->json([]);
                    }
                }
            }

            abort(401, 'Halaman tidak Tersedia untuk Akun anda!');
        }
    }
