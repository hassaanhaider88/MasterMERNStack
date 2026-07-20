// let age: number = 29;
// console.log(age)

// let name = "hassaan";

// name = 34; // not allowed 

// const isActive = true;

// let age: string | number = 23;
// age = 23;
// age = "hassaan haider";
// console.log(age) 

// function printId(id: string | number) {
//   if (typeof id === "string") {
//     console.log(id.toUpperCase()); // TS knows it's a string here
//   } else {
//     console.log(id.toFixed(2));    // TS knows it's a number here
//   }
// }

// printId(23)
// printId("sannay")

// let direction: "up" | "down" | "left" | "right";
// direction = "up";
// console.log(direction)
// // OK
// direction = "north"; // Error: not one of the allowed literals

// console.log(direction)

// interface userData {
//     name: string
//     age: number,
//     address: string
// }

// const userDataObj: userData = {
//     name: "Hassaan Haider",
//     age: 23,
//     address: "hassaanabad"
// }

// let age:unknown = 23;
//  age = "hass"
// let age:any = 23;
//  age = "hass"

// const names: string[] = ["hmk", "codeWeb", "Sannay"]
// names.push("Hassaan")

// console.log(names)
// same but never use in jsx 
// const names:Array<string> = ["hmk", "codeWeb", "Sannay"]
// names.push("Hassaan")

// console.log(names)

// const users: readonly [string, number, object] = ["hassaan", 2, { adress: "hmk abad" }]

// users.push("hassan")
// console.log(users)

// type Person = {
//     name: string;
//     age?: number;        // optional — may be omitted
//     readonly id: number;  // cannot be reassigned after creation
// };

// const p: Person = { name: "Sara", age: 23, id: 1 };
// const p2: Person = { name: "Sara", id: 1 };

// function getFristEle(value: string): string {
//     return value.toLocaleLowerCase()
// }

// Generics 

// function anyReturn<T>(value: T): T {
//     return value
// }

// console.log(anyReturn<string>("Hassaan Haider"))
// console.log(anyReturn(true))
// console.log(anyReturn<boolean>(false))