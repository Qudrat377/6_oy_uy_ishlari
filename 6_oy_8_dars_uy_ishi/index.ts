// jptdan olindi barchasi

// ------------------------------1.1 masala

// function bbc<T>(a: T): T {
//     return a
// }

// console.log(bbc<number>(2));

// ------------------------------1.2 masala

// function birinchiElement<T>(arr: T[]): T | undefined{
//     return arr[0]
// }

// console.log(birinchiElement([1, 2, 3]));

// ------------------------------1.3 masala

// function getLast<T>(arr: T[]): T | undefined{
//     return arr[arr.length -1]
// }

// console.log(birinchiElement([1, 2, 3]));

// ------------------------------1.4 masala

// interface Pair<K, V> {
//     key: K;
//     value: V
// }

// let person: Pair<number, string> = {
//     key: 1,
//     value: "Ali"
// }

// ------------------------------1.5 masala

// function bbc<T extends {length: number}>(value: T): void {
//     console.log(value.length)    
// }

// ------------------------------1.6 masala

// function findMinNumber(arr: number[]): number | undefined {
//     if (arr.length === 0) return undefined;
//     if (arr[0] === undefined) return undefined

//     let min: number | undefined = arr[0];

//     for (let i = 1; i < arr.length; i++) { 
//        let arrI = arr[i]
//         if (arrI !== undefined) {
//             if (arrI < min) {
//                 min = arrI;
//             }
//        }
//     }

//     return min;
// }

// const numbers = [55, 1, 5, 2, 42];
// console.log(findMinNumber(numbers)); // Natija: 1

// ------------------------------2.1 masala

// function merge<T, U>(obj1: T, obj2: U): T & U {
//     return {...obj1, ...obj2}
// }

// const author = {name: "Qodriy"}
// const book = {title: "Oybek"}

// const merged = merge(author, book)

// console.log(merged);

// ------------------------------2.2 masala

// function sortArray<T extends number | string>(arr: T[]): T[] {
//     return [...arr].sort((a, b) => {
//         if (a < b) return -1;
//         if (a > b) return 1;
//         return 0;
//     });
// }

// const nums = [55, 1, 5, 2, 42];
// const words = ["olmaaa", "anor", "behi"];

// console.log(sortArray(nums));  // [1, 2, 5, 42, 55]
// console.log(sortArray(words)); // ["anor", "behi", "olma"]

// ------------------------------2.3 masala

// interface DataStore<T> {
//     add(item: T): void;
//     getAll(): T[];
//     remove(id: number): void
// }

// class MyStorage<T> implements DataStore<T> {
//     private items: T[] = []

//     add(item: T): void {
//         this.items.push(item)
//     }

//     getAll(): T[] {
//         return this.items
//     }

//     remove(index: number): void {
//         this.items.splice(index, 1)
//     }
// }

// const stringStore = new MyStorage<string>()

// stringStore.add("TypeScriot o'rganyapman")
// stringStore.add("Generics juda qiziq")

// console.log(stringStore.getAll());
// stringStore.remove(0)
// console.log(stringStore.getAll());

// ------------------------------2.4 masala

// class StorageManager<T> {
//     private items: T[] = []

//     addItem(item: T): void {
//         this.items.push(item)
//     }

//     removeItem(item: T): void {
//         this.items = this.items.filter(i => i !== item)
//     }

//     getCount(): number {
//         return this.items.length
//     }

//     getAll(): T[] {
//         return this.items
//     }
// }

// const number = new StorageManager<number>()
// number.addItem(10)
// number.addItem(20)
// number.addItem(30)
// number.removeItem(20)
// console.log("Sonlar soni:", number.getCount());
// console.log("Qolgan sonlar:", number.getAll());

// const words = new StorageManager<string>()
// words.addItem("TypeScript")
// words.addItem("Generics")
// console.log("So'zlar soni:", words.getCount());

// ------------------------------2.5 masala

// function faqatStringNumber<T extends number | string>(input: T): void {
//     if (typeof input === "number") {
//         console.log("Sonning kradrati:", input *  input);
//     } else {
//         console.log("Matnning uzunligi:", input.length);
//     }
// }

// faqatStringNumber(100)
// faqatStringNumber("Salom")

// ------------------------------2.6 masala

// let arr: number[] = [1, 5, 1, 6, 5, 5, 2, 1]

// function bbc<T>(arr: T[]): T[] | undefined {
//     if (arr.length === 0) return undefined
//     let sum: T[] = []
//     for (let i = 0; i < arr.length; i++) {
//         let item = arr[i]
//         if (item !== undefined) {
//             if (!sum.includes(item)) {
//                 sum.push(item)
//             }
//         }
//     }
//     return sum
// }

// console.log(bbc<number>(arr));

// ------------------------------3.1 masala

