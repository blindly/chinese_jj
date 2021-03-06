function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function arrayCounter(action, myArray, key) {
  var keyCount = Object.keys(myArray).length - 1;

  if (action === 'back') {
    if (key > keyCount) {
      key = 0;
    } else {
      if (key == 0) {
        key = keyCount;
      } else {
        key = key - 1;
      }
    }
  }

  if ( action === 'next' ) {
    if (key > keyCount) {
      key = 0;
    } else {
      key = key + 1;
    }
  }

  return key;
}