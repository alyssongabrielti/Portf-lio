let a = 1;   
let b = -7;
let c = 6;


if (a === 0) {
    console.log("Não é uma equação do segundo grau");
} else {

    let delta = b * b - 4 * a * c;
    console.log("Valor de delta:", delta);

    
    if (delta < 0) {
        console.log("Equação não possui raízes reais.");

    
    } else if (delta === 0) {
        let x = -b / (2 * a);
        console.log("Equação possui apenas uma raiz real:");
        console.log("x =", x);

    
    } else {
        let x1 = (-b + Math.sqrt(delta)) / (2 * a);
        let x2 = (-b - Math.sqrt(delta)) / (2 * a);

        console.log("Equação possui duas raízes reais:");
        console.log("x1 =", x1);
        console.log("x2 =", x2);
    }
}