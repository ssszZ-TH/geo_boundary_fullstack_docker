<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\v1\GeographicBoundaryModel;

class CountryModel extends Model
{
    use HasFactory;
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    protected $primaryKey = 'geo_id';
    protected $table = 'country';

    protected $fillable = ['geo_id'];

    public function boundary()
    {
        return $this->belongsTo(GeographicBoundaryModel::class, 'geo_id');
    }
}
