///////////////////////////////////////////SUGGESTION function/////////////////////////////////////////////

function getSuggestionsContent(data){
  
  $.each(data, function(Key, item) {
    $('#skeleton_loading').append('<div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px">\
     <strong class="ms-1 text-primary">Loading...</strong>\
      <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>\
    </div>')
    setTimeout(function() {
      var htmlcontent = '<div class="my-2 shadow  text-white bg-dark p-1" id="dataList' + item.id + '">\
      <div class="d-flex justify-content-between">\
      <table class="ms-1">\
        <td class="align-middle">' + item.name + '</td>\
        <td class="align-middle"> - </td>\
        <td class="align-middle">' + item.email + '</td>\
        <td class="align-middle">\
      </table>\
          <div>\
            <button id="create_request_btn_" onClick="sendRequest(' + item.id + ')" class="btn btn-primary me-1">Connect</button>\
          </div>\
        </div>\
      </div>';
        $('#skeleton_loading').hide()
        
          $('#get_suggestions_id').append('\
          '+htmlcontent+'\
        ')
        
       
    }, 1500);

})
} 
function getMoreSuggestionsContent(data , paginate){
  $("#load_more_suggestion_btn").attr("onclick","getMoreSuggestions("+paginate+")");
          if(data == '')
          $('#load_more_suggestion_btn').hide()
          if(data)
          $.each(data, function(Key, item) {
                  $('#get_suggestions_id').append('\
                    <div class="my-2 shadow  text-white bg-dark p-1 id="dataList' + item.id + '">\
                    <div class="d-flex justify-content-between">\
                    <table class="ms-1">\
                      <td class="align-middle">' + item.name + '</td>\
                      <td class="align-middle"> - </td>\
                      <td class="align-middle">' + item.email + '</td>\
                      <td class="align-middle">\
                    </table>\
                        <div>\
                        <button id="create_request_btn_" onClick="sendRequest(' + item.id + ')" class="btn btn-primary me-1">Connect</button>\
                        </div>\
                      </div>\
                    </div>');
              })
}

///////////////////////////////////////////REQUEST function/////////////////////////////////////////////

