var app = angular.module('bet', []);
app.controller('BetController', function($scope) {
	$scope.cote = [1,1,1];
	$scope.mise = [1,1,1];
	$scope.gain = [1,1,1];
	$scope.omise = [1,1,1];
	$scope.coteRetenu = 0;
	$scope.money = null;

	$scope.updateCote = function(){
	    $scope.mise=[1,1,1];
	    $scope.gain=[1,1,1];

	    $scope.sumMise = 0;

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
			$scope.sumMise += $scope.mise[i];
		});

		if ($scope.sumMise<$scope.gain[0])
			window.setTimeout(function(){
				$("#money").focus();
			},150);
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
		$.each($scope.gain, function(i, v) {
			$scope.gain[i]=$scope.mise[i]*$scope.cote[i];
		});
  	};

	$scope.updateGainWanted = function(){
		var coef = ($scope.gain[0]-$scope.sumMise)/$scope.money;
		$.each($scope.mise, function(i, v) {
			$scope.mise[i]=$scope.mise[i]/coef;
		});
  	};

  	$scope.reset = function()
  	{
  		$scope.cote = [1,1,1];
		$scope.mise = [1,1,1];
		$scope.gain = [1,1,1];
		$scope.omise = [1,1,1];
		$scope.coteRetenu = 0;
		$scope.money = null;
  	}

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

    $scope.$watch('money', function() {
        $scope.updateGainWanted();
    },true);

});