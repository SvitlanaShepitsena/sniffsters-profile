class SpacesToDashes {
    static filter(value:string):string {


        return value.replace(/ /g, '-');
    }
}
