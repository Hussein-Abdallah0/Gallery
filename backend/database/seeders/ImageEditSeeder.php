<?php

namespace Database\Seeders;

use App\Models\ImageEdit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImageEditSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ImageEdit::factory(10)->create();
    }
}
