<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CityModel extends Model
{
    use HasFactory;
    public const CREATED_AT = null;
    public const UPDATED_AT = null;

    protected $table = 'city';
    protected $primaryKey = 'geo_id';
    protected $fillable = [
        'geo_id',
        'state_id',
    ];
    public function boundary()
    {
        return $this->belongsTo(GeographicBoundaryModel::class, 'geo_id');
    }
    public function getState()
    {
        return $this->belongsTo(StateModel::class, 'state_id', 'geo_id');
    }
}
