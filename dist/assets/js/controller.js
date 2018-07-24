function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue;
};
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setLocal() {
  if (getParameterByName('uid') !== null || getParameterByName('uid') !== '' || getParameterByName('uid') !== undefined) {
    setCookie('uid', getParameterByName('uid'));
    setCookie('scope', getParameterByName('scope'));
    setCookie('token', getParameterByName('token'));
  }
}
setLocal();
app.controller('MyController', function ($timeout, $scope, $state) {
  $scope.init =function(){
    onLoad();
  }
  function onLoad(){
    setTimeout(function(){
      $(document).ready(function () {
        $('#btnRefresh').click();
    });
    },4000)   
  }
  $scope.loadData = function () {
    $.LoadingOverlay("show", {
      image: "https://exact.co.id/x-loading.gif",
      text: "Loading...."
    });
    var param = {
      xscope: getCookie('scope'),
      xuserid: getCookie('uid'),
      xtoken: getCookie('token')
    };
    Post('myexweb.exgetslidepresentation?', param, function (result) {
      var vresult = JSON.parse(result);
      if (vresult.STATUS === 'OK') {
        $scope.slides=vresult.LIST_IMAGE;
        $scope.counter=$scope.slides.length;
        $.LoadingOverlay("hide");
      } else {
        $.LoadingOverlay("hide");
      }
    });
  };
});