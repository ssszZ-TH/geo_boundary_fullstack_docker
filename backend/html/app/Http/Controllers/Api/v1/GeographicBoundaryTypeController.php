<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\v1\GeographicBoundaryTypeModel as Model;
use Illuminate\Validation\ValidationException;

class GeographicBoundaryTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $item = Model::all();

        return response()->json($item, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            $request->validate([
                'type_name' => 'required|string|max:100',
            ]);

            $item = Model::create($request->all());

            return response()->json($item, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $e->errors(),
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $item = Model::with([])->findOrFail($id);
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $item = Model::find($id);
        if (!$item) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        $originalData = $item->toArray();
        try {
            $request->validate([
                'type_name' => 'required|string|max:100',
            ]);

            $item->update($request->all());

            return response()->json([
                'original_data' => $originalData,
                'updated_data' => $item
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $e->errors(),
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $item = Model::find($id);
        if (!$item) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        // เก็บข้อมูลก่อนลบ
        $deletedData = $item->toArray();
        // ลบข้อมูล
        $item->delete();
        // ส่งข้อมูลที่ถูกลบกลับไป
        return response()->json([
            'deleted_data' => $deletedData
        ], 200);
    }
}
