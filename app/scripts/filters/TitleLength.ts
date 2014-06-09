class TitleLength {
    static filter(value:string, len:number):string {
       if (value.length<=len) {
           return value;
       }
        return value.substr(0, len) + '...';
    }
}