// class KeyValueStore<K, V> {
//     private store = new Map<K, V>

//     setValue(key: K, value: V) {
//         this.store.set(key, value)
//     }

//     getValue(key: K): V | undefined {
//         return this.store.get(key)
//     }
// }

// const userStore = new KeyValueStore<number, string>()
// userStore.setValue(1, "Ali")
// userStore.setValue(2, "VAli")

// console.log(userStore.getValue(1));

// ------------------------------3.2 masala

// class Stack<T> {
//     private items: T[] = []

//     push(element: T): void {
//         this.items.push(element)
//     }

//     pop(): T | undefined {
//         return this.items.pop()
//     }

//     peek(): T | undefined {
//         return this.items[this.items.length -1]
//     }

//     isEmpty(): boolean {
//         return this.items.length === 0
//     }
// }

// const stack = new Stack<number>()
// stack.push(10)
// stack.push(20)
// console.log(stack.peek())
// stack.pop()
// console.log(stack.pop())

// ------------------------------3.3 masala

// function groupBy<T, K extends string | number>(
//     array: T[],
//     keySelector: (item: T) => K
// ): Record<K, T[]> {
//     const result = {} as Record<K, T[]>

//     array.forEach(item => {
//         const key = keySelector(item)
//         if (!result[key]) {
//             result[key] = []
//         }
//         result[key].push(item)
//     })
//     return result
// }

// const users = [
//     {name: "Ali", age: 20},
//     {name: "Vali", age: 20},
//     {name: "Gani", age: 25}
// ]

// const groupedByAge = groupBy(users, (u) => u.age)
// console.log(groupedByAge);

// ------------------------------3.4 masala

// function createPair<K, V>(key: K, value: V): {key: K; value: V} {
//     return {
//         key: key,
//         value: value
//     }
// }

// const pair = createPair("ID", 101)
// console.log(pair);

// ------------------------------3.5 masala

// class LimitedArray<T> {
//     private items: T[] = [];
//     private readonly limit: number;

//     constructor(limit: number) {
//         this.limit = limit
//     }

//     add(item: T): void {
//         if (this.items.length >= this.limit) {
//             throw new Error(`Xatolik: Maksimal uzunlik (${this.limit} dan oshib ketdi!)`)
//         }
//         this.items.push(item)
//     }

//     getAll(): T[] {
//         return this.items
//     }
// }

// const myLimit = new LimitedArray<string>(2)
// myLimit.add("Bir")
// myLimit.add("Ikki")
// // myLimit.add("Uch") // buni ochsa limitdan oshdi deb error beradi

// console.log(myLimit);

// ------------------------------4.1 masala

// class Queue<T> {
//     private items: T[] = []

//     enqueue(item: T): void {
//         this.items.push(item)
//     }

//     dequeue(): T | undefined {
//         return this.items.shift()
//     }

//     peek(): T | undefined {
//         return this.items[0]
//     }

//     isEmpty(): boolean {
//         return this.items.length === 0
//     }
// }

// const printerQueue = new Queue<string>()
// printerQueue.enqueue("Document_1.pdf")
// printerQueue.enqueue("Rasm_001.jpg")

// console.log("Navbatda birinchi:", printerQueue.peek());
// console.log("Olib tashlandi:", printerQueue.dequeue());
// console.log("Hozir bo'shmi?", printerQueue.isEmpty());

// ------------------------------4.2 masala

// interface NestedObject<T> {
//     id: number;
//     value: T;
//     children?: NestedObject<T>[]
// }

// const categoryTrue: NestedObject<string> = {
//     id: 1,
//     value: "Elektronika",
//     children: [
//         {
//             id:2,
//             value: "Telefonlar",
//             children: [{id: 3, value: "iPhone"}]
//         }
//     ]
// }

// console.log(categoryTrue);

// ------------------------------4.3 masala

// function filterByType<T>(arr: any[], type: string): T[] {
//     return arr.filter(item => typeof item === type)
// }

// const mixedData = [1, "Salom", 2, "Dunyo", true]
// const stringOnly = filterByType<string>(mixedData, "string")
// console.log(stringOnly);

// ------------------------------4.4 masala

// function getUnique<T>(arr: T[]): T[] {
//     return [...new Set(arr)]
// }

// console.log(getUnique([1, 1, 2, 3, 3, 4]));

// ------------------------------4.5 masala

// class MultiStore<K, V> {
//     private data = new Map<K, V>()

//     save(key: K, value: V): void {
//         this.data.set(key, value)
//     }

//     display(): void {
//         this.data.forEach((v, k) => console.log(`${k} => ${v}`)        )
//     }
// }

// const scoreBoard = new MultiStore<string, number>()
// scoreBoard.save("Ali", 95)
// scoreBoard.save("Vali", 88)
// scoreBoard.display()

