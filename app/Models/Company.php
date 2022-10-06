<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $hidden = [
        'created_at',
        'updated_at',
        'user_id'
    ];

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'email',
        'address'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function infos()
    {
        return $this->hasMany(Info::class);
    }
}
