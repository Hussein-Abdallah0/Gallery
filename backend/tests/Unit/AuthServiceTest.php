<?php

namespace Tests\Unit;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $authService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->authService = new AuthService();
    }

    public function test_register_user_returns_token()
    {
        $request = new \Illuminate\Http\Request([
            'username' => 'TestUser',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $token = $this->authService->registerUser($request);

        $this->assertIsString($token);
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com'
        ]);
    }

    public function test_attempt_login_returns_token_on_success()
    {
        $user = User::factory()->create([
            'email' => 'login@example.com',
            'password' => bcrypt('password123'),
        ]);

        $request = new \Illuminate\Http\Request([
            'email' => 'login@example.com',
            'password' => 'password123',
        ]);

        $token = $this->authService->attemptLogin($request);

        $this->assertIsString($token);
    }

    public function test_attempt_login_returns_false_on_failure()
    {
        $request = new \Illuminate\Http\Request([
            'email' => 'wrong@example.com',
            'password' => 'wrongpass',
        ]);

        $token = $this->authService->attemptLogin($request);

        $this->assertFalse($token);
    }
}
