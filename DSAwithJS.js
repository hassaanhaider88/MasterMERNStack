// const a = "6";
// const b = 4;

// console.log(a - b) // 2
// console.log(a + b) // 64
// console.log(a * b) // 24
// console.log(a / b) // 2.5
// console.log(a ** b) // 1296 -> 4 power 6
// console.log(Number(a) + b) // 10 ->TypeConversion


// console.log(Number("12")) // 12
// console.log(Number(12)) // 12
// console.log(Number("HMK")) // NaN
// console.log(typeof Number("HMK")) // number
// console.log(Number(false)) // 0
// console.log(Number(true)) // 1

// // Swapping

// // Method 1 with extra variable
// let a = 10;
// let b = 20;
// let c = a;
// a = b;
// b = c;
// console.log(a, b, c) // 20,10,10

// // Method 2 without third variable
// let a = 59;
// let b = 32;
// a = a + b; // a = 91
// b = a - b; // b = 59
// a = a - b; // a = 32;
// console.log(a, b) // 32 59

// // Method 3 Destructure
// let a = 88;
// let b = 43;
// [a, b] = [b, a]
// console.log(a, b)

// let i = 12;
// i = i++ + ++i;
// console.log(i) //26

// let a = false;
// let b = true;
// console.log(++a) //1
// console.log(++b) //2

// // Math Funcs
// console.log(Math.round(12.4)) // 12 less than 5 (don't change)
// console.log(Math.round(12.6)) // 13 greater than 5 (Change)
// console.log(Math.floor(12.4)) // 12 always remove dot
// console.log(Math.trunc(17.99)) // 12
// console.log(Math.pow(2, 4)) // 16 -> 2 power 4
// console.log(Math.sqrt(25))  // 5
// console.log(Math.abs(-23)) // 23 negative Values to Positive
// console.log(Math.max(12, 4, 12, 14)) // 14
// console.log(Math.min(12, 4, -12, 14)) // -12
// console.log(Math.random()) // any number between 0 to 0.9999999999999999 ->16 digits
// console.log(12.424221.toFixed(3)) // 12.424 after point

// Area of Triangle by Heron's Formula
// let a = 5;
// let b = 4;
// let c = 3;
// let s = (a + b + c) / 2
// console.log(Math.sqrt(s * (s - a) * (s - b) * (s - c)))

// Circumference of Circle
// let r = 12;
// console.log(2 * Math.PI * r) // 75.39

// Conditions
// const age = Number(prompt("What is your age?"));
// if (isNaN(age)) {
//     console.log("Invalid Age")
// }else if (age > 18) {
//     console.log("Yes Your Are Able to Vote")
// } else {
//     console.log("No Your are not able to Vote")
// }

// // Shop Discount Counter  
// let amount = 6000;
// let dis = 0;
// if (amount > 0 && amount <= 5000) {
//     dis = 0;
// } else if (amount > 5000 && amount <= 7000) {
//     dis = 5;
// } else if (amount > 7000 && amount <= 9000) {
//     dis = 7;
// } else if (amount > 9000) {
//     dis = 20;
// }
// console.log(amount - Math.floor((amount * dis) / 100))

// ElectriCity Bill Counter
let unit = 100;
let amount = 0;
if (unit > 400) {
    amount += (unit - 400) * 13;
    unit = 400;
}
if (unit > 200 && unit <= 401) {
    amount += (unit - 200) * 8;
    unit = 200;
}
if (unit > 100 && unit <= 200) {
    amount += (unit - 100) * 6;
    unit = 100;
}
amount += (unit * 4);

console.log(`Your Payable Amount is ${amount}`)