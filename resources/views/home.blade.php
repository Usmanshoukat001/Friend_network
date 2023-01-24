@extends('layouts.app')

@section('content')
<div class="container">
    <x-dashboard />
    <x-network_connections />
  </div>


  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="{{ asset('js/main.js') }}?v={{ time() }}" defer></script>
  <script src="{{ asset('js/htmlcontent.js') }}?v={{ time() }}" defer></script>

  
@endsection