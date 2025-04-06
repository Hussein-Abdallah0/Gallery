<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class LoginHistoryController extends Controller
{

    public function index()
    {
        $user = JWTAuth::user();
        return response()->json([
            'success' => 'true',
            'history' => $user->loginHistory()->latest()->get()
        ]);
    }
}
