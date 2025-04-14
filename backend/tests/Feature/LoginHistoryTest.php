<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class LoginHistoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_login_history()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $user->loginHistory()->create([
            'ip_address' => '127.0.0.1',
            'latitude' => '34.0522',
            'longitude' => '-118.2437'
        ]);

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/v1/login-history');

        $response->assertStatus(201);
        $response->assertJsonStructure(['success', 'payload']);
        $response->assertJsonFragment([
            'ip_address' => '127.0.0.1',
            'latitude' => 34.0522,
            'longitude' => -118.2437
        ]);
    }
}
