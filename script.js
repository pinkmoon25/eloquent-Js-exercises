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
    if(str[i] === 'B') count++;
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
  let n = arr.length;
  for(let i = n-1; i>=0; i--){
    result.push(arr[i]);   
  }
  arr = arr.slice(n).concat(result);
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

//every() array method
function every(array, callback){
  let check = 0;
  for (let item of array) {
    if (callback(item)) check ++;
  }
  if(check == array.length) return true;
  else return false;
};
