<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMessageRequest;
use App\Models\Message;

class MessageController extends Controller
{
    public function store(CreateMessageRequest $request)
    {
        $message = Message::create($request->only(['sender_name', 'content']));

        return $this->successResponse($message, 201);
    }

    public function index()
    {
        return Message::latest()->take(100)->get();
    }
}
