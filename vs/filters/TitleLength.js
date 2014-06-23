var TitleLength = function () {
	function TitleLength() {
	}

	TitleLength.filter = function (value, len) {
		if (value.length <= len) {
			return value;
		}
		return value.substr(0, len) + '...';
	};
	return TitleLength;
}();