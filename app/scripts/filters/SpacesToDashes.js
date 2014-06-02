var SpacesToDashes = (function () {
    function SpacesToDashes() {
    }
    SpacesToDashes.filter = function (value) {
        return value.replace(/ /g, '-');
    };
    return SpacesToDashes;
})();
