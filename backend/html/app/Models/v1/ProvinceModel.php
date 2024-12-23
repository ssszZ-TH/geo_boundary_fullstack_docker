<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\v1\CountryModel;
use App\Models\v1\GeographicBoundaryModel;

class ProvinceModel extends Model
{
    use HasFactory;
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    protected $table = 'province';
    protected $primaryKey = 'geo_id';

    protected $fillable = ['geo_id', 'country_id'];

    public function boundary()
    {
        return $this->belongsTo(GeographicBoundaryModel::class, 'geo_id');
    }

    public function getCountry()
    {
        return $this->belongsTo(CountryModel::class, 'country_id', 'geo_id');
    }
}
