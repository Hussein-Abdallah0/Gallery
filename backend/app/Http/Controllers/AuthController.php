<?php

namespace App\Http\Controllers;

use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\CreateDataRequest;
use App\Services\LoginHistoryService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Services\AuthService;
use App\Models\LoginHistory;
use App\Models\User;

class AuthController extends Controller
{
    protected $authService;
    protected $loginHistoryService;

    public function __construct(AuthService $authService, LoginHistoryService $loginHistoryService)
    {
        $this->authService = $authService;
        $this->loginHistoryService = $loginHistoryService;
    }

    public function register(CreateDataRequest $request)
    {
        $token = $this->authService->registerUser($request);
        return $this->successResponse($token, 201);
    }

    public function login(CreateDataRequest $request)
    {
        $token = $this->authService->attemptLogin($request);

        if (!$token) {
            return $this->errorResponse("Unauthorized", 401);
        }

        $this->loginHistoryService->log(Auth::user(), $request);

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
