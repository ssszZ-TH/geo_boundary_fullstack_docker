<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\v1\CityController;
use App\Http\Controllers\Api\v1\CountryController;
use App\Http\Controllers\Api\v1\CountyCityController;
use App\Http\Controllers\Api\v1\CountyController;
use App\Http\Controllers\Api\v1\GeographicBoundaryController;
use App\Http\Controllers\Api\v1\GeographicBoundaryTypeController;
use App\Http\Controllers\Api\v1\PostalCodeController;
use App\Http\Controllers\Api\v1\ProvinceController;
use App\Http\Controllers\Api\v1\RegionController;
use App\Http\Controllers\Api\v1\SalesTerritoryController;
use App\Http\Controllers\Api\v1\ServiceTerritoryController;
use App\Http\Controllers\Api\v1\StateController;
use App\Http\Controllers\Api\v1\TerritoryController;
use App\Http\Controllers\Api\v1\DistrictController;
use App\Http\Controllers\Api\v1\SubDistrictController;


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

Route::apiResource('v1/city',CityController::class);
Route::apiResource('v1/country',CountryController::class);
Route::apiResource('v1/county_city',CountyCityController::class);
Route::apiResource('v1/county',CountyController::class);
Route::apiResource('v1/geographic_boundary', GeographicBoundaryController::class);
Route::apiResource('v1/geographic_boundary_type', GeographicBoundaryTypeController::class);
Route::apiResource('v1/city', CityController::class);
Route::apiResource('v1/postal_code',PostalCodeController::class);
Route::apiResource('v1/province',ProvinceController::class);
Route::apiResource('v1/region',RegionController::class);
Route::apiResource('v1/sales_territory',SalesTerritoryController::class);
Route::apiResource('v1/service_territory',ServiceTerritoryController::class);
Route::apiResource('v1/state',StateController::class);
Route::apiResource('v1/territory',TerritoryController::class);

Route::apiResource('v1/district',DistrictController::class);
Route::apiResource('v1/sub_district',SubDistrictController::class);


Route::get('v1/state/dd/{id}', [StateController::class, 'stateDDByCountryId']);
Route::get('v1/county/dd/{id}', [CountyController::class, 'countyDDByStateId']);
Route::get('v1/county_city/dd/{id}', [CountyCityController::class, 'countyCityDDBycountyId']);

Route::get('v1/province/dd/{id}', [ProvinceController::class, 'provinceDDByCountryId']);
Route::get('v1/district/dd/{id}', [DistrictController::class, 'getDistrictByProvinceId']);
Route::get('v1/sub_district/dd/{id}', [SubDistrictController::class, 'getSubDistrictByDistrictId']);

Route::get('v1/test', function () {
    return response()->json([
        'message' => 'Hello World!'
    ]);
});