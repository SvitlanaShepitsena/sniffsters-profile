/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var feedback:() => ng.IDirective = () => {

	return{
		restrict: 'E',
		templateUrl: 'views/directives/feedback.html',
		// replace directive tag with template info
		replace: true,
		scope: {
			f: '=',

			text: '@',
			func: '&'
		},
		link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {

		}
	}
}
