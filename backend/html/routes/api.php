<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\GeographicBoundaryController;
use App\Http\Controllers\Api\v1\GeographicBoundaryTypeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('v1/geographic_boundary', GeographicBoundaryController::class);
Route::apiResource('v1/geographic_boundary_type', GeographicBoundaryTypeController::class);


Route::get('v1/test', function () {
    return response()->json([
        'message' => 'Hello World!'
    ]);
});