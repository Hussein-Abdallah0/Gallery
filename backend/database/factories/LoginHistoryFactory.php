<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LoginHistory>
 */
class LoginHistoryFactory extends Factory
{
    protected $model = LoginHistory::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'ip_address' => $this->faker->ipv4,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
        ];
    }
}
