<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function placeorder(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|max:191',
                'lastname' => 'required|max:191',
                'phone' => 'required|max:191',
                'email' => 'required|max:191',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'message' => $validator->errors()
                ]);
            } else {
                try {
                    $user_id = auth('sanctum')->user()->id;
                    $order = new Order;
                    $order->user_id = $user_id;
                    $order->firstname = $request->firstname;
                    $order->lastname = $request->lastname;
                    $order->phone = $request->phone;
                    $order->email = $request->email;
                    $order->address = $request->address;
                    $order->city = $request->city;
                    $order->state = $request->state;
                    $order->zipcode = $request->zipcode;
                    $order->payment_mode = $request->payment_mode;
                    $order->tracking_no = 'peak' . rand(11111, 99999);
                    $order->save();

                    $cart = Cart::where('user_id', $user_id)->get();
                    $orderItems = [];
                    foreach ($cart as $item) {
                        $orderItems[] = [
                            'book_id' => $item->book_id,
                            'quantity' => $item->book_qty,
                            'price' => $item->book->price
                        ];
                    }

                    $order->orderItems()->createMany($orderItems);
                    Cart::where('user_id', $user_id)->delete();

                    return response()->json([
                        'status' => 200,
                        'message' => 'Order placed successfully'
                    ]);
                } catch (\Exception $e) {
                    Log::error('Error placing order: ' . $e->getMessage());
                    Log::error('Trace: ' . $e->getTraceAsString());

                    Log::error('Request Data: ' . json_encode($request->all()));
                    Log::error('User ID: ' . $user_id);

                    return response()->json([
                        'status' => 500,
                        'message' => 'Something went wrong. Please try again.'
                    ]);
                }
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue',
            ]);
        }
    }

    
}