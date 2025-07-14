<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\WriterController;
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

// Route::middleware('auth:sanctum')->group(function(){
//         Route::get('/user', function (Request $request) {
//             return $request->user();
//     });
//     Route::post('/logout', [AuthController::class,'logout']);

// })
Route::post('/login', [AuthController::class,'login']);
Route::post('/signup', [AuthController::class,'signup']);

Route::apiResource('/books',BookController::class);
Route::post('add-to-cart',[CartController::class,'addtocart']);
Route::get('carts',[CartController::class,'viewcart']);
Route::put('update-quantity/{cart_id}/{scope}',[CartController::class,'updateQuatity']);
Route::delete('delete-cartitem/{cart_id}',[CartController::class,'deletcartitem']);
Route::post('place-order',[CheckoutController::class,'placeorder']);
Route::post('validate-order',[CheckoutController::class,'validateOrder']);
Route::get('orders',[OrderController::class,'index']);
Route::delete('/delete-order/{order}', [OrderController::class, 'destroy']);
Route::get('order/{order}',[OrderController::class,'show']);
Route::put('edit-order/{order}',[OrderController::class,'update']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
                return $request->user();
            });
    Route::post('/logout', [AuthController::class,'logout']);

    
    // Route::middleware(['role:user'])->group(function () {
    //     Route::get('/user', function (Request $request) {
    //         return $request->user();
    //     });
    // });
    // Route::middleware(['role:admin'])->group(function () {
    //     Route::get('/admin', function (Request $request) {
    //         return $request->user();
    //     });
    //     Route::post('/adminLogout', [AuthController::class,'adminLogout']);
       
    // });
});


Route::apiResource('/users',UserController::class);
Route::apiResource('/admins',AdminController::class);

Route::get('/writers',[WriterController::class,'index']);

// Route::middleware('auth:sanctum')->group(function () {

//     Route::post('/logout', [AuthController::class, 'logout']);

//     // Routes for users
//     Route::middleware('user')->group(function () {
//         Route::get('/user', function (Request $request) {
//             return $request->user();
//         });

//     });

//     // Routes for admins
//     Route::middleware('admin')->group(function () {
//         Route::get('/admin', function (Request $request) {
//             return $request->user();
//         });
//         Route::post('/admin/create-book', [BookController::class, 'store']);
//         Route::apiResource('/admins', AdminController::class);
//     });
// });







// Route::post('/login', [AuthController::class, 'Userlogin']);




