<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeographicBoundaryTypeModel extends Model
{
    use HasFactory;
    protected $table = 'geographic_boundary_type';
    protected $primaryKey = 'type_id';
    protected $fillable = [
        'type_name',
    ];
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    // public function getGeo()
    // {
    //     return $this->hasMany(GeographicBoundaryModel::class, 'type_id');
    // } // hasMany()
}
