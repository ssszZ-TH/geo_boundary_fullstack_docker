<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\v1\CountyModel as Model;

use Illuminate\Support\Facades\DB;

class CountyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $item = Model::with(['boundary', 'getState'])->get();

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
                'geo_id' => 'required|integer|exists:geographic_boundary,geo_id',
                'state_id' => 'required|integer|exists:state,geo_id',
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
        $item = Model::with(['boundary', 'getState'])->findOrFail($id);
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
                'geo_id' => 'required|integer|exists:geographic_boundary,geo_id',
                'state_id' => 'required|integer|exists:state,geo_id',
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

    public function countyDDByStateId($state_id)
    {
        try {
            // ใช้ Native Query ดึงรายการ county ตาม state_id
            $data = DB::select("
            SELECT gb.geo_id, gb.name_en, gb.name_th, gb.abbreviation
            FROM geographic_boundary gb
            JOIN county s ON gb.geo_id = s.geo_id
            WHERE s.state_id = ?
            ORDER BY gb.name_en ASC
        ", [$state_id]);

            // ถ้าข้อมูลว่าง ให้ส่ง response 404
            if (empty($data)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'not found'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data' => $data
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
