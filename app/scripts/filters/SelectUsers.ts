/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
class SelectUsers {
    static filter(notes:INote[], isTrash:boolean):string[] {
        var userNames:string[] = _.map(_.uniq(_.pluck(_.filter(notes, (note:INote)=> {
            return note.isTrash === isTrash;
        }), "userName")), (userName:string)=> {
            return userName.replace(/\(p\)/g, '.');
        });
        return userNames;
    }
}
