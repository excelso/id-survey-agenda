<?php

use App\Http\Controllers\ControllerOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::prefix('sales')->group(function () {
        Route::prefix('order')->group(function () {
            Route::get('get-order', [
                ControllerOrder::class,
                'getDataOrder'
            ]);
            Route::post('update-order-invoice', [
                ControllerOrder::class,
                'updateOrderInvoice'
            ]);
        });
    });
});
