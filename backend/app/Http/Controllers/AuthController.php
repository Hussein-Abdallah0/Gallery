<?php

namespace App\Http\Controllers;

use App\Models\LoginHistory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Stevebauman\Location\Facades\Location;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(['success' => 'true', 'user' => $user, 'token' => $token], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
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

        return response()->json(['success' => 'true', 'token' => $token]);
    }


    public function me()
    {
        return response()->json(Auth::user());
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'successfully logged out']);
    }
}
