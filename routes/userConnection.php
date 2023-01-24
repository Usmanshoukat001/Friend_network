<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'users', 'namespace' => 'App\Http\Controllers'], function () {
    Route::get('/', 'NetworkController@index');
    Route::get('suggestion/load', 'NetworkController@show');
    Route::get('store', 'NetworkController@store');
    //Request Route
    Route::get('sent/requests', 'UserRequestController@index');
    Route::get('sent/requests/load', 'UserRequestController@show');
    Route::get('delete/request', 'UserRequestController@destroy');
    Route::get('accept/request', 'UserRequestController@update');
    //Connection route
    Route::get('connection', 'ConnectionController@index');
    Route::get('common/connection', 'ConnectionController@show');
    Route::get('common/connection/count', 'ConnectionController@connectioncount');
    Route::get('more/connection', 'ConnectionController@moreconnection');
    Route::get('more/common/connection', 'ConnectionController@morecommonconnection');
    Route::get('remove/connection', 'ConnectionController@destroy');
});