$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="right-contents__message__box" data-message-id=${message.id}>
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
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="right-contents__message__box" data-message-id=${message.id}>
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
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.right-contents__message').append(html);      
      $('form')[0].reset();
      $('.right-contents__message__box').animate({ scrollTop: $('.right-contents__message__box')[0].scrollHeight});
      $('.right-contents__from__box__btn').prop('disabled',false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
});