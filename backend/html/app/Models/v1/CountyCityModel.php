<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CountyCityModel extends Model
{
    use HasFactory;
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    protected $table = 'county_city';
    protected $primaryKey = 'geo_id';

    protected $fillable = ['geo_id','county_id','city_id'];

    public function boundary()
    {
        return $this->belongsTo(GeographicBoundaryModel::class, 'geo_id');
    }
    public function getCounty()
    {
        return $this->belongsTo(CountyModel::class, 'county_id','geo_id');
    }
    public function getCity()
    {
        return $this->belongsTo(CityModel::class, 'city_id','geo_id');
    }
}
