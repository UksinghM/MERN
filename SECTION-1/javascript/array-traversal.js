const nums=[1,2,3,4,5,6,7,8,9,10]
for(let i=0;i<nums.length;i++){
    console.log(nums[i]);
}
for(let num of nums){
    console.log(num**2);
}
nums.forEach((element,index,array) =>{
    console.log(element,index,array);
})
console.log("-------------")
const sqr=[];
nums.forEach((element)=>{
sqr.push(element*element);
})
console.log(sqr);

const evens = [];
nums.forEach((element) => {
    if (element % 2 == 0) {
        evens.push(element);
    }
})
console.log(evens);

const prices=[340,450,678,152,4567];
// store all price greater than 500 in new array
//add 18% gst to all price and store in aarray
//PPPLY DISCOUNT    of 17% on all prices and store in a new array
// find the sum of all price in the array
