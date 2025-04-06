<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageEdit extends Model
{
    /** @use HasFactory<\Database\Factories\ImageEditFactory> */
    use HasFactory;

    protected $fillable = [
        'image_id',
        'operation_type',
        'operation_details',
    ];

    public function userImage()
    {
        return $this->belongsTo(Image::class);
    }
}
