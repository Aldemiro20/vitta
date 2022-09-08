<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;

Route::get("/ping", function(){
    return ["/pong"=>true];
});

Route::get("/401", [AuthController::class, 'unauthourized'])->name("login");

Route::post("/auth/login", [AuthController::class, 'login']);
Route::post("/auth/logout", [AuthController::class, 'logout']);
Route::post("/auth/refresh", [AuthController::class, 'refresh']);
Route::post('/user', [AuthController::class, 'create']);

Route::get('/user', [UserController::class, 'read']);
Route::put('/user', [UserController::class, 'update']);
Route::post('/user_d', [UserController::class, 'delete']);
Route::get('/users', [UserController::class, 'list']);

Route::post("/contact", [ContactController::class, 'create']);
Route::get("/contacts", [ContactController::class, 'list']);
Route::put("/contact", [ContactController::class, 'update']);
Route::post('/contact_d', [ContactController::class, 'delete']);
Route::get("/search", [ContactController::class, 'search']);





