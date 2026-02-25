//Criar uma calculadora de impostos.
 
//A calculadora precisa conter 3 variáveis: uma que recebe um preço de um produto(em decimal, por favor), uma que informe se o produto tem direito a desconto (desconto de 10%), e o ICMS (que pode variar entre 12 e 25%)
 
//O ICMS deverá ser calculado após o produto receber (ou não desconto). 
 
//O progama deverá retornar o valor do produto original, se ele teve desconto, o valor do produto com desconto e o valor do produto com o imposto aplicado. 
 
//Pra tornar as coisas mais interessantes, como o valor do imposto é variável, vamos brincar de loteria e deixar o valor do imposto randômico (entre os valores informados.... 12 a 25%)


let PrecoSemDesconto = 10.00; 
let TemDesconto = true;         


if (PrecoSemDesconto <= 0) {
    console.log("Erro: O preço do produto deve ser maior que zero.");
} else {

    console.log("Valor original R$", PrecoSemDesconto.toFixed(2));

    
    let ComDesconto = PrecoSemDesconto;

    if (TemDesconto) {
        ComDesconto = PrecoSemDesconto * 0.90; // 10% desconto
        console.log("Teve desconto? Sim (10%)");
    } else {
        console.log("Teve desconto? Não");
    }

    console.log("Valor com desconto R$", ComDesconto.toFixed(2));

    
    let icmsPercentual = Math.random() * (25 - 12) + 12;

    
    let imposto = ComDesconto * (icmsPercentual / 100);

    let valorFinal = ComDesconto + imposto;

    console.log("ICMS aplicado:", icmsPercentual.toFixed(2) + "%");
    console.log("Valor do ICMS R$", imposto.toFixed(2));
    console.log("Valor final com imposto R$", valorFinal.toFixed(2));
}