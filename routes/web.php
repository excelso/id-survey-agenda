<?php

use App\Http\Controllers\ControllerNotifikasi;
use App\Http\Controllers\Dashboard\ControllerDashboard;
use App\Http\Controllers\Master\ControllerUsers;
use App\Http\Controllers\Pengaturan\ControllerGantiPassword;
use App\Http\Controllers\Transaksi\ControllerSchedule;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ControllerDashboard::class, 'index']);

    Route::prefix('notifikasi')->group(function () {
        Route::get('data-notif', [ControllerNotifikasi::class, 'getDataNotifikasi']);
        Route::get('test-message', [ControllerNotifikasi::class, 'testSendMessage']);
        Route::get('count-data-notif', [ControllerNotifikasi::class, 'getCountNotifikasi']);
        Route::get('mark-all-read', [ControllerNotifikasi::class, 'markAllReadNotifikasi']);
        Route::post('read-notif', [ControllerNotifikasi::class, 'readNotifikasi']);
        Route::prefix('firebase')->group(function () {
            Route::post('save-token', [ControllerNotifikasi::class, 'saveFirebaseRegToken']);
        });
    });

    Route::prefix('trans')->group(function () {
        Route::prefix('schedule')->group(function () {
            Route::get('/', [ControllerSchedule::class, 'index']);
            Route::post('store', [ControllerSchedule::class, 'store']);
            Route::post('update', [ControllerSchedule::class, 'update']);
            Route::delete('delete', [ControllerSchedule::class, 'delete']);
            Route::get('load-agenda', [ControllerSchedule::class, 'loadAgenda']);
        });
    });

    Route::prefix('master')->group(function () {
        Route::prefix('karyawan')->group(function () {
            Route::get('/', [ControllerUsers::class, 'index']);
            Route::post('store', [ControllerUsers::class, 'store']);
            Route::post('update', [ControllerUsers::class, 'update']);
            Route::delete('delete', [ControllerUsers::class, 'delete']);
        });
    });

    Route::prefix('pengaturan')->group(function () {
        Route::prefix('ganti-password')->group(function () {
            Route::get('/', [ControllerGantiPassword::class, 'index']);
            Route::post('update', [ControllerGantiPassword::class, 'updatePassword']);
        });
    });
});

require __DIR__ . '/auth.php';
