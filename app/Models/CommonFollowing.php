<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommonFollowing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'follower_id',
        'following_id',
        'approved',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'follower_id');
    }
    public function follower()
    {
        return $this->belongsTo(User::class, 'following_id','id');
    }
    public function following(){
        return $this->belongsTo(User::class, 'follower_id', 'id');
    } 
}
