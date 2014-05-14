class BoolString
    {
        static filter(value: boolean): string
            {
                return (value == true) ? "Yes" : "No";
            }
    }
//
//class Person
//    {
//        sayHi()
//            {
//                return "Hi";
//            }
//
//        static sayHi()
//            {
//                return "Hi";
//            }
//    }
//
//// Object mathod execution
//var myPerson = new Person();
//myPerson.sayHi();
////----- static method execution
//Person.sayHi();