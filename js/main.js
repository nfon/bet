var app = angular.module('bet', []);
app.controller('BetController', function($scope) {
	$scope.cote = [1,1,1];
	$scope.mise = [1,1,1];
	$scope.gain = [1,1,1];
	$scope.omise = [1,1,1];
	$scope.coteRetenu = 0;

	$scope.updateCote = function(){
	    $scope.mise=[1,1,1];
	    $scope.gain=[1,1,1];

	    $scope.sumMise = 0;
	    $scope.minGain = 99999999;

	    $scope.coteRetenu = 0;
	    if ($scope.cote[0] <= $scope.cote[1] && $scope.cote[0] <= $scope.cote[2])
	      $scope.coteRetenu = 0;
	    if ($scope.cote[1] <= $scope.cote[0] && $scope.cote[1] <= $scope.cote[2])
	      $scope.coteRetenu = 1;
	    if ($scope.cote[2] <= $scope.cote[0] && $scope.cote[2] <= $scope.cote[1])
	      $scope.coteRetenu = 2;

	    $scope.mise[$scope.coteRetenu]=1;

		$.each($scope.cote, function(i, v) {
			if (i!=$scope.coteRetenu)
				$scope.mise[i]=$scope.cote[$scope.coteRetenu]/$scope.cote[i];

			$scope.gain[i] =$scope.mise[i]*$scope.cote[i];
			$scope.omise[i]=$scope.mise[i];

			if ($scope.minGain>$scope.gain[i])
				$scope.minGain=$scope.gain[i]
			$scope.sumMise += $scope.mise[i];
		});
  	};

	$scope.updateMise = function(j){
		var coef = $scope.mise[j]/$scope.omise[j];
		$scope.sumMise = 0;

		$.each($scope.mise, function(i, v) {
			if (i!=j)
				$scope.mise[i]=$scope.omise[i]*coef;
			$scope.sumMise += $scope.mise[i];
		});
		$scope.updateGain();
  	};

	$scope.updateGain = function(){
		$scope.minGain = 99999999;
		$.each($scope.gain, function(i, v) {
			$scope.gain[i]=$scope.mise[i]*$scope.cote[i];
			if ($scope.minGain>$scope.gain[i])
				$scope.minGain=$scope.gain[i]
		});
  	};

    $scope.$watch('cote', function() {
        $scope.updateCote();
    },true);

    $scope.$watch('mise[0]', function() {
        $scope.updateMise(0);
    },true);

    $scope.$watch('mise[1]', function() {
        $scope.updateMise(1);
    },true);

    $scope.$watch('mise[2]', function() {
        $scope.updateMise(2);
    },true);
});