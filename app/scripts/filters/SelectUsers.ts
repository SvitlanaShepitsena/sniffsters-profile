/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
class SelectUsers {
    static filter(notes:INote[], isTrash:boolean):string[] {
        return _.map(_.uniq(_.pluck(_.filter(notes, (note:INote)=> {
            if (_.isNull(note)) {
                return;
            }
            return note.isTrash === isTrash;
        }), "nickName")), (userName:string)=> {
            return userName.replace(/\(p\)/g, '.');
        });
    }
}
