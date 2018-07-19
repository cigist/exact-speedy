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
app.controller('MyController', function($timeout, $scope) {
  console.log(getParameterByName('foo'))
    $scope.token=getParameterByName('token');
    $scope.uid=getParameterByName('uid');
    $scope.bulan = null;
    $scope.bulans = null; 
    $scope.loadBulans = function() {
      return $timeout(function() {
        $scope.bulans =  $scope.bulans  || [
          { id: 1, name: 'BULAN INI' },
          { id: 2, name: 'BULAN -1' },
          { id: 3, name: 'BULAN -2' }
        ]; 
      }, 650);
    };
    $scope.loadData = function() {
        return $timeout(function() {
          $scope.listSpeedy= [
            { id: 1, name: 'BULAN INI' },
            { id: 2, name: 'BULAN -1' },
            { id: 3, name: 'BULAN -2' }
          ]; 
        }, 650);
      };
  });