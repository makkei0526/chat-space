$(function(){
  function buildHTML(message) {
    image = (message.image) ? `<img class= "right-contents__message__box__comment__image" src=${message.image} >` : "";
    var html = 
      `<div class="right-contents__message__box" data-id="${message.id}"> 
        <div class="right-contents__message__box__name">
          <div class="right-contents__message__box__name__user">
            ${message.user_name}
          </div>
          <div class="right-contents__message__box__name__data">
            ${message.created_at}
          </div>
        </div>
        <div class="right-contents__message__box__comment">
          <p class="right-contents__message__box__comment__body">
            ${message.body}
          </p>
          ${image}
        </div>
      </div>`
      return html;
  }
    $('#new_message').on('submit', function(e){
      e.preventDefault()
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.right-contents__message').append(html);      
        $('form')[0].reset();
        $('.right-contents__message').animate({ scrollTop: $('.right-contents__message')[0].scrollHeight});
        $('.right-contents__from__box__btn').prop('disabled',false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    });
    

  var reloadMessages = function() {
    var last_message_id = $('.right-contents__message__box:last').data("id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.right-contents__message').append(insertHTML);
        $('.right-contents__message').animate({ scrollTop: $('.right-contents__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});