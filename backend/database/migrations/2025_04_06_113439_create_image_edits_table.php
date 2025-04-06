<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('image_edits', function (Blueprint $table) {
            $table->id('id')->unsigned();
            $table->foreignId('image_id')->constrained('user_images')->onDelete('cascade');
            $table->enum('operation_type', ['crop', 'watermark', 'rotate', 'bw_conversion']);
            $table->text('operation_details')->nullable();
            $table->timestamps(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_edits');
    }
};
