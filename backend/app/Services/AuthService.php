<?php

use App\Models\LoginHistory;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function registerUser($request)
    {
        $user = User::create([
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return JWTAuth::fromUser($user);
    }

    public function attemptLogin($request)
    {
        $credentials = $request->only('email', 'password');
        return JWTAuth::attempt($credentials);
    }
}
