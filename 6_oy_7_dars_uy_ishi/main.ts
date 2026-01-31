// ------------------------------------------------1 masala 

// function upperCaseKeys(obj: {[key: string]: any}): object {
//     let result: {[key: string]: any} = {}
// for (const key in obj) {
//     result[key.toLocaleUpperCase()] = obj[key]
// }
//     return result
// }

// const data = {name: "Ali", age: 25, country: "Uzbekiston"}
// const newData = upperCaseKeys(data)

// console.log(newData);

// -------------------------------------------------2 masala

// function fizzBuzz(n: number): string[] {
//     let result:string[] = []
// for (let i = 1; i <= n; i++) {
//    let num:number = i
//     if (num % 3 === 0 && num % 5 === 0) {
//         result.push("Fizzbuz")
//         continue 
//     } else if (num % 5 === 0) {
//         result.push("Buzz")
//         continue
//     } else if (num % 3 === 0) {
//         result.push("Fizz")
//         continue
//     }
//     result.push(num.toString())
// }
// return result
// }

// console.log(fizzBuzz(15));

// ------------------------------------------------------ 3 masala

// function getPermutations(str: string): string[] {
//     if (str.length <= 1) return [str]
//     const permutations: string[] = []

//     for (let i = 0; i < str.length; i++) {
//        const char = str[i]

//        const remainingChars = str.slice(0, i) + str.slice(i + 1)
//        const subPermutatuons = getPermutations(remainingChars)

//        for (const sub of subPermutatuons) {
//         permutations.push(char + sub)         
//        }
//     }
//     return permutations
// }

// console.log(getPermutations("abc"));

// -----------------------------------------------------4 masala

// function jsonDiff(obj1: any, obj2: any): object {
//     const diff: {[key: string]: {old: any; new: any}} = {}

//     const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])

//     allKeys.forEach(key => {
//         const val1 = obj1[key];
//         const val2 = obj2[key];

//         if (val1 !== val2) {
//             diff[key] = {
//                 old: val1,
//                 new: val2
//             }
//         }
//     })
//     return diff
// }

// const oldData = { name: "Ali", age: 25, city: "Toshkent" };
// const newData = { name: "Ali", age: 26, country: "Uzbekistan" };

// console.log(jsonDiff(oldData, newData));

// -----------------------------------------------------5 masala

// function sortIPs(ips: string[]): string[] {
//     for (let i = 0; i < ips.length; i++) {
//        for (let j = 0; j < ips.length -1; j++) {
        
//         const currentIP = ips[j]
//         const nextIP = ips[j + 1]

//         if (currentIP && nextIP) {
//             const a = currentIP.split(".").map(Number)
//             const b = nextIP.split(".").map(Number)
            
//             let shiudSwap = false
//             for (let k = 0; k < 4; k++) {

//                 const numA = a[k]
//                 const numB = b[k]

//                if (numA !== undefined && numB !== undefined) {
//                 if (numA > numB) {
//                     shiudSwap = true
//                     break
//                 } else if (numA < numB) {
//                     break
//                 }
//                }
//             }
//             if (shiudSwap) {
//                 ips[j] = nextIP
//                 ips[j + 1] = currentIP
//             }
//         }
//        }
//     }
    
//     return ips
// }

// console.log(sortIPs(["192.168.1.1", "10.0.0.1", "172.16.0.1", "192.168.0.1"]));

// -----------------------------------------------------6 masala

// function copressString(str:string):string {
//     let compressed: string = ""
//     let count: number = 1

//     for (let i = 0; i < str.length; i++) {
       
//         if (str[i] === str[i + 1]) {
//             count ++
//         } else {
//             compressed += str.charAt(i) + count
//             count = 1
//         }
//     }
    
// return compressed
// }

// console.log(copressString("aaabbcddd"));

// -----------------------------------------------------7 masala

// function isValidSudoku(board: number[][]) {
//     let seen = new Set()

//     for (let i = 0; i < 9; i++) {
//       for (let j = 0; j < 9; j++) {
//         let val = board[i]?.[j]

//         if (val !== 0) {
//             let row = `i${i}${val}`
//             let col = `j${j}${val}`
//             let box = `b${Math.floor(i / 3)}${Math.floor(j / 3)}${val}`

//             if (seen.has(row) || seen.has(col) || seen.has(box)) {
//                 return false
//             }

//             seen.add(row)
//             seen.add(col)
//             seen.add(box)
//         }
//       } 
//     }
//     return true
// }

