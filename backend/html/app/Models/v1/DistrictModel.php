<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DistrictModel extends Model
{
    use HasFactory;

    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    protected $table = 'district';
    protected $primaryKey = 'geo_id';

    protected $fillable = ['geo_id', 'province_id'];

    public function boundary()
    {
        return $this->belongsTo(GeographicBoundaryModel::class, 'geo_id');
    }

    public function province()
    {
        return $this->belongsTo(ProvinceModel::class, 'province_id', 'geo_id');
    }
}
