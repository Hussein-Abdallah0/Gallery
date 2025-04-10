<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDataRequest;
use App\Models\LoginHistory;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(CreateDataRequest $request)
    {
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return $this->successResponse($token, 201);
    }

    public function login(CreateDataRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return $this->errorResponse("Unauthorized", 401);
        }

        $user = Auth::user();
        $ip = $request->ip();

        $loginData = [
            'user_id' => $user->id,
            'ip_address' => $ip,
        ];

        // Use frontend-provided coordinates if available
        if ($request->has(['latitude', 'longitude'])) {
            $loginData['latitude'] = $request->latitude;
            $loginData['longitude'] = $request->longitude;
        } else {
            // Fallback to simple IP-based location
            $loginData['geolocation'] = "IP: $ip";
        }

        LoginHistory::create($loginData);

        return $this->successResponse($token);
    }


    public function me()
    {
        return response()->json(Auth::user());
    }

    public function logout()
    {
        Auth::logout();
        return $this->successResponse('successfully logged out');
    }
}
