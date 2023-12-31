<?php

namespace App\Exceptions;

use Carbon\Carbon;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Throwable;

class Handler extends ExceptionHandler {
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [//
    ];
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [//
    ];
    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register() {
        $this->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->wantsJson() || $request->getContentType() == 'form') {
                return response()->json([
                    'message' => 'Halaman tidak ditemukan!',
                    'responseTime' => Carbon::now(),
                ], 404);
            } else {
                return response()->view('errors.404', [
                    'message' => 'Halaman yang anda maksud tidak ditemukan!'
                ]);
            }
        });

        $this->renderable(function (MethodNotAllowedHttpException $e, $request) {
            if ($request->wantsJson() || $request->getContentType() == 'form') {
                return response()->json([
                    'message' => $request->method() . ' Method is not Allowed!',
                    'responseTime' => Carbon::now(),
                ], 405);
            } else {
                $allowMethod = $e->getHeaders()['Allow'] ?? '';
                return response()->view('errors.405', [
                    'message' => 'Halaman ini hanya support untuk method ' . $allowMethod
                ]);
            }
        });

        // $this->reportable(function (Throwable $e, $request) {
        // });
    }

    public function render($request, Throwable $e): Response|JsonResponse|\Symfony\Component\HttpFoundation\Response {
        if ($request->isJson()) {
            return response()->json([
                'message' => $e->getMessage(),
                'type' => get_class($e),
                'responseTime' => Carbon::now(),
            ], 500);
        } else {
            return parent::render($request, $e); // TODO: Change the autogenerated stub
        }
    }

}
