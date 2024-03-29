const Scripts = require('./data/scriptObject');
//chapter functions Exercises

//find minimum
function minimum(...args){
  let min = args[0];
  for(let i=0; i<args.length; i++){
    if(args[i]< min) min = args[i];
  }
  return min;
};

//recursive check for even number
function isEven(n){
  if(n ===0) return true;
  else if(n < 0) {
    n = n * -1;
    return(isEven(n));
  }
  else if(n === 1) return false;
  else if(n-2 === 1) return false;
  else if(n-2 === 0) return true;
  else return isEven(n-2);
};

//counting B character in a string
function countBs(str){
  let count = 0;
  for(let i=0; i<str.length; i++){
    if(str[i] === 'B' || str[i] === 'b') count++;
  }
  return count;
};

//counting a particular character in a string
function countChar(string, char){
  let count = 0;
  for(let i=0; i<string.length; i++){
    if(string[i] === char) count++;
  }
  return count;
};

// print range with a step
function range(start, end, step = 1){
  let result = [];
  let startNum = start;
  let endNum  = end;

  if(end<start){
    startNum = end;
    endNum = start;
  }
  if(step < 0){
  for(let i= endNum; i>= startNum; i += step){
    result.push(i);
  }
  }
  else{
    for(let i= startNum; i<= endNum; i += step){
      result.push(i);
    }
  }
  return result;
};

//sum of a range which return an array
//sum(range(1,5));
function sum(arr){
  let total = 0;
  for(let i=0; i<arr.length; i++){
    total += arr[i];
  }
  return total;
};

//reverse array
function reverseArray(arr){
  let result = [];
  for(let i = arr.length-1; i>=0; i--){
    result.push(arr[i]);   
  }
  return result;
};

//modify and reverse a given array
function reverseGivenArr(arr){
  let n = arr.length
  let count = 0;
  for(let i=n-1; i>=Math.floor(n/2); i--){
    let temp = arr[count];
    arr[count] = arr[i];
    arr[i] = temp;
    count++;
  }
  return arr;
};

//array to list
function arrayToList(arr){
let list = null;
for(let i=arr.length-1; i>=0; i--){
  list = {
    value: arr[i],
    rest: list
  }
}
return list;
};

//flatten array of arrays to a single array with reduce
function flatten(array){
  return array.reduce((a=[], b)=> a.concat(b))
};

//every() array method using for loop
function every(array, callback){
  let check = 0;
  for (let item of array) {
    if (callback(item)) check ++;
  }
  if(check == array.length) return true;
  else return false;
};

//every() array method using method some()
function everyWithSome(array, callback){
    if(array.some((item) => !callback(item))) return false;
    else return true;
};

//your own for loop
function loop(n, test, update, mainFunction){
  for(let i=n; i>0; i--){
    if(test(i)) {
      mainFunction(i)
      update(n)
    }
    else return false
  }
};


//function that computes dominant direction in a string of text
//run in node to check
function writingDirection(text) {
  let direction = '';
  const scriptNames = [];
  let count=1;
  const countArr = [];
  for(let element of text){
    const char = element.codePointAt(0);
    for(let script of Scripts){
      if(script.ranges.some(([from, to])=>{
        return char>=from && char < to;
      })){
        scriptNames.push(script.name);
      }
    }
  }
  scriptNames.map((char, index)=>{
    if(char === scriptNames[index + 1]){
      count ++;
    }
    else{
      countArr.push({name: char, count})
      count = 1
    }
  });

  for(let i=0;i<countArr.length;i++){
    for(let j=i+1;j<countArr.length;j++){
    if(countArr[i].name===countArr[j].name){
      countArr[i].count+=countArr[j].count;
      countArr.splice(countArr.indexOf(countArr[j]), 1)
    }
    } 
  }
  let max = countArr[0].count
  let result = countArr.filter(x => {
    if(x.count > max) max = x.count
    return x.count == max;    
  })
  for(let item of result){
   direction = Scripts.filter(script=>{
    if(item.name == script.name){
      return script.direction 
    }  
  })
  }
  return direction[0].direction;
};

// console.log(writingDirection('英国的狗说"woof", 俄罗斯的狗说"тяв"'));

//chapter "The secret life of objects"

//Vector class
class Vector{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  plus({x, y}){
    return new Vector(x+this.x, y+this.y);
  }
  
