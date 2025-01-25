<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\v1\GeographicBoundaryTypeModel;

class GeographicBoundaryModel extends Model
{
    use HasFactory;

    protected $table = 'geographic_boundary';
    protected $primaryKey = 'geo_id';
    protected $fillable = [
        'geo_code',
        'name_en',
        'name_th',
        'abbreviation',
        'type_id'
    ];
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    public function geoType()
    {
        return $this->belongsTo(GeographicBoundaryTypeModel::class, 'type_id');
    }
    // ใช้ Inheritance กับ Subtype Models
    // Morph to Specific Subtypes
    // ยังไม่ทำ subtype โยนภาระให้ frontend ไปก่อน
    // public function specific()
    // {
    //     return $this->morphTo('specific', 'geo_id', 'geo_id');
    // }
}
