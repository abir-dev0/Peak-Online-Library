<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(){
        $order = Order::all();
        return response()->json([
            'status'=>200,
            'orders'=>$order
        ]);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['status' => 200, 'message' => 'Order deleted successfully']);
    }


    public function update(Request $request, Order $order)
    {
        $order ->update($request->all());
        return response()->json($order,201);
            
    }

    
    public function show($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order, 200);
    }

}
