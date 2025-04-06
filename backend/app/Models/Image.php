<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    /** @use HasFactory<\Database\Factories\ImageFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'file_path',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function imageEdits()
    {
        return $this->hasMany(ImageEdit::class);
    }
}
