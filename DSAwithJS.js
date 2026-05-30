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

// // Area of Triangle by Heron's Formula
// let a = 5;
// let b = 4;
// let c = 3;
// let s = (a + b + c) / 2
// console.log(Math.sqrt(s * (s - a) * (s - b) * (s - c)))

// // Circumference of Circle
// let r = 12;
// console.log(2 * Math.PI * r) // 75.39

// // Conditions
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

// // ElectriCity Bill Counter
// let unit = 100;
// let amount = 0;
// if (unit > 400) {
//     amount += (unit - 400) * 13;
//     unit = 400;
// }
// if (unit > 200 && unit <= 401) {
//     amount += (unit - 200) * 8;
//     unit = 200;
// }
// if (unit > 100 && unit <= 200) {
//     amount += (unit - 100) * 6;
//     unit = 100;
// }
// amount += (unit * 4);

// console.log(`Your Payable Amount is ${amount}`)

// // PKR Domination
// let amount = 6559;

// if (amount >= 5000) {
//     console.log("5000 Rupee Notes Will Be", Math.floor(amount / 5000));
//     amount = amount % 5000;
// }
// if (amount >= 1000) {
//     console.log("1000 Rupee Notes Will Be", Math.floor(amount / 1000));
//     amount = amount % 1000;
// }
// if (amount >= 500) {
//     console.log("500 Rupee Notes Will Be", Math.floor(amount / 500));
//     amount = amount % 500;
// }
// if (amount >= 100) {
//     console.log("100 Rupee Notes Will Be", Math.floor(amount / 100));
//     amount = amount % 100;
// }
// if (amount >= 50) {
//     console.log("50 Rupee Notes Will Be", Math.floor(amount / 50));
//     amount = amount % 50;
// }
// if (amount >= 20) {
//     console.log("20 Rupee Notes Will Be", Math.floor(amount / 20));
//     amount = amount % 20;
// }
// if (amount >= 10) {
//     console.log("10 Rupee Notes Will Be", Math.floor(amount / 10));
//     amount = amount % 10;
// }
// if (amount >= 5) {
//     console.log("5 Rupee Notes Will Be", Math.floor(amount / 5));
//     amount = amount % 5;
// }
// if (amount >= 2) {
//     console.log("2 Rupee Notes Will Be", Math.floor(amount / 2));
//     amount = amount % 2;
// }
// if (amount == 1) {
//     console.log("1 Rupee Notes Will Be", Math.floor(amount / 1));
//     amount = amount % 1;
// }


// // Loops
// // table
// let n = 5;
// for (let i = 1; i <= 20; i++) {
//     console.log(`${n} X ${i} = ${n * i}`)
// }

// // Sum Of N natural Numbers
// let n = 4567;
// let sum = 0;
// for (let i = 1; i <= n; i++) {
//     sum += i;
// }
// console.log(sum, "Total")

// Factorial OF N
// let n = 5;
// let fac = 1;
// for (let i = 1; i <= n; i++) {
//     fac *= i;
// }
// console.log(fac, "Factorial")

// // Factors
// let n = 39;
// for (let i = 1; i <= Math.floor(n / 2); i++) {
//     if (n % i === 0) {
//         console.log(i)
//     }
// }

// // Prime Number
// let n = 47;
// for (let i = 2; i <= Math.floor(n / 2); i++) {
//     if (n % i === 0) {
//         console.log("Not Prime")
//         return;
//     }
// }
// console.log("Yes Prime")

// // Prime Number Very Optimize Way
// let n = 47;
// for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
//     if (n % i === 0) {
//         console.log("Not Prime")
//         return;
//     }
// }
// console.log("Yes Prime")

// // Sum Of Digits
// let n = 3251;
// let sum = 0;
// while (n > 0) {
//     n = Math.floor(n / 10);
//     sum += Math.floor(n % 10);

// }

// console.log("Sum Is", sum)

// // Number Reverse
// let n = 23456;
// let rev = 0;
// while (n > 0) {
//     rev = rev * 10 + (n%10)
//     n = Math.floor(n / 10);
// }

// console.log(`Reverse Of ${n} is ${rev}`)

// // Strong Number
// // if 32 = 3! + 2! this is called strong number
// let n = 145;
// let copyN = n;
// let sum = 0;
// while (n > 0) {
//     let fact = 1;
//     for (let i = 1; i <= (n % 10); i++) {
//         fact *= i;
//     }
//     sum += fact;
//     n = Math.floor(n / 10);
// }

// console.log(sum == copyN ? "Yes Strong Number" : "Not Strong Nubmer")


