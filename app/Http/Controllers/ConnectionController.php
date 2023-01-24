<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\CommonFollowing;
use Auth;
use DB;
class ConnectionController extends Controller
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
      $userId = Auth()->id();

    $getConnection = CommonFollowing::where(function($query) use ($userId) {
        $query->where('following_id', $userId)->where('approved', 1);
        })->orWhere(function($query) use ($userId) {
            $query->where('follower_id', $userId)->where('approved', 1);
        })->with(['following', 'follower'])->limit(10)->get();

    $totalConnection = CommonFollowing::where(function($query) use ($userId) {
            $query->where('following_id', $userId)->where('approved', 1);
        })->orWhere(function($query) use ($userId) {
            $query->where('follower_id', $userId)->where('approved', 1);
        })->get();

    return response()->json([
        'getConnection' => $getConnection,
        'totalConnection' => $totalConnection
    ]); 
}
    /**
     * Show the data for count a common connection count.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function connectioncount()
    {
    $itemId = $_GET['itemId'];
    $userId = auth()->id();
    $connectionId = $_GET['connectionId'];

    $connectionCount = CommonFollowing::where(function ($query) {
        
        $query->where('following_id', $_GET['connectionId'])
        ->where('approved', 1);
        })->whereIn('follower_id', function ($query) {
        $query->select('following_id')
        ->from('common_followings')
        ->where('follower_id', $_GET['connectionId'])
        ->where('approved', 1);
         })->where('approved', 1)->count();
        
        return response()->json([
            'connectionCount' => $connectionCount,
            'itemId' => $itemId,
            'userId' => $userId,
            'connectionId' => $connectionId,
        ]); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
     {
        $itemId = $_GET['itemId'];
        $userId = auth()->id();
        $connectionId = $_GET['connectionId'];

        $commonConnections = CommonFollowing::where(function ($query) {
        
            $query->where('following_id', $_GET['connectionId'])
            ->where('approved', 1);
            })->whereIn('follower_id', function ($query) {
            $query->select('following_id')
            ->from('common_followings')
            ->where('follower_id', $_GET['connectionId'])
            ->where('approved', 1);
             })->where('approved', 1)->with(['following', 'follower'])->limit(10)->get();
        return response()->json([
            'commonConnections' => $commonConnections,
            'itemId' => $itemId,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function moreconnection()
    {
        $urlValue = $_GET['value'];
        $addIncrement = $urlValue + 1;
        $userId = Auth()->id();
     
       if($_GET['value'] == 10){
        $getConnection = CommonFollowing::where(function($query) use ($userId) {
            $query->where('following_id', $userId)->where('approved', 1);
        })->orWhere(function($query) use ($userId) {
            $query->where('follower_id', $userId)->where('approved', 1);
        })->with(['following', 'follower'])->limit(10)->get();

// for find last id
        $getConnectionArray = [];
        foreach ($getConnection as $entry){
            $getConnectionArray[] = $entry->id;
           }
        $getLastValue = end($getConnectionArray);
//

            $checkforPagination= CommonFollowing::where('id' ,'>',$getLastValue)
            ->where('follower_id', $userId)->
            where('approved' ,'=', 1)
            ->count();
       
        if($checkforPagination == 1){
            $getmoreConnection = '';
            return response()->json([
                'getmoreConnection' => $getmoreConnection,
            ]); 
          }

        $getmoreConnection = CommonFollowing::where('id','>', $getLastValue)
            ->where(function($query) use ($userId) {
              $query->where('following_id', $userId)->where('approved', 1);
          })->orWhere(function($query) use ($userId) {
              $query->where('follower_id', $userId)->where('approved', 1);
          })->with(['following', 'follower'])->limit(10)->get();

// for find last id for send to blade for more pagination
        $getmoreConnectionArray = [];

        foreach ($getmoreConnection as $entry){
            $getmoreConnectionArray[] = $entry->id;
           }
        $sendajaxPaginateValue = end($getmoreConnectionArray);
//

        $addPaginate = $sendajaxPaginateValue;
            return response()->json([
            'getmoreConnection' => $getmoreConnection,
            'addPaginate' => $addPaginate
        ]); 

       }
       
       else{
       

        $checkforPagination= CommonFollowing::where('id' ,'>',$_GET['value'])->where('follower_id', $userId)->
           where('approved' ,'=', 1)
          ->count();

        if($checkforPagination == 1){
            $getmoreConnection = '';
            return response()->json([
                'getmoreConnection' => $getmoreConnection,
            ]); 
          }
       
        $getmoreConnection = CommonFollowing::where('id','>', $_GET['value'])
            ->where(function($query) use ($userId) {
              $query->where('follower_id', $userId)->where('approved', 1);
          })->with(['following', 'follower'])->limit(10)->get();

// for find last id for send to blade for more pagination
        $getmoreConnectionArray = [];
        foreach ($getmoreConnection as $entry){
            $getmoreConnectionArray[] = $entry->id;
           }        
        $sendajaxPaginateValue = end($getmoreConnectionArray);
//
        $addPaginate = $sendajaxPaginateValue;
        return response()->json([
            'getmoreConnection' => $getmoreConnection,
            'addPaginate' => $addPaginate
        ]); 
       }
 }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function morecommonconnection()
    {
        $itemId = $_GET['itemId'];
        $userId = auth()->id();
        $connectionId = $_GET['connectionId'];
        $urlValue = $_GET['value'];

        if($_GET['value'] == 10){

            $prevmoreCommonConnections = CommonFollowing::where(function ($query) {
        
                $query->where('following_id', $_GET['connectionId'])
                ->where('approved', 1);
                })->whereIn('follower_id', function ($query) {
                $query->select('following_id')
                ->from('common_followings')
                ->where('follower_id', $_GET['connectionId'])
                ->where('approved', 1);
                 })->where('approved', 1)->with(['following', 'follower'])->limit(10)->get();
    
    // for find last id
            $getConnectionArray = [];
            foreach ($prevmoreCommonConnections as $entry){
                $getConnectionArray[] = $entry->id;
               }
            $getLastValue = end($getConnectionArray);
    //
    //dd($getLastValue);
    
                $checkforPagination= CommonFollowing::where('id' ,'>',$getLastValue)
                ->where('follower_id', $connectionId)->
                where('approved' ,'=', 1)
                ->count();
           
            if($checkforPagination == 1){
                $prevmoreCommonConnections = '';
                return response()->json([
                    'prevmoreCommonConnections' => $prevmoreCommonConnections,
                ]); 
              }
              $moreCommonConnections = CommonFollowing::where('id','>', $getLastValue)->where(function ($query) {
        
                $query->where('following_id', $_GET['connectionId'])
                ->where('approved', 1);
                })->whereIn('follower_id', function ($query) {
                $query->select('following_id')
                ->from('common_followings')
                ->where('follower_id', $_GET['connectionId'])
                ->where('approved', 1);
                 })->where('approved', 1)->with(['following', 'follower'])->limit(10)->get();
    
    
    // for find last id for send to blade for more pagination
            $getmoreConnectionArray = [];
    
            foreach ($moreCommonConnections as $entry){
                $getmoreConnectionArray[] = $entry->id;
               }
            $sendajaxPaginateValue = end($getmoreConnectionArray);
    //
    
            $addPaginate = $sendajaxPaginateValue;
                return response()->json([
                'moreCommonConnections' => $moreCommonConnections,
                'addPaginate' => $addPaginate,
                'itemId' => $_GET['itemId'],
            ]); 
    
           }
           
           else{
           
    
            $checkforPagination= CommonFollowing::where('id' ,'>',$_GET['value'])->where('follower_id', $userId)->
               where('approved' ,'=', 1)
              ->count();
    
            if($checkforPagination == 0){
                $moreCommonConnections = '';
                return response()->json([
                    'moreCommonConnections' => $moreCommonConnections,
                ]); 
              }
           

            $moreCommonConnections = CommonFollowing::where('id','>', $_GET['value'])->where(function ($query) {
        
                $query->where('following_id', $_GET['connectionId'])
                ->where('approved', 1);
                })->whereIn('follower_id', function ($query) {
                $query->select('following_id')
                ->from('common_followings')
                ->where('follower_id', $_GET['connectionId'])
                ->where('approved', 1);
                 })->where('approved', 1)->with(['following', 'follower'])->limit(10)->get();
    
    // for find last id for send to blade for more pagination
            $getmoreConnectionArray = [];
            foreach ($moreCommonConnections as $entry){
                $getmoreConnectionArray[] = $entry->id;
               }        
            $sendajaxPaginateValue = end($getmoreConnectionArray);
    //
            $addPaginate = $sendajaxPaginateValue;
            return response()->json([
                'getmoreConnection' => $moreCommonConnections,
                'addPaginate' => $addPaginate,
                'itemId' => $_GET['itemId'],
            ]); 
           }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        $urlConnectionitemId = $_GET['itemId'];
        $withdrawItem = CommonFollowing::where('id' , $urlConnectionitemId)->delete();
        return response()->json([
            'urlConnectionitemId' => $urlConnectionitemId,
        ]); 
    }
}
