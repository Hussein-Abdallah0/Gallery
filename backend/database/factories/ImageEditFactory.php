<?php

namespace Database\Factories;

use App\Models\UserImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ImageEdit>
 */
class ImageEditFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image_id' => UserImage::inRandomOrder()->first()->id,
            'operation_type' => $this->faker->randomElement(['crop', 'watermark', 'rotate', 'bw_conversion']),
            'operation_details' => $this->faker->text,
            'created_at' => now(),
        ];
    }
}
