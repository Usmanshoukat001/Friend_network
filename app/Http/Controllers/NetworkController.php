<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\CommonFollowing;
use App\Models\UserRequest;

class NetworkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $userId = auth()->id();
       //query to retrieve the suggested users

    $suggestionUser = User::whereNotIn('id', function ($query) use ($userId) {
    $query->select('following_id')
        ->from('common_followings')
        ->where('follower_id', $userId)
        ->orWhere('following_id', $userId);
    })->limit(10)->get();

        
    //query to retrieve the total count of suggested users
    $totalSuggestionUser = User::whereNotIn('id', function ($query) use ($userId) {
    $query->select('following_id')
        ->from('common_followings')
        ->where('follower_id', $userId)
        ->orWhere('following_id', $userId);
    })->get();

    return response()->json([
        'suggestionUser' => $suggestionUser,
        'totalSuggestionUser' => $totalSuggestionUser
    ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $connectId = $_GET['suggestionId'];
       
        try {
            $saveConnect = new CommonFollowing;
            $saveConnect->follower_id = auth()->id();
            $saveConnect->following_id = $connectId;
            $saveConnect->save();
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while saving the connection'
            ], 500);
        }
        return response()->json([
            'connectId' => $connectId,
        ], 200);    
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
{
    $urlValue = $_GET['value'];
    $addPaginate = $urlValue + 40;
    $userId = auth()->id();
    $getmoreSuggestionUser = User::whereBetween('id', array($urlValue, $addPaginate))
        ->whereNotIn('id', function ($query) use ($userId) {
            $query->select('following_id')
                ->from('common_followings')
                ->where('follower_id', $userId)
                ->orWhere('following_id', $userId);
    })->get();

     if($getmoreSuggestionUser->isEmpty()){
        $getmoreSuggestionUser = '';
        return response()->json([
            'getmoreSuggestionUser' => $getmoreSuggestionUser,
        ]); 
      }

    // $addPaginate return the json object with the data and the next starting point for pagination
    return response()->json([
        'getmoreSuggestionUser' => $getmoreSuggestionUser,
        'addPaginate' => $addPaginate,
    ], 200);
}


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
