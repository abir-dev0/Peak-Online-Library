<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginreaquest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();

        /** @var \App\Models\User $user */
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken($user->email)->plainTextToken;
            return response()->json(compact('user', 'token'));
        }
        return response()->json(['message' => 'Provided email or password is incorrect'], 422);

        // if (Auth::attempt(['email'=>$request->email,'password'=>$request->password])) {
        //     $user = Auth::user();
        //     $token = $user->createToken('main')->plainTextToken;
        //     return response()->json(['message'=>'all good','user'=>$user,'token'=>$token]);
        // }



        
        

        // // Attempt to authenticate as an admin
        // /** @var \App\Models\User $user */
        // if (Auth::guard('admin')->attempt($credentials)) {
        //     $admin = Auth::guard('admin')->user();
        //     $token = $admin->createToken('main')->plainTextToken;
        //     return response()->json(compact('admin', 'token'));
        // }

        // // If authentication fails
    








        // if (!Auth::attempt($credentials)) {
        //     return response([
        //         'message' => 'Provided email or password is incorrect'
        //     ], 422);
        // }
        
            // $user = Auth::user();
            // $token = $user->createToken('main')->plainTextToken;
            // // $user = $user->only(['id', 'name', 'email', 'role']);
            // return response(compact('user', 'token'));
            
        // $user = Auth::guard('admin')->user();
        // $token = $user->createToken('main')->plainTextToken;
        // return response(compact('user', 'token'));
    }





    // public function Userlogin(LoginRequest $request)
    // {
    //     $credentials = $request->validated();
    //     if (!Auth::guard('web')->attempt($credentials)) {
    //         return response([
    //             'message' => 'Provided email or password is incorrect'
    //         ], 422);
    //     }

    //     /** @var \App\Models\User $user */
    //     $user = Auth::user();
    //     $token = $user->createToken('main')->plainTextToken;
    //     // $user = $user->only(['id', 'name', 'email', 'role']);
    //     return response(compact('user', 'token'));
        
    // }

    // public function adminLogin(AdminLoginreaquest $request)
    // {
    //     $credentials = $request->validated();
    //     if (!Auth::guard('admin')->attempt($credentials)) {
    //         return response([
    //             'message' => 'Provided email or password is incorrect'
    //         ], 422);
    //     }

    //     $user = Auth::guard('admin')->user();
    //     $token = $user->createToken('main')->plainTextToken;
    //     return response(compact('user', 'token'));
    // }



    
    public function signup(SignupRequest  $request) {
        $data=$request->validated();
        /**@var \App\Models\User $user*/
        $user=User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password']),
        ]);
        $token=$user->createToken('main')->plainTextToken;
        return response(compact('user','token'));
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            if ($user) {
                $user->currentAccessToken()->delete();
            }
            return response()->json(['message' => 'Logged out successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to logout'], 500);
        }
    }

    public function adminLogout(Request $request)
    {
        try {
            $user = $request->user();
            if ($user) {
                $user->currentAccessToken()->delete();
            }
            return response()->json(['message' => 'Logged out successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to logout'], 500);
        }
    }
}


