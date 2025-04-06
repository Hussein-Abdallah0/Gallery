<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ImageController extends Controller
{



    public function index()
    {
        $user = JWTAuth::user();
        return response()->json([
            'success' => 'true',
            'images' => $user->images()->with('imageEdits')->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|max:5120',
            'operations' => 'nullable|array',
            'operations.*.type' => 'required|string|in:crop,rotate,watermark,grayscale',
            'operations.*.details' => 'nullable'
        ]);

        $user = JWTAuth::user();
        $path = $request->file('image')->store('images', 'public');

        $image = $user->images()->create([
            'title' => $request->title,
            'file_path' => $path,
        ]);

        if ($request->operations) {
            foreach ($request->operations as $operation) {
                $image->imageEdits()->create([
                    'operation_type' => $operation['type'],
                    'operation_details' => json_encode($operation['details'] ?? []),
                ]);
            }
        }

        return response()->json([
            'success' => 'true',
            'image' => $image->load('imageEdits')
        ], 201);
    }

    public function show($id)
    {
        $image = Image::with('imageEdits')->findOrFail($id);

        if ($image->user_id != JWTAuth::user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json(['success' => 'true', 'image' => $image]);
    }

    public function destroy($id)
    {
        $image = Image::findOrFail($id);

        if ($image->user_id != JWTAuth::user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        Storage::disk('public')->delete($image->file_path);
        $image->delete();

        return response()->json(['success' => 'true', 'message' => 'Image deleted']);
    }
}
