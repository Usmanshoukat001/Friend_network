@if($mode == 'sent')

<div  id="sent_request_data">
<div id="get_requests" class="">
<div id="request_skeleton_loading"></div>
</div>
<div class="d-flex justify-content-center mt-2 py-3 {{-- d-none --}}" id="load_more_btn_parent_sent">
  <button class="btn btn-primary" onclick="getMoreRequests('sent' , 10)" data-id="" id="load_sent_request_btn">Load more</button>
</div>
</div>

@else

<div  id="received_request_data">
<div id="get_requests_received" >
<div id="received_request_skeleton"></div>
</div>
<div class="d-flex justify-content-center mt-2 py-3 {{-- d-none --}}" id="load_more_btn_received">
  <button class="btn btn-primary" onclick="getMoreRequests('received' , 10)" data-id="" id="load_received_request_btn">Load more</button>
</div>
</div>

@endif