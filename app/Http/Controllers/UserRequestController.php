<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CommonFollowing;
use App\Models\User;

class UserRequestController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$getModevalue is used for get mode value from url
        $getModevalue = $_GET["mode"];
            if($getModevalue == "sent"){
                $getRequest = CommonFollowing::where('follower_id', auth()->id())
                ->where('approved',0)
                ->with('follower')
                ->limit(10)
                ->get();
                $getRequestCount = CommonFollowing::where('follower_id', auth()->id())
                ->where('approved',0)
                ->with('follower')
                ->get();
                return response()->json([
                    'getRequest' => $getRequest,
                    'getRequestCount' => $getRequestCount,
                    'getModevalue' => $getModevalue,
                ]); 
            }
            if($getModevalue == "received"){
               
                $getRequest = CommonFollowing::where('following_id', auth()->id())
                ->where('approved',0)
                ->with('following')
                ->limit(10)
                ->get();
                $getRequestCount = CommonFollowing::where('following_id', auth()->id())
                ->where('approved',0)
                ->with('following')
                ->get();
                return response()->json([
                    'getRequest' => $getRequest,
                    'getRequestCount' => $getRequestCount,
                    'getModevalue' => $getModevalue,
                ]); 
                return response()->json([
                    'getRequest' => $getRequest,
                    'getRequestCount' => $getRequestCount,
                    'getModevalue' => $getModevalue,
                ]); 
            }
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
        //
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
          $getModevalue = $_GET["mode"];
          if($getModevalue == "sent"){
            $getpaginateValue = CommonFollowing::where('id','>', $urlValue)->where('follower_id', auth()->id())
            ->where('approved',0)
            ->with('follower')
            ->limit(10)
            ->get();

// for find last id 
          $getpaginateArray = [];
          foreach ($getpaginateValue as $entry){
              $getpaginateArray[] = $entry->id;
             }
            $getpaginateValue = end($getpaginateArray);
  //

            $getmoreRequested = CommonFollowing::where('id','>', $getpaginateValue)->where('follower_id', auth()->id())
            ->where('approved',0)
            ->with('follower')
            ->limit(10)
            ->get();

 // for find last id for next pagination
          $addRequestedArray = [];
        foreach ($getmoreRequested as $entry){
            $addRequestedArray[] = $entry->id;
           }
          $addRequestedPaginate = end($addRequestedArray);
//

            if($getmoreRequested->isEmpty()){
              $getmoreRequested = '';
              return response()->json([
                  'getmoreRequested' => $getmoreRequested,
                  'getModevalue' => $getModevalue,
                  'getModevalue' => $getModevalue,
              ]); 
            }
            return response()->json([
              'getmoreRequested' => $getmoreRequested,
              'getModevalue' => $getModevalue,
              'addRequestedPaginate' => $addRequestedPaginate,
          ]); 
          }

          
          if($getModevalue == "received"){
            $getpaginateValue = CommonFollowing::where('id','>', $urlValue)->where('following_id', auth()->id())
            ->where('approved',0)
            ->with('following')
            ->limit(10)
            ->get();
// for find last id 
            $getpaginateArray = [];
            foreach ($getpaginateValue as $entry){
                $getpaginateArray[] = $entry->id;
            }
            $addRequestedid = end($getpaginateArray);
//
            $getmoreRequested = CommonFollowing::where('id','>', $addRequestedid)->where('following_id', auth()->id())
            ->where('approved',0)
            ->with('following')
            ->limit(10)
            ->get();
// for find last id for next pagination
          $getmoreRequestedArray = [];
          foreach ($getmoreRequested as $entry){
              $getmoreRequestedArray[] = $entry->id;
             }
            $addRequestedPaginate = end($getmoreRequestedArray);
//
            
            
            if($getmoreRequested->isEmpty()){
              $getmoreRequested = '';
              return response()->json([
                  'getmoreRequested' => $getmoreRequested,
                  'getModevalue' => $getModevalue,
              ]); 
            }
            return response()->json([
              'getmoreRequested' => $getmoreRequested,
              'getModevalue' => $getModevalue,
              'addRequestedPaginate' => $addRequestedPaginate,
          ]); 
          }
         
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
    public function update()
    {
        $urlacceptitemId = $_GET['itemId'];
        $updateRequest = CommonFollowing::where('id' , $urlacceptitemId)->update(['approved' => 1]);
        return response()->json([
         'urlacceptitemId' => $urlacceptitemId,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        $urlitemId = $_GET['itemId'];
        $withdrawItem = CommonFollowing::where('id' , $urlitemId)->delete();
        return response()->json([
            'urlitemId' => $urlitemId,
        ]); 

    }
}
