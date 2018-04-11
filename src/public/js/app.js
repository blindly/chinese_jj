// @ts-check
$(document).ready(function() {
  var url =
    "https://library.fivecat.xyz/api/collections/get/chinese?token=060ae1cc8ac9269bb8c4c80943598e";
  var translations, key;

  $.ajax({
    url: url,
    async: false,
    dataType: "json",
    success: function(json) {
      translations = json.entries;

      key = 0;
      var translation = translations[key].translation;
      var original = translations[key].original;

      $("#translation").html(translation);
      $("#original").html(original);

      loadTable(translations, key);
    }
  });

  $("#prevTranslation").click(function() {
    key = arrayCounter("back", translations, key);
    loadTranslations(translations, key);
  });

  $("#nextTranslation").click(function() {
    key = arrayCounter("next", translations, key);
    loadTranslations(translations, key);
  });

  $("#index").click(function() {
    // Show
    $("#cards").fadeIn("slow");

    // Hide
    $("#table").fadeOut("slow");
    $("#form").fadeOut("slow");
  });

  $("#list").click(function() {
    // Show
    $("#table").fadeIn("slow");

    // Hide
    $("#cards").fadeOut("slow");
    $("#form").fadeOut("slow");
  });

  $("#new").click(function() {
    // Show
    $("#form").fadeIn("slow");

    // Hide
    $("#cards").fadeOut("slow");
    $("#table").fadeOut("slow");
  });

  $("#submit").click(function() {
    formSubmit();
  });
});

function loadTable(translations, key) {
  $.each(translations, function(key) {
    var translation = translations[key].translation;
    var original = translations[key].original;

    var row =
      "<tr><td>" +
      original +
      "</td><td>" +
      translation +
      "</td></tr>";
    $("#table").append(row);
  });
}

function loadTranslations(translations, key) {
  var translation = translations[key].translation;
  var original = translations[key].original;

  $("#translation").html(translation);
  $("#original").html(original);
}

function formSubmit() {
  $(document).on("submit", "form", function(e) {
    e.preventDefault();
    var url =
      "https://library.fivecat.xyz/api/collections/save/chinese?token=060ae1cc8ac9269bb8c4c80943598e";
    var original = $("#new_original").val();
    var translation = $("#new_translation").val();

    if (
      original != "" &&
      translation !== ""
    ) {
      var data = {
        original: original,
        translation: translation,
      };

      var body = { data: data };

      $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(body),
        success: function(json) {
          swal("Xie Xie JJ.");
        }
      });

      document.getElementById("form").reset();
    } else {
      return;
    }
  });
}
