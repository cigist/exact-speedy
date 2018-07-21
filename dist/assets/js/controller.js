function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function formatRp(number) {
  var vnumber = 0;
  if (typeof (number) !== "undefined") {
    vnumber = parseFloat(number.replace(/,/g, ""))
      // .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return vnumber;
};
function setLocal(){
  if(getParameterByName('uid')!==null){
    localStorage.setItem('uid',getParameterByName('uid'));
  }
}
setLocal();
app.controller('MyController', function ($timeout, $scope, $state) {
  $scope.token = getParameterByName('token');
  $scope.uid = localStorage.getItem('uid');
  $scope.bulan = 1;
  $scope.bulans = null;
  $scope.colour=['#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
  $scope.data = {
    cb6: false
  };
  $scope.init =function(){
    onLoad();
  }
  $scope.loadBulans = function () {
    return $timeout(function () {
      $scope.bulans = $scope.bulans || [
        { id: 1, name: 'BULAN INI' },
        { id: 2, name: 'BULAN -1' },
        { id: 3, name: 'BULAN -2' }
      ];
    }, 650);
  };
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
      xuserid: $scope.uid,
      xbulan: $scope.bulan
    };
    Post('speedy.spddashboard?', param, function (result) {
      var vresult = JSON.parse(result);
      if (vresult.STATUS === 'OK') {
        $scope.listData = vresult.CONTENT_DASHBOARD;
        $scope.labels = ["Bulan ini", "Sebelumnya"];
        $scope.chartDataTao = [parseFloat(vresult.CONTENT_DASHBOARD[0][1]), parseFloat(vresult.CONTENT_DASHBOARD[0][2])];
        $scope.chartDataToo = [parseFloat(vresult.CONTENT_DASHBOARD[1][1]), parseFloat(vresult.CONTENT_DASHBOARD[1][2])];
        $scope.chartDataTo_o = [parseFloat(vresult.CONTENT_DASHBOARD[2][1]), parseFloat(vresult.CONTENT_DASHBOARD[2][2])];
        $scope.chartDataTok = [parseFloat(vresult.CONTENT_DASHBOARD[3][1]), parseFloat(vresult.CONTENT_DASHBOARD[3][2])];
        $scope.chartDataI7 = [parseFloat(vresult.CONTENT_DASHBOARD[5][1]), parseFloat(vresult.CONTENT_DASHBOARD[5][2])];
        $scope.chartDataIt = [parseFloat(vresult.CONTENT_DASHBOARD[6][1]), parseFloat(vresult.CONTENT_DASHBOARD[6][2])];
        $scope.chartDataTac = [parseFloat(vresult.CONTENT_DASHBOARD[8][1]), parseFloat(vresult.CONTENT_DASHBOARD[8][2])];
        $scope.chartDataRk = [parseFloat(vresult.CONTENT_DASHBOARD[9][1]), parseFloat(vresult.CONTENT_DASHBOARD[9][2])];
        $scope.chartDataTpr = [parseFloat(vresult.CONTENT_DASHBOARD[11][1]), parseFloat(vresult.CONTENT_DASHBOARD[11][2])];
        $scope.chartDataTc = [parseFloat(vresult.CONTENT_DASHBOARD[12][1]), parseFloat(vresult.CONTENT_DASHBOARD[12][2])];
        $scope.chartDataTb = [parseFloat(vresult.CONTENT_DASHBOARD[13][1]), parseFloat(vresult.CONTENT_DASHBOARD[13][2])];
        $scope.chartDataTper = [parseFloat(vresult.CONTENT_DASHBOARD[14][1]), parseFloat(vresult.CONTENT_DASHBOARD[14][2])];
        $scope.chartDataTps = [parseFloat(vresult.CONTENT_DASHBOARD[15][1]), parseFloat(vresult.CONTENT_DASHBOARD[15][2])];
        $scope.chartDataTdop = [parseFloat(vresult.CONTENT_DASHBOARD[16][1]), parseFloat(vresult.CONTENT_DASHBOARD[16][2])];
        $scope.chartDataTvs = [parseFloat(vresult.CONTENT_DASHBOARD[18][1]), parseFloat(vresult.CONTENT_DASHBOARD[18][2])];
        $scope.chartDataTpen = [parseFloat(vresult.CONTENT_DASHBOARD[19][1]), parseFloat(vresult.CONTENT_DASHBOARD[19][2])];
        $scope.chartDataTkon = [parseFloat(vresult.CONTENT_DASHBOARD[20][1]), parseFloat(vresult.CONTENT_DASHBOARD[20][2])];
        $.LoadingOverlay("hide");
      } else {
        $.LoadingOverlay("hide");
      }
    });
  };
  $scope.onChange = function (cbState) {
    if (cbState) {
      $state.go('chart');
    } else {
      $state.go('/');
    }
  };
  
  $scope.labelKomisi = ['TARGET KOMISI', 'TOTAL KOMISI'];
  $scope.seriesKomisi = ['bulan ini', 'sebelumnya'];

  $scope.dataKomisi = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
});