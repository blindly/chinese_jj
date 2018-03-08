function list_translations() {
  document.addEventListener('DOMContentLoaded', function () {
    //url = "https://api.fivecat.xyz/api/index.php/chinese/all/";
    var url = "https://library.fivecat.xyz/api/collections/get/chinese?token=060ae1cc8ac9269bb8c4c80943598e";
    $.getJSON(url, function (json) {
      if (json.entries) {
        var translations = json.entries;
        $.each(translations, function (key) {
          var translation = translations[key].translation;
          var original = translations[key].original;

          var row = "<tr><td>" + translation + "</td><td>" + original + "</td></tr>";

          $('#languages').append(row);
        });
      }
    });
  }, false);
}

function random_translation() {
  var url = "https://library.fivecat.xyz/api/collections/get/chinese?token=060ae1cc8ac9269bb8c4c80943598e";

  $.getJSON(url, function (json) {
    if (json.entries) {
      var translations = json.entries;
      $.each(translations, function (key) {
        var translation = translations[key].translation;
        var original = translations[key].original;

        $('#translation').html(translation);
        $('#original').html(original);

        var row = "<tr><td>" + translation + "</td><td>" + original + "</td></tr>";

        $('#languages').append(row);
      });
    }
  });
}

function quiz_translations() {
  var url = "https://library.fivecat.xyz/api/collections/get/chinese?token=060ae1cc8ac9269bb8c4c80943598e";
  var translations;
  var key;

  $.ajax({
    url: url,
    async: false,
    dataType: 'json',
    success: function ( json ) {
      translations = json.entries;
      key = 0;
      var translation = translations[key].translation;
      var original = translations[key].original;

      console.log('key ' + key);

      $('#translation').html(translation);
      $('#original').html(original);

      var row = "<tr><td>" + translation + "</td><td>" + original + "</td></tr>";

      $('#languages').append(row);
    }
  });

  $('#prevTranslation').click(function() {
    var count = Object.keys(translations).length;
    if ( key > count - 1 ) {
      key = 0;
    }
    else {
      if ( key == 0 ) { 
        key = count - 1;
      }
      else {
        key = key - 1;
      }
    }

    console.log("Key " + key);

    loadTranslations(translations, key);
  });

  $('#nextTranslation').click(function() {
    var count = Object.keys(translations).length;
    if ( key >= count - 1 ) {
      key = 0;
    }
    else {
      key = key + 1;
    }

    console.log("Key " + key);

    loadTranslations(translations, key);
  });
}

function add_translation() {
  document.addEventListener('DOMContentLoaded', function () {
    $(document).on("submit", "form", function (e) {
      e.preventDefault();
      var url = "https://library.fivecat.xyz/api/collections/save/chinese?token=060ae1cc8ac9269bb8c4c80943598e";
      var original = $("#original").val();
      var translation = $("#translation").val();
      var data = {
        original: original,
        translation: translation
      };

      var body = { data: data };
    
      $.ajax({
        url: url,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify( body ),
        success: function ( json ) {
          swal("Added. Xie Xie JJ!");
        }
      });

      document.getElementById("learnNew").reset();
    });
  }, false);
}

function loadTranslations(translations, key) {

  console.log(key);

  var translation = translations[key].translation;
  var original = translations[key].original;

  $('#translation').html(translation);
  $('#original').html(original);

  var row = "<tr><td>" + translation + "</td><td>" + original + "</td></tr>";

  $('#languages').append(row);
}