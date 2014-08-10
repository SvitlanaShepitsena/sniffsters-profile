/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
class SelectedUserMessages {
    static filter(notes:INote[], isTrash:boolean, userName:string):INote[] {

        return _.filter(notes, (note:INote)=> {
            if (_.isNull(note)) {
                return;
            }
            return note.isTrash === isTrash && note.userName === userName;
        });
    }
}
