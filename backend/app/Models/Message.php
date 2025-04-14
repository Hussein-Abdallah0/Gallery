<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Database\Factories\MessageFactory;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['sender_name', 'content'];
}