function getRequestContent(mode, data) {
  if(mode == 'sent'){
    if(data.length <= 9){
          $('#load_more_btn_parent_sent').addClass("d-none");          
        }
    $("#get_sent_requests_btn").attr("onclick","");
    $.each(data, function(Key, item){
      $('#request_skeleton_loading').append('<div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px">\
      <strong class="ms-1 text-primary">Loading...</strong>\
       <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>\
     </div>')
     setTimeout(function() {
      $('#request_skeleton_loading').hide()
      $('#get_requests').append('\
      <div class="my-2 shadow text-white bg-dark p-1" id="data_sent_request_List'+item.id+'">\
      <div class="d-flex justify-content-between">\
       <table class="ms-1">\
         <td class="align-middle">' + item.follower.name + '</td>\
         <td class="align-middle"> - </td>\
         <td class="align-middle">' + item.follower.email + '</td>\
         <td class="align-middle">\
       </table>\
       <div>\
       <button id="cancel_request_btn_" onClick="deleteRequest(' + item.id + ')" class="btn btn-danger me-1"\
     onclick="">Withdraw Request</button></div></div></div>'
     )}, 1500);
    })
  }
  if(mode == 'received'){
    if(data.length <= 9){
      $('#load_more_btn_received').addClass("d-none");          
    }
    $("#get_received_requests_btn").attr("onclick","");
    $.each(data, function(Key, item){
      $('#received_request_skeleton').append('<div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px">\
      <strong class="ms-1 text-primary">Loading...</strong>\
       <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>\
     </div>')
     setTimeout(function() {
      $('#received_request_skeleton').hide()
      $('#get_requests_received').append('\
      <div class="my-2 shadow text-white bg-dark p-1" id="data_accept_request_List_'+item.id+'">\
      <div class="d-flex justify-content-between">\
       <table class="ms-1">\
         <td class="align-middle">' + item.following.name + '</td>\
         <td class="align-middle"> - </td>\
         <td class="align-middle">' + item.following.email + '</td>\
         <td class="align-middle">\
       </table>\
       <div>\
    <button id="accept_request_btn_" onClick="acceptRequest(' + item.id + ')" class="btn btn-primary me-1"\
    onclick="">Accept</button></div></div></div>'
     )}, 1500);
    })
  }
}
function getMoreRequestsContent(mode, data, Paginate){
  if(mode == 'sent'){
    if(data == '')
    $('#load_sent_request_btn').hide()
    $("#load_sent_request_btn").attr("onclick","getMoreRequests('" + mode + "'," +Paginate+")");
    if(data)
    $.each(data, function(Key, item) {
      $('#request_skeleton_loading').append('<div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px">\
      <strong class="ms-1 text-primary">Loading...</strong>\
       <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>\
     </div>')
     setTimeout(function() {
         $('#request_skeleton_loading').hide()
         $('#get_requests').append('\
         <div class="my-2 shadow text-white bg-dark p-1" id="data_sent_request_List'+item.id+'">\
         <div class="d-flex justify-content-between">\
          <table class="ms-1">\
            <td class="align-middle">' + item.follower.name + '</td>\
            <td class="align-middle"> - </td>\
            <td class="align-middle">' + item.follower.email + '</td>\
            <td class="align-middle">\
          </table>\
          <div>\
          <button id="cancel_request_btn_" onClick="deleteRequest(' + item.id + ')" class="btn btn-danger me-1"\
        onclick="">Withdraw Request</button></div></div></div>'
        )}, 1500);
        })
  }
  if(mode == 'received'){
    $("#load_received_request_btn").attr("onclick","getMoreRequests('" + mode + "'," +Paginate+")");
    if(data == '')
    $('#load_received_request_btn').hide()
    if(data)
    $.each(data, function(Key, item) {
      $('#received_request_skeleton').append('<div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px">\
      <strong class="ms-1 text-primary">Loading...</strong>\
       <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>\
     </div>')
     setTimeout(function() {
         $('#received_request_skeleton').hide()
         $('#get_requests_received').append('\
         <div class="my-2 shadow text-white bg-dark p-1" id="data_accept_request_List_'+item.id+'">\
         <div class="d-flex justify-content-between">\
          <table class="ms-1">\
            <td class="align-middle">' + item.following.name + '</td>\
            <td class="align-middle"> - </td>\
            <td class="align-middle">' + item.following.email + '</td>\
            <td class="align-middle">\
          </table>\
          <div>\
       <button id="accept_request_btn_" onClick="acceptRequest(' + item.id + ')" class="btn btn-primary me-1"\
       onclick="">Accept</button></div></div></div>'
        )}, 1500);
        })
  }
}

///////////////////////////////////////////CONNECTION function/////////////////////////////////////////////

