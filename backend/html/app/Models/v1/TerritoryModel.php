<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TerritoryModel extends Model
{
    use HasFactory;
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    protected $table = '';

    protected $fillable = [];

    public function boundary()
    {
        return $this->belongsTo(GeographicBoundaryModel::class, 'geo_id');
    }
}
