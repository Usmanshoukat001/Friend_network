<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommonFollowing>
 */
class CommonFollowingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'follower_id' => rand (1,50),
            'following_id' => rand (1,50),
            'approved' => rand (1,0),
            'created_at' => now(),
            'updated_at' => now(),

        ];
    }
}
