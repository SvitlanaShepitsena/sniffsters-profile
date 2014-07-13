class Unfire {
    static filter(value:string):string {
        return value.replace(/\(p\)/g, '.');
    }
}
