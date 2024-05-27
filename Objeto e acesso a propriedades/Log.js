let pessoa = {
    nome: "Abraão",
    idade: 21,
    saudacao: function() {
      return "Olá, meu nome é " + this.nome;
    }
  };
  
  console.log(pessoa.saudacao()); // Output: Olá, meu nome é Abraão
  