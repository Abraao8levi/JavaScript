function parOuImpar(numero) {
    if (numero % 2 === 0) {
      return "Par";
    } else {
      return "Ímpar";
    }
  }
  
  console.log(parOuImpar(10)); // Output: Par
  console.log(parOuImpar(7));  // Output: Ímpar
  