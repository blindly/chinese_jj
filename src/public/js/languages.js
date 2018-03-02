function list_translations() {
  document.addEventListener('DOMContentLoaded', function () {
    url = "https://api.fivecat.xyz/api/index.php/chinese/all/";
    $.getJSON(url, function (json) {
      if (json.status === 'ok') {
        let translations = json.data_array;
        $.each(translations, function (key) {
          let translation = translations[key].translation;
          let original = translations[key].original;
          
          let row = "<tr><td>" + translation + "</td><td>" + original +"</td></tr>";
          
          $('#languages').append(row);
        });
      }
    });
  }, false);
}

function random_translation() {
  document.addEventListener('DOMContentLoaded', function () {
    
    url = "https://api.fivecat.xyz/api/index.php/chinese/random";
      
    $.getJSON(url, function (json) {
      var translation = json.translation;
      var original = json.original;
      
      $('#translation').html(translation);
      $('#original').html(original);
      
    });
  }, false);
}

function add_translation() {
  document.addEventListener('DOMContentLoaded', function () {
    $(document).on("submit", "form", function (e) {
      e.preventDefault();
      var url = "https://api.fivecat.xyz/api/index.php/chinese/add";
      var original = $("#original").val();
      var translation = $("#translation").val();
      var data = {
        original: original,
        translation: translation
      };
      var request = $.post(url, data);
      $.notify("Added", "success");
      document.getElementById("learnNew").reset();
      
    });
  }, false);
}