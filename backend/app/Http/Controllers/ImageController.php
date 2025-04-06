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
        ]);

        $user = JWTAuth::user();

        // Store the image in the public storage
        $path = $request->file('image')->store('images', 'public');

        // Create a new image record in the database
        $image = $user->images()->create([
            'title' => $request->title,
            'file_path' => $path,
        ]);

        return response()->json([
            'success' => true,
            'image' => $image
        ], 201);
    }

    public function show($id)
    {
        $image = Image::findOrFail($id);

        if ($image->user_id != JWTAuth::user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'image' => $image
        ]);
    }

    public function update(Request $request, $id)
    {
        $image = Image::findOrFail($id);

        if ($image->user_id != JWTAuth::user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|max:5120', // Optional field, for updated image
            'operations' => 'nullable|array', // Optional field for operations if editing
            'operations.*.type' => 'nullable|string|in:crop,rotate,watermark,grayscale',
            'operations.*.details' => 'nullable'
        ]);

        // Update image title
        $image->update([
            'title' => $request->title,
        ]);

        // If a new image is uploaded, store it and overwrite the existing file
        if ($request->hasFile('image')) {
            // Delete the old image
            Storage::disk('public')->delete($image->file_path);

            // Store the new image
            $path = $request->file('image')->store('images', 'public');
            $image->update(['file_path' => $path]);
        }

        // If there are any operations, store them in the image_edits table
        if ($request->operations) {
            foreach ($request->operations as $operation) {
                $image->imageEdits()->create([
                    'operation_type' => $operation['type'],
                    'operation_details' => json_encode($operation['details'] ?? []),
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'image' => $image->load('imageEdits')
        ]);
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

    public function addImageEdit(Request $request, $id)
    {
        $request->validate([
            'operation_type' => 'required|string|in:crop,rotate,watermark,bw_conversion',
            'operation_details' => 'nullable|array',
        ]);

        $image = Image::findOrFail($id);

        if ($image->user_id != JWTAuth::user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Store the image edit details
        $imageEdit = $image->imageEdits()->create([
            'operation_type' => $request->operation_type,
            'operation_details' => json_encode($request->operation_details),
        ]);

        return response()->json([
            'success' => true,
            'image_edit' => $imageEdit
        ]);
    }
}
