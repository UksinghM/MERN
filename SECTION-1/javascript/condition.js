num =0;
if (num%2==0){
    console.log("Even Number");
}else if(num%2!=0){
    console.log("Odd Number");
}else{
    console.log("Not a number");
}

//Answer - 1
let X=5;
if(X>0){
    console.log("position no");
}
else if(X<0){
    console.log("negative no");

}else{
    console.log("zero")
}
//Answer 2
let y=9;
if(y%5==0){
    console.log("divisible be 5");

}else{
    console.log("not divisible by 5");

}
// Answer 3
let a=19;
if(a%5==0&&a%11==0){
    console.log("divisible by 5 as well as 11 too");

}else{
    console.log("not divisible by 5 as well as 11 too");
}

//perfect square or not
num=155;
let sqrt=Math.sqrt(num);
console.log(sqrt);

if(Number.isInteger(sqrt)){
    console.log("perfect Square")
}else{
    console.log("not a perfect Square");
}