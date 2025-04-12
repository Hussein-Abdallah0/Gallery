<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'sender_name' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $message = Message::create($request->only(['sender_name', 'content']));

        return response()->json($message, 201);
    }

    public function index()
    {
        return Message::latest()->take(100)->get();
    }
}
