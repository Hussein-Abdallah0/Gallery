<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoginHistoryController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    //Authorized Users
    Route::group(["middleware" => "auth:api"], function () {

        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);

        Route::get('login-history', [LoginHistoryController::class, 'index']);

        Route::get('/global-messages', [MessageController::class, 'index']);
        Route::post('/global-messages', [MessageController::class, 'store']);
    });

    //Unauthenticated Users
    Route::post('/login', [AuthController::class, "login"]);
    Route::post('/register', [AuthController::class, "register"]);
});