function getConnectionsContent(data){
  if(data.length <= 9){
    $('#load_more_btn_parent_connection').addClass("d-none");          
  }
  $("#get_connections_btn").attr("onclick","");
  $.each(data, function(Key, item) {
    $('#connection_skeleton_loading').append('<div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px">\
     <strong class="ms-1 text-primary">Loading...</strong>\
      <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>\
    </div>')
    setTimeout(function() {
      var authcheck = $('meta[name="auth-check"]').attr('content');
        $('#connection_skeleton_loading').hide();
        if(item.following_id == authcheck){
          $('#get_connections').append('\
          <div class="my-2 shadow text-white bg-dark p-1" id="data_delete_connection_List_'+item.id+'">\
      <div class="d-flex justify-content-between">\
        <table class="ms-1">\
        <td class="align-middle">' + item.following.name + '</td>\
        <td class="align-middle"> - </td>\
        <td class="align-middle">' + item.following.email + '</td>\
        <td class="align-middle">\
        </table>\
        <div>\
        <button style="width: 220px" onClick="getConnectionsInCommon(' + item.id + ',' + authcheck + ',' + item.following_id + ')"\
         id="get_connections_in_common_' + item.id + '" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_' + item.id + '">\
        Connections in common (' + getConnectionCount(item.id ,item.user_id , item.following_id)+ ') </button>\
        <button id="create_request_btn_' + item.id + '" onClick="removeConnection(' + item.id + ')" class="btn btn-danger me-1">Remove Connection</button>\
        </div>\
        </div>\
        <div class="collapse" id="collapse_' + item.id + '">\
        <div id="content_' + item.id + '" class="p-2">\
        </div>\
        <div class="d-flex justify-content-center w-100 py-2" id="load_more_connections_in_common_' + item.id + '">\
          <button class="btn btn-sm btn-primary" onClick="getMoreConnectionsInCommon(' + item.id + ',' + authcheck + ',' + item.following_id + ')" >Load more</button>\
        </div>\
      </div>\
        </div>\
        </div>')
        }
        if(item.follower_id == authcheck){
          $('#get_connections').append('\
          <div class="my-2 shadow text-white bg-dark p-1" id="data_delete_connection_List_'+item.id+'">\
      <div class="d-flex justify-content-between">\
        <table class="ms-1">\
        <td class="align-middle">' + item.follower.name + '</td>\
        <td class="align-middle"> - </td>\
        <td class="align-middle">' + item.follower.email + '</td>\
        <td class="align-middle">\
        </table>\
        <div>\
        <button style="width: 220px" onClick="getConnectionsInCommon(' + item.id + ',' + authcheck + ',' + item.following_id + ')"\
         id="get_connections_in_common_' + item.id + '" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_' + item.id + '">\
        Connections in common (' + getConnectionCount(item.id ,item.user_id , item.following_id)+ ') </button>\
        <button id="create_request_btn_' + item.id + '" onClick="removeConnection(' + item.id + ')" class="btn btn-danger me-1">Remove Connection</button>\
        </div>\
        </div>\
        <div class="collapse" id="collapse_' + item.id + '">\
        <div id="loading_' + item.id + '" class="p-2">\
        </div>\
        <div id="content_' + item.id + '" class="p-2">\
        </div>\
        <div class="d-flex justify-content-center w-100 py-2" id="load_more_connections_in_common_' + item.id + '">\
          <button class="btn btn-sm btn-primary" id="load_more_common_btn_' + item.id + '" onClick="getMoreConnectionsInCommon(' + item.id + ',' + authcheck + ',' + item.following_id + ')" >Load more</button>\
        </div>\
      </div>\
        </div>\
        </div>')
        }

       
  }, 1500);
})
}
function getConnectionCount(itemId, userId , connectionId){
  //var count = 0;
 $.ajax({
  type:"GET",
  url:"users/common/connection/count",
  data:{itemId:itemId ,userId:userId , connectionId:connectionId},
  dataType: "json",
  success: function(response){ 
    $('#get_connections_in_common_'+response.itemId+'').html("Connections in common ("+ response.connectionCount +")");
  }
 });
}
function getMoreConnectionsContent(data , paginate){
  $("#load_connection_btn").attr("onclick","getMoreConnections("+paginate+")");
  if(data == '')
  $('#load_connection_btn').hide()
  if(data)
  $.each(data, function(Key, item) {
    $('#connection_skeleton_loading').append('<div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px">\
     <strong class="ms-1 text-primary">Loading...</strong>\
      <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>\
    </div>')
    setTimeout(function() {
      var authcheck = $('meta[name="auth-check"]').attr('content');
        $('#connection_skeleton_loading').hide()
        if(item.following_id == authcheck){
          $('#get_connections').append('\
          <div class="my-2 shadow text-white bg-dark p-1" id="data_delete_connection_List_'+item.id+'">\
      <div class="d-flex justify-content-between">\
        <table class="ms-1">\
        <td class="align-middle">' + item.following.name + '</td>\
        <td class="align-middle"> - </td>\
        <td class="align-middle">' + item.following.email + '</td>\
        <td class="align-middle">\
        </table>\
        <div>\
        <button style="width: 220px" onClick="getConnectionsInCommon(' + item.id + ',' + authcheck + ',' + item.following_id + ')"\
         id="get_connections_in_more_common_' + item.id + '" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_' + item.id + '">\
        Connections in common (' + getmoreConnectionCount(item.id ,item.user_id , item.following_id)+ ') </button>\
        <button id="create_request_btn_' + item.id + '" onClick="removeConnection(' + item.id + ')" class="btn btn-danger me-1">Remove Connection</button>\
        </div>\
        </div>\
        <div class="collapse" id="collapse_' + item.id + '">\
        <div id="content_' + item.id + '" class="p-2">\
        </div>\
        <div class="d-flex justify-content-center w-100 py-2" id="load_more_connections_in_common_' + item.id + '">\
          <button class="btn btn-sm btn-primary" onClick="getMoreConnectionsInCommon(' + item.id + ',' + authcheck + ',' + item.following_id + ')" >Load more</button>\
        </div>\
      </div>\
        </div>\
        </div>')
        }
        if(item.follower_id == authcheck){
          $('#get_connections').append('\
          <div class="my-2 shadow text-white bg-dark p-1" id="data_delete_connection_List_'+item.id+'">\
      <div class="d-flex justify-content-between">\
        <table class="ms-1">\
        <td class="align-middle">' + item.follower.name + '</td>\
        <td class="align-middle"> - </td>\
        <td class="align-middle">' + item.follower.email + '</td>\
        <td class="align-middle">\
        </table>\
        <div>\
        <button style="width: 220px" onClick="getConnectionsInCommon(' + item.id + ',' + authcheck + ',' + item.following_id + ')"\
         id="get_connections_in_more_common_' + item.id + '" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_' + item.id + '">\
        Connections in common (' + getmoreConnectionCount(item.id ,item.user_id , item.following_id)+ ') </button>\
        <button id="create_request_btn_' + item.id + '" onClick="removeConnection(' + item.id + ')" class="btn btn-danger me-1">Remove Connection</button>\
        </div>\
        </div>\
        <div class="collapse" id="collapse_' + item.id + '">\
        <div id="content_' + item.id + '" class="p-2">\
        </div>\
        <div class="d-flex justify-content-center w-100 py-2" id="load_more_connections_in_common_' + item.id + '">\
          <button class="btn btn-sm btn-primary" onClick="getMoreConnectionsInCommon(' + item.id + ',' + authcheck + ',' + item.following_id + ')" >Load more</button>\
        </div>\
      </div>\
        </div>\
        </div>')
        }

  }, 1500);
})
}
function getmoreConnectionCount(itemId, userId , connectionId){
  //var count = 0;
 $.ajax({
  type:"GET",
  url:"users/common/connection/count",
  data:{itemId:itemId ,userId:userId , connectionId:connectionId},
  dataType: "json",
  success: function(response){ 
    $('#get_connections_in_more_common_'+response.itemId+'').html("Connections in common ("+ response.connectionCount +")");
  }
 });
}
function getConnectionsInCommonContent(data , itemId){
  $.each(data, function(Key, item) {
    var authcheck = $('meta[name="auth-check"]').attr('content');
    $('#get_connections_in_common_' + itemId + '').attr("onclick","");
    $('#loading_'+itemId+'').append('<div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px">\
     <strong class="ms-1 text-primary">Loading...</strong>\
      <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>\
    </div>')
    setTimeout(function() {
      $('#loading_'+itemId+'').hide();
        $('#content_'+itemId+'').append('\
    <div class="p-2 shadow rounded mt-2  text-white bg-dark">' + item.following.name + ' - ' + item.following.email + '</div>\
    ');   
}, 1000);
  })

}
function getMoreConnectionsInCommonContent(data , itemId , value){
  var authcheck = $('meta[name="auth-check"]').attr('content');

  $.each(data, function(Key, item) {
    $('#load_more_common_btn' + item.id + '').attr('onclick","getMoreConnectionsInCommon(' + itemId + ',' + authcheck + ',' + item.following_id + ','+ value+')');

    $('#loading_'+ itemId + '"').append('<div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px">\
     <strong class="ms-1 text-primary">Loading...</strong>\
      <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>\
    </div>')
    setTimeout(function() {
      $('#loading_'+ itemId + '"').hide();
    if(response.moreCommonConnections == ''){
      $('#load_more_connections_in_common_'+ item.id +'').addClass("d-none");
    }
    $('#content_'+itemId+'').append('\
    <div class="p-2 shadow rounded mt-2  text-white bg-dark">' + item.following.name + ' - ' + item.following.email + '</div>\
    ');
  }, 1500);
  })

}
