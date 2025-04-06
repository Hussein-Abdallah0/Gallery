<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ImageEditController extends Controller
{
    public function store(Request $request, $imageId)
    {
        $request->validate([
            'operation_type' => 'required|string|in:crop,rotate,watermark,bw_conversion',
            'operation_details' => 'nullable|array',
        ]);

        $image = Image::findOrFail($imageId);

        if ($image->user_id !== JWTAuth::user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $imageEdit = $image->imageEdits()->create([
            'operation_type' => $request->operation_type,
            'operation_details' => json_encode($request->operation_details),
        ]);

        return response()->json([
            'success' => true,
            'image_edit' => $imageEdit,
        ]);
    }
}