// const board = [
//     [5, 3, 0, 0, 7, 0, 0, 0, 0],
//     [6, 0, 0, 1, 9, 5, 0, 0, 0],
//     [0, 9, 8, 0, 0, 0, 0, 6, 0],
//     [8, 0, 0, 0, 6, 0, 0, 0, 3],
//     [4, 0, 0, 8, 0, 3, 0, 0, 1],
//     [7, 0, 0, 0, 2, 0, 0, 0, 6],
//     [0, 6, 0, 0, 0, 0, 2, 8, 0],
//     [0, 0, 0, 4, 1, 9, 0, 0, 5],
//     [0, 0, 0, 0, 8, 0, 0, 7, 9]
// ];

// console.log(isValidSudoku(board)); 

// -----------------------------------------------------8 masala

// function groupAnagrams(words: string[]): string[][] {

//     const res: { [key: string]: string[] } = {};

//     for (const s of words) {
//         const sorted = s.split('').sort().join('');

//         if (!res[sorted]) {
//             res[sorted] = [];
//         }
//         res[sorted].push(s);
//     }

//     return Object.values(res);
// }

// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "hat"]));

// ----------------------------------------------- amaliyot

// ----------------------------------------------- 1 masala

// function sumArr(numbers: number[]): number {
//     let sum: number= 0;
//     for (let i = 0; i < numbers.length; i++) {
//         let current = numbers[i]
//         if (current !== undefined) {
//             sum += current
//         }
//     }
//     return sum
// }

// console.log(sumArr([1, 2, 3, 4, 5]));

// -----------------------------------------------2 masala

// function strLength(str: string[]):number[] {
//     let sum: number[] = []
//     for (let i = 0; i < str.length; i++) {
//         let s = str[i]
//         if (s !== undefined) {
//             sum.push(s.length)
//         }
//     }

// return sum
// }

// console.log(strLength(["salimjon", "akbar", "nodir", "muzaffar"]));

// -----------------------------------------------3 masala

// function typle(user:[string, number, string]) {
//     for (let i = 0; i < user.length; i++) {
//         console.log(user[i])
//     }
// }

// let user: [string, number, string] = ["Ali", 25, "Dasturchi"]

// console.log(typle(user));

// -----------------------------------------------4 masala

// type Car = {
//     make: string,
//     model: string,
//     year: number
// }

// let cars: Car[] = [
//     {make: "Toyota", model: "Corolla", year: 2022},
//     {make: "Chevrolet", model: "Cobolt", year: 2025},
//     {make: "chevrolet", model: "Damas", year: 2022}
// ]

// function carAlies(car: Car[]): void {
//     let sum = car
//     for (let i = 0; i < sum.length; i++) {
//         console.log(sum[i]);
        
//     }
// }

// console.log(carAlies(cars));

// -----------------------------------------------5 masala

// type Book = {
//     title: string,
//     author: string,
//     pages: number
// }

// let books: Book[] = [
//     {title: "Yulduzli tunlar", author: "Pirimqul Qodirov", pages: 400},
//     {title: "Oq so'yloq", author: "Jesk London", pages: 255},
//     {title: "Kecha va kunduz", author: "Cholpon", pages: 388}
// ]

// function bookAtlas(books: Book[]):void {
//     for (let i = 0; i < books.length; i++) {
//         console.log(books[i]);
//     }
// }

// console.log(bookAtlas(books));

// -----------------------------------------------6 masala

// function unionFunc(empty: string | number) {
//     if (typeof empty === "string") {
//         return empty.length
//     } else {
//         return empty * 2
//     }
// }

// let log: string | number = 8

// console.log(unionFunc(log));

// -----------------------------------------------7 masala

// function getInfo(id: string | number) {
//     if (typeof id === "string") {
//         console.log("Sizning ID matn ko'rinishida:", id);
//     } else {
//         console.log("Sizning ID raqam ko'rinishida:", id);   
//     }
// }

// let id: string | number = 8

// console.log(getInfo(id));

// -----------------------------------------------7 masala

// function isPassing(score: number, num: number): boolean {
// return score >= num
// }

// console.log(isPassing(6, 5));

// -----------------------------------------------8 masala

// let data: string | null | undefined = null

// let result = data ?? "Default text"
// console.log(result);

// -----------------------------------------------9 masala

// function logMessage(message: string): void {
//     console.log("Xabar", message)    
// }

// logMessage("Tizim ishlamoqda")

// -----------------------------------------------10 masala

// function throwError(errorMsg: string): never {
//     throw new Error(errorMsg)
// }

// console.log(throwError("qalay"));


// function infiniteLoop(): never {
//     while(true) {
//         console.log("Bu hech qachon to'xtamaydi")        
//     }
// }
// console.log(infiniteLoop());