<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addtocart(Request $request){
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $book_id = $request->book_id;
            $book_qty = $request->book_qty;

            // Check if the cart item already exists for the user
            $existingCartItem = Cart::where('user_id', $user_id)->where('book_id', $book_id)->first();

            if ($existingCartItem) {
                return response()->json([
                    'status' => 409,
                    'message' => 'Book already in cart',
                ]);
            } else {
                $cartItem = Cart::create([
                    'user_id' => $user_id,
                    'book_id' => $book_id,
                    'book_qty' => $book_qty,
                ]);

                return response()->json([
                    'status' => 201,
                    'message' => 'Added to cart',
                    'data' => $cartItem,
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to add to the cart',
            ]);
        }
    }
    public function viewcart(){
        if(auth('sanctum')->check()){
            $user_id=auth('sanctum')->user()->id;
            $cartItems = Cart::where('user_id', $user_id)->with('book')->get();

            return response()->json([
                'status' => 200,
                'cart' => $cartItems,
            ]);
        }

        else{
            return response()->json([
                'status' => 401,
                'message' => 'Login to view your cart data',
            ]);
        }
    }
    public function updateQuatity($cart_id, $scope) {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('user_id', $user_id)->where('id', $cart_id)->first();
            
            if ($scope == 'inc') {
                $cartItem->book_qty += 1;
            } else if ($scope == 'dec') {
                $cartItem->book_qty -= 1;
            }
    
            $cartItem->update();
    
            return response()->json([
                'status' => 200,
                'message' => 'Quantity updated',
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue',
            ]);
        }
    }
    public function deletcartitem($cart_id){
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('user_id', $user_id)->where('id', $cart_id)->first();
            
            if($cartItem){
                $cartItem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Cart item deleted successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Cart item not found',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue',
            ]);
        }
    }
    
}