// // Guess a Random Number
// let random = Math.floor(Math.random() * 100) + 1;
// let guess = -1;
// while (guess !== random) {
//     guess = Number(prompt("Guess the number b/w 1-100"))
//     if (isNaN(guess) || guess > 1 || guess < 100) {
//         console.log("Try between 1 to 100 again")
//     } else if (guess < random) {
//         console.log("to Hight, Try again")
//     } else if (guess > random) {
//         console.log("To low, Try again")
//     } else {
//         console.log("Congrats 💖 Number was", guess)
//     }
// }

// Pattern Programming

// *****
// ****
// ***
// **
// *
// for (let j = 5; j >= 1; j--) {
//     for (let i = 1; i <= j; i++) {
//         process.stdout.write(`*`)
//     }
//     console.log()
// }

//  1
//  1  2
//  1  2  3
//  1  2  3  4
//  1  2  3  4  5
// for (let j = 1; j <= 5; j++) {
//     for (let i = 1; i <= j; i++) {
//         process.stdout.write(` ${i} `)
//     }
//     console.log()
// }

//  A
//  A  B
//  A  B  C
//  A  B  C  D
//  A  B  C  D  E
// for (let j = 1; j <= 5; j++) {
//     let ascii = 65;
//     for (let i = 1; i <= j; i++) {
//         process.stdout.write(` ${String.fromCharCode(ascii)} `)
//         ascii++
//     }
//     console.log()
// }

//     *
//    **
//   ***
//  ****
// *****
// let n = 5;
// for (let i = 1; i <= n; i++) {
//     for (let j = 1; j <= n - i; j++) {
//         process.stdout.write(" ")
//     }
//     for (let j = 1; j <= i; j++) {
//         process.stdout.write("*")
//     }
//     console.log()
// }

// *   *
//  * *
//   *
//  * *
// *   *
// let n = 5;
// for (let j = n; j >= 1; j--) {
//     for (let i = 1; i <= n; i++) {
//         if (i == j || i + j == n + 1) {
//             process.stdout.write(`*`)
//         } else {
//             process.stdout.write(` `)

//         }
//     }
//     console.log()
// }

// *       *
//  *     *
//   *   *
//    * *
//     *
// let n = 5;
// for (let j = 1; j <= n; j++) {
//     for (let i = 1; i <= n * 2; i++) {
//         if (i == j || i + j == n * 2) {
//             process.stdout.write(`*`)
//         } else {
//             process.stdout.write(` `)
//         }
//     }
//     console.log()
// }

// Mastering Array

// let arr = ["Sannay"];

// arr.push("Khan");
// arr.push("Khan2");
// arr.push("Khan3");
// arr.push("Khan4");
// arr.pop() // removing last element
// arr[8] = "anyThing"
// arr.shift() // removing first element
// arr.unshift("Added") // adding first element
// console.log(arr)

// let arr = [12, 4, 2, 4, 2, 11, 34, 2];
// let sum = 0;

// // Sum Of Elements
// for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
// }
// console.log(sum);

// // Max Val
// let arr = [12, 4, 2, 4, 2, 11, 4, 2];
// let max = arr[0];
// for (let i = 1; i < arr.length; i++) {
//     if (max < arr[i]) {
//         max = arr[i]
//     }
// }

// console.log(max)
// // 2nd Max
// let arr = [12, 4, 2, 4, 2, 11, 4,23, 2];
// let max = Math.max(arr[0], arr[1]);
// let sMax = Math.min(arr[0], arr[1]);
// for (let i = 2; i < arr.length; i++) {
//     if (arr[i] > max) {
//         sMax = max
//         max = arr[i];
//     } else if (arr[i] > sMax) {
//         sMax = arr[i]
//     }
// }

// console.log(sMax)

// Reverse the array 
// let arr = [1,2,3,4,5,6,7];
// let temp = new Array(arr.length);
// let j = 0
// for (let i = arr.length - 1; i >= 0; i--) {
//     temp[j] = arr[i];
//     j++
// }
// console.log(arr, "Old Arr")
// console.log(temp, "New Arr")

// without Extra space two point log
// let arr = [1, 2, 3, 4, 5, 6, 7];
// let i = 0;
// let j = arr.length -1;
// while(i != j){
//     let temp = arr[i];
//     arr[i] = arr[j];
//     arr[j] = temp;
//     i++;
//     j--
// }

// console.log(arr)

// Sorting 0 and 1 two point log
// let arr = [1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0];
// let i = 0;
// let j = 0;

// while (i < arr.length) {
//     if (arr[i] == 0) {
//         let temp = arr[i];
//         arr[i] = arr[j];
//         arr[j] = temp
//         j++
//     }
//     i++
// }
// console.log(arr)

// sorting negative and positive Element
// let arr = [1, 2, -4, 2, -2, 6, -9, 3, -5]
// let i = 0;
// let j = 0;
// while (i < arr.length) {
//     if (arr[i] < 0) {
//         let temp = arr[i];
//         arr[i] = arr[j];
//         arr[j] = temp;
//         j++
//     }
//     i++
// }
// console.log(arr)
