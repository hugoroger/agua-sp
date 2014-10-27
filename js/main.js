/* globals jQuery, Modernizr */

(function ($) {
  'use strict';

  $(function () {
    var menu = $('#navigation-menu');
    var menuToggle = $('#js-mobile-menu');

    $(menuToggle).on('click', function(e) {
      e.preventDefault();
      menu.slideToggle(function(){
        if(menu.is(':hidden')) {
          menu.removeAttr('style');
        }
      });
    });

    // underline under the active nav item
    $('.nav .nav-link').click(function() {
      $('.nav .nav-link').each(function() {
        $(this).removeClass('active-nav-item');
      });
      $(this).addClass('active-nav-item');
      $('.nav .more').removeClass('active-nav-item');
    });

    if (!Modernizr.svg) {
      $('.navigation .logo img, .hero-logo img').attr('src', function (idx, svgLocation) {
        return svgLocation.replace(/\.svg$/, '.png');
      });
    }
  });

  var myDataRef = new Firebase('https://jgqia35uk80.firebaseio-demo.com/');

  $('#emailInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var email = $('#emailInput').val();

      myDataRef.push({name: name, email: email});

      $('#nameInput').val('');
      $('#emailInput').val('');
    }
  });

   myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.email);
  });

  function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };
})(jQuery);
