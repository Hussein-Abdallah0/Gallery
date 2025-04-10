<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class LoginHistoryController extends Controller
{

    public function index()
    {
        $user = JWTAuth::user();
        return $this->successResponse($user->loginHistory()->latest()->get(), 201);
    }
}
