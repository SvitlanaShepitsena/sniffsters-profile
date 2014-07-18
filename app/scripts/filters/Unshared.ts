/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
class Unshared {
    static filter(value, isTemp) {

        if (_.isUndefined(value)) {
            return;
        }
        var filtered = [];
        value.forEach((element)=> {
            if (element.isTemp === isTemp) {
                filtered.push(element);
            }
        })
        console.log(filtered);
        return filtered;

    }
}
