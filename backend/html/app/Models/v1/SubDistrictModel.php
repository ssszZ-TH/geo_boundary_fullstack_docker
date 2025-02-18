<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubDistrictModel extends Model
{
    use HasFactory;

    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    protected $table = 'sub_district';
    protected $primaryKey = 'geo_id';

    protected $fillable = ['geo_id', 'district_id'];

    public function boundary()
    {
        return $this->belongsTo(GeographicBoundaryModel::class, 'geo_id');
    }

    public function district()
    {
        return $this->belongsTo(DistrictModel::class, 'district_id', 'geo_id');
    }
}
