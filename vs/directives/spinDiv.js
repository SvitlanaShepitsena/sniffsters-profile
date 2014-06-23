var spinDiv = function () {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/spin-div.html',
		transclude: true,
		replace: true,
		scope: {
			ctrl: '=',
			text: '@',
			func: '&'
		},
		link: function (scope, element, attrs) {
		}
	};
};