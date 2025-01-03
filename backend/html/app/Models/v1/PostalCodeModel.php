<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostalCodeModel extends Model
{
    use HasFactory;
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    protected $table = 'postal_code';
    protected $primaryKey = 'geo_id';

    protected $fillable = ['geo_id','country_id'];

    public function boundary()
    {
        return $this->belongsTo(GeographicBoundaryModel::class, 'geo_id');
    }
    public function getCountry()
    {
        return $this->belongsTo(CountryModel::class, 'country_id', 'geo_id');
    }
}