  minus({x, y}){
    return new Vector(this.x-x, this.y-y);
  }

  get length(){
    let distance = Math.sqrt(this.x*this.x + this.y*this.y);
    return distance;
  }
};

//Create Group class with functionalities of "Set" data structure
class Group {
  constructor(){
    this.content = []
  }
  add(value){
    if(this.content.every(x => x !== value)) this.content.push(value);
  }

  delete(value){
    return this.content =  this.content.filter(x => x !== value);
  }

  has(value){
    return this.content.some(x => x === value);
  }
  static from(value){
    let group = new Group;
    for(let element of value){
      group.add(element);
    }
    return group;
  }

  [Symbol.iterator] = ()=> new IterableGroup(this);

};
//iterable group class
class IterableGroup{
  constructor(group){
    this.group = group;
    this.size = 0;
  }

  next(){
    if(this.size >= this.group.content.length) return {done: true};
    else {
      let result = {value: this.group.content[this.size], done: false}
      this.size++;
      return result;
    }    
  }
}

//Project: A robot
//village roads connection
const roads = [
  "Alice_House-Bob_House", "Alice_House-Cabin", "Alice_House-Post_Office", "Bob_House-Town_hall",
  "Daria_House-Ernie_House", "Daria_House-Town_hall", "Ernie_House-Grete_House", "Grete_House-Farm",
  "Grete_House-Shop", "Market-Farm", "Market-Post_Office", "Market-Shop",
  "Market-Town_hall", "Shop-Town_hall"
];

function buildGraph(edges){
  const graph = Object.create(null);
  function addEdge(from, to){
    if(graph[from] == null) graph[from] = [to];
    else graph[from].push(to);
  }
  for(let edge of edges){
    [start, end] = edge.split('-');
    addEdge(start, end);
    addEdge(end, start);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
// console.log(roadGraph);

//village state : robot's location, parcels(parcel's location, parcel's destination)
class VillageState {
  constructor(robLocation, parcels){
    this.robLocation = robLocation;
    this.parcels = parcels;
  }
  moveAndDeliver(destination){
    if(roadGraph[this.robLocation].includes(destination)){
      let parcels = this.parcels.map(p => {
        if(p.currLocation != this.robLocation) return p;
        else {
          return{currLocation: destination, addressTo: p.addressTo}
        }
      }).filter(p => p.currLocation != p.addressTo);

      return new VillageState(destination, parcels);
    }
    else return this;
  }
}

let first = new VillageState(
  "Post_Office",
  [{currLocation: "Post_Office", addressTo: "Alice_House"}]
);

let next = first.moveAndDeliver("Alice_House");

// console.log(first);
// console.log(next);

//random robot simulation
function randomPick(array){
  return array[Math.floor(Math.random()*array.length)];
}

function randomRobot(state){                                    //no memory for random bot
  return {direction: randomPick(roadGraph[state.robLocation])}
}

function sendRobot(state, robot, memory){
  for(let turns = 0;;turns++){
    if(state.parcels.length === 0){
      console.log(`Finished in ${turns} turns`);
      break;
    }
    let robAction = robot(state, memory); 
    state = state.moveAndDeliver(robAction.direction);
    memory = robAction.memory;
    console.log(`Moved to ${robAction.direction}`);
  }
}

//create state with random packages
VillageState.random = (parcelCount = 5) => {
  let parcelToDeliever = [];
  for(let i=0; i< parcelCount; i++){
    let addressTo = randomPick(Object.keys(roadGraph));
    let currLocation;
    do{
      currLocation = randomPick(Object.keys(roadGraph));
    } while(currLocation == addressTo);
    parcelToDeliever.push({currLocation, addressTo});
  }
  return new VillageState('Post_Office', parcelToDeliever);
}

console.log(sendRobot(VillageState.random(), randomRobot));

//A mail route starting from the post office
const mailRoute = [
  "Alice_House", "Cabin", "Alice_House", "Bob_House",
  "Town_hall", "Daria_House", "Ernie_House",
  "Grete_House", "Shop", "Grete_House", "Farm",
  "Market", "Post_Office"
];

function mailRouteRobot(state, memory){  //keeps track of memory at every turn
  if(memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) }
};

console.log(sendRobot(VillageState.random(), mailRouteRobot, []));
