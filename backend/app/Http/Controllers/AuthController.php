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

        // Get IP
        $ip = $request->ip();

        // Get location from IP
        $position = Location::get($ip);

        // Check if the location was found
        if ($position === false) {
            $geolocation = 'Unknown';
            $latitude = null;
            $longitude = null;
        } else {
            $geolocation = $position->countryName . ', ' . $position->regionName . ', ' . $position->cityName;
            $latitude = $position->latitude;
            $longitude = $position->longitude;
        }

        // Save login history
        LoginHistory::create([
            'user_id' => $user->id,
            'ip_address' => $ip,
            'geolocation' => $geolocation,
            'latitude' => $latitude,
            'longitude' => $longitude,
        ]);

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
