function addNum(a,b){
    c=a+b;
    console.log(c);

}
addNum(2,3);
const getAvg=function(m1,m2,m3){
    const avg=(m1+m2+m3)/3;
    return avg;
}
const avg=getAvg(10,20,30);
console.log(avg);

const factorial = (n) => {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact = fact * i;
    }
    return fact;
};

const f = factorial(5); // Calculates 5! (5 factorial)
console.log(f); // Output: 120