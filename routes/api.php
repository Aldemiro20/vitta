<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AuthController;
Route::get("/ping", function(){
    return ["/pong"=>true];
});


Route::post('/auth/login', 'App\Http\Controllers\AuthController@login');
Route::get('/auth/logout', 'App\Http\Controllers\AuthController@logout');
Route::get('/auth/refresh', 'App\Http\Controllers\AuthController@refresh');
Route::post('/user', 'App\Http\Controllers\AuthController@create');


Route::get('/user', [UserController::class, 'read']);
Route::put('/user', [UserController::class, 'update']);
Route::post('/user_d', [UserController::class, 'delete']);
Route::post('/users', [UserController::class, 'list']);
Route::post('/user_id', [UserController::class, 'listId']);

Route::post('/contact_q', [ContactController::class, 'listQ']);
Route::post("/contact", [ContactController::class, 'create']);
Route::post("/contacts", [ContactController::class, 'list']);
Route::put("/contact_u", [ContactController::class, 'update']);
Route::post('/contact_d', [ContactController::class, 'delete']);
Route::get("/search", [ContactController::class, 'search']);
Route::get('/user_admin/ad_d', [ContactController::class, 'admin']);




