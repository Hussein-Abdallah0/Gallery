<?php

namespace Tests\Feature;

use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class MessageTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_message()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->postJson('/api/v1/global-messages', [
                'sender_name' => 'Test Sender',
                'content' => 'This is a test message.'
            ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['success', 'payload']);
        $this->assertDatabaseHas('messages', [
            'sender_name' => 'Test Sender',
            'content' => 'This is a test message.'
        ]);
    }

    public function test_user_can_get_messages()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);
        Message::factory()->create([
            'sender_name' => 'Test Sender',
            'content' => 'This is a test message.'
        ]);

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/v1/global-messages');

        $response->assertStatus(200);
        $response->assertJsonCount(1);
    }
}
