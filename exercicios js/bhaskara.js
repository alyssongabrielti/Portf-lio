let a =1;   
let b = -7;
let c = 6;

let delta = b * b -4 * a * c;

let x1 = (-b + Math.sqrt(delta)) / (2 * a);
let x2 = (-b - Math.sqrt(delta)) / (2 * a);

console.log("valor x1", x1);
console.log("valor x2", x2);