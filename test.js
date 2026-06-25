// function analyzeArray(arr) {
//     if (arr.length < 1) return {}
//     let min = arr[0];
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] < min) {
//             min = arr[i]
//         }
//     }

//     let max = arr[0];
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] > max) {
//             max = arr[i]
//         }
//     }
//     const sum = arr.reduce((a, b) => a + b, 0);
//     const avg = sum / arr.length;
//     return {
//         "min": min,
//         "max": max,
//         "sum": sum,
//         "avg": avg
//     }
// }

// // console.log(analyzeArray([5, 2, 9, 1, 7]))
// // console.log(analyzeArray([]))

// function countCharacters(str) {
//     str.toLowerCase();
//     const obj = {};
//     for (let i = 0; i < str.length; i++) {
//         const char = str[i];
//         if (obj[char] === "") continue;
//         if (obj[char]) {
//             obj[char]++;
//         } else {
//             obj[char] = 1;
//         }
//     }
//     return obj;
// }

// // console.log(countCharacters("java"))

// console.log([] == false); // true
// console.log([] === false); // false
// console.log("5" + 2); // 52
// console.log("5" - 2); // 3

// function getEvenNumbers(arr) {
//     const EvenArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] % 2 === 0) {
//             EvenArr.push(arr[i]);
//         }
//     }
//     return EvenArr;
// }

// // console.log(getEvenNumbers([1, 2, 3, 4, 5, 6]))

// const user = {
//     name: "Hassaan",
//     address: {
//         city: "Karachi",
//         country: "Pakistan"
//     }
// };

// console.log(user.address.city) // karachi

// let a = 10;

// function test() {
//     let a = 20;
//     console.log(a); // 20
// }

// test();
// console.log(a); // 10

// function isPalindrome(str) {
//     const revers = str.split("").reverse().join("");
//     if (revers === str) {
//         return true
//     } else {
//         return false
//     }
// }

// // console.log(isPalindrome("madam")) // true

// function findDuplicates(arr) {
//     // const set = new Set([...arr]);
//     // return set;
//     const newArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (newArr.includes(arr[i])) {
//             continue
//         }else{
//             newArr.push(arr[i])
//         }
//     }
//     return newArr;
// }

// console.log(findDuplicates([1, 2, 3, 2, 4, 5, 1, 6, 1]))

const users = [
    { name: "Ali", role: "admin" },
    { name: "Sara", role: "user" },
    { name: "Usman", role: "admin" },
    { name: "Ayesha", role: "user" }
];

function groupBy(arr, key) {
    const result = {}
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const groupBy = item[key];
        if (!result[groupBy]) {
            result[groupBy] = [];
        }
        result[groupBy].push(item)
    }
    return result;
}

console.log(groupBy(users, "role"))