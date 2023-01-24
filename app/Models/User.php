<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function followers_users(){
        return $this->hasMany(CommonFollowing::class,'follower_id','id');
    }
    public function following_users(){
        return $this->hasMany(CommonFollowing::class,'following_id','id');
    }

    public function followers(){
        return $this->belongsToMany(User::class, 'common_followings', 'following_id', 'follower_id');
    } 
    public function following(){
        return $this->belongsToMany(CommonFollowing::class, 'common_followings', 'follower_id', 'following_id');
    }  


    public function commonFollowing()
    {
        return $this->hasMany(CommonFollowing::class, 'following_id');
    }

    public function followers_connection()
    {
        return $this->belongsToMany(User::class, 'followers', 'following_id', 'follower_id')->withPivot('approved');
    }

    public function following_connection()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'following_id')->withPivot('approved');
    }
}
