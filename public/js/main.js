///////////////////////////////////////////SUGGESTION function/////////////////////////////////////////////

function getSuggestions(data) {
  $.ajax({
      type: "GET",
      url: "/users",
      dataType: "json",
      success: function(response) {
        if(response.suggestionUser.length < 10){
          $('#load_more_btn_parent_suggenstion').addClass("d-none");          
        }
      getSuggestionsContent(response.suggestionUser); 
   }
});
}
function countSuggestions(){
 $.ajax({
      type: "GET",
      url: "/users",
      dataType: "json",
      success: function(response) {
      var suggestionCount = $('#get_suggestions_btn');
      suggestionCount.text(suggestionCount.text()
      .replace("Suggestions ()", 'Suggestions ('+ response.totalSuggestionUser.length +')'));
   }
});
}
function getMoreSuggestions(value) {
 $.ajax({
      type: "GET",
      url: "users/suggestion/load",
      data:{value:value},
      dataType: "json",
      success: function(response) {
      getMoreSuggestionsContent(response.getmoreSuggestionUser , response.addPaginate);
        
    }
});
}

///////////////////////////////////////////REQUEST function/////////////////////////////////////////////

function getRequests(mode) {
  $.ajax({
    type: "GET",
    url: "users/sent/requests",
    data:{mode:mode},
    dataType: "json",
    success: function(response) {
      getRequestContent(response.getModevalue , response.getRequest);

    }
  });  
}
function getMoreRequests(mode , value) {
  // Optional: Depends on how you handle the "Load more"-Functionality
  $.ajax({
        type: "GET",
        url: "users/sent/requests/load",
        data:{mode:mode , value:value},
        dataType: "json",
        success: function(response) {
        getMoreRequestsContent(response.getModevalue , response.getmoreRequested , response.addRequestedPaginate);
      }
    });
}
function sendRequest(suggestionId) {
  $.ajax({
    type: "GET",
    url: "users/store",
    data:{suggestionId:suggestionId},
    dataType: "json",
    success: function(response) {
      if(response.connectId){
        $('#dataList'+response.connectId+'').addClass("d-none");
        // $('#get_suggestions_id').empty();
      }
  }
  });
}
function getsentRequestCount(mode){
    $.ajax({
         type: "GET",
         url: "users/sent/requests",
         dataType: "json",
         data:{mode:mode},
         success: function(response) {
          var requestCount = $('#get_sent_requests_btn');
          requestCount.text(requestCount.text()
          .replace("Sent Requests ()", 'Sent Requests ('+ response.getRequestCount.length +')'));
        }
     });
}
function acceptRequest(itemId) {
  $.ajax({
    type:"GET",
    url:"users/accept/request",
    data:{itemId:itemId},
    datatype:"json",
    success: function(response) {
      if(response.urlacceptitemId){
        $('#data_accept_request_List_'+response.urlacceptitemId+'').addClass("d-none");
      }
  }
  })
}
function sendRequest(suggestionId) {
  $.ajax({
    type: "GET",
    url: "users/store",
    data:{suggestionId:suggestionId},
    dataType: "json",
    success: function(response) {
      if(response.connectId){
        $('#dataList'+response.connectId+'').addClass("d-none");
        // $('#get_suggestions_id').empty();
      }
  }
  });
}
function getreceivedRequestCount(mode){
  $.ajax({
       type: "GET",
       url: "users/sent/requests",
       dataType: "json",
       data:{mode:mode},
       success: function(response) {
        var requestCount = $('#get_received_requests_btn');
        requestCount.text(requestCount.text()
        .replace("Received Requests ()", 'Received Requests ('+ response.getRequestCount.length +')'));
      }
   });
}
function deleteRequest(itemId) {
$.ajax({
  type: "GET",
  url: "users/delete/request",
  data:{itemId:itemId},
  dataType: "json",
  success: function(response) {
    if(response.urlitemId){
      $('#data_sent_request_List'+response.urlitemId+'').addClass("d-none");
    }
}
});
}

///////////////////////////////////////////CONNECTION function/////////////////////////////////////////////

function getConnections() {
  $.ajax({
    type: "GET",
    url: "users/connection",
    dataType: "json",
    success: function(response) {
      getConnectionsContent(response.getConnection);
    }
  });
}
function getConnectionsCount(){
  $.ajax({
       type: "GET",
       url: "users/connection",
       dataType: "json",
       success: function(response) {
        var requestCount = $('#get_connections_btn');
        requestCount.text(requestCount.text()
        .replace("Connections ()", 'Connections ('+ response.totalConnection.length +')'));
      }
   });
}
function getMoreConnections(value) {
  $.ajax({
    type: "GET",
    url: "users/more/connection",
    data:{value:value},
    dataType: "json",
    success: function(response) {
    getMoreConnectionsContent(response.getmoreConnection , response.addPaginate);
      
  }
});
}
function getConnectionsInCommon(itemId, userId, connectionId) {
  $.ajax({
    type:"GET",
    url:"users/common/connection",
    data:{userId:userId , connectionId:connectionId , itemId:itemId},
    datatype:"json",
    success: function(response) {
      if(response.commonConnections){
        getConnectionsInCommonContent(response.commonConnections , response.itemId)
      }
  }
  })
}
function getMoreConnectionsInCommon(itemId, userId , connectionId , value='') {
  $.ajax({
    type:"GET",
    url:"users/more/common/connection",
    data:{userId:userId , connectionId:connectionId , itemId:itemId , value:10},
    datatype:"json",
    success: function(response , data) {
      if(response.moreCommonConnections){
        getMoreConnectionsInCommonContent(response.moreCommonConnections , response.itemId , response.addPaginate)
      }
  }
  })
}
function removeConnection(itemId) {
  $.ajax({
    type:"GET",
    url:"users/remove/connection",
    data:{itemId:itemId},
    datatype:"json",
    success: function(response) {
      if(response.urlConnectionitemId){
        $('#data_delete_connection_List_'+response.urlConnectionitemId+'').addClass("d-none");
      }
  }
  })
}

///////////////////////////////////////////CUSTOM RELOAD function/////////////////////////////////////////////

$(function () {
  getSuggestions();
  countSuggestions();
  getsentRequestCount(mode='sent');
  getreceivedRequestCount(mode='received');
  getConnectionsCount();
});

///////////////////////////////////////////ONCLICK EVENT RELOAD function/////////////////////////////////////////////

$(document).on('click', '#get_suggestions_btn', function(){
  $('#sent_request_blade').hide();
  $('#received_request_blade').hide();
  $('#received_connection_blade').hide();
  $('#suggestion_blade').show();
});
$(document).on('click', '#get_sent_requests_btn', function(){
  $('#suggestion_blade').hide();
  $('#received_request_blade').hide();
  $('#received_connection_blade').hide();
  $('#sent_request_blade').removeClass("d-none");
  $('#sent_request_blade').show();
});
$(document).on('click', '#get_received_requests_btn', function(){
  $('#suggestion_blade').hide();
  $('#sent_request_blade').hide();
  $('#received_connection_blade').hide();
  $('#received_request_blade').removeClass("d-none");
  $('#received_request_blade').show();
});
$(document).on('click', '#get_connections_btn', function(){
  $('#suggestion_blade').hide();
  $('#sent_request_blade').hide();
  $('#received_request_blade').hide();
  $('#received_connection_blade').removeClass("d-none");
  $('#received_connection_blade').show();
});
 
