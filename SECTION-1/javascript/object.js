const user={
    name:"john",
    email:"usingh0811@gmail.com",
    password:"xyz@123"
};
console.log(user);
console.log(user.name);
console.log(user.email);
user.password="abc123"
console.log(user);
console.log(Object.values(user));
user.address="123 main st";
console.log(user);

const smartphone={brand:"apple",
model:"galaxy s25",
price:999,
color:["black","white","blue"],
}
console.log(smartphone.color[2]);