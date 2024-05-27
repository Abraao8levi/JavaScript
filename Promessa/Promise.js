let promessa = new Promise(function(resolve, reject) {
    let sucesso = true;
    if (sucesso) {
      resolve("A promessa foi cumprida!");
    } else {
      reject("A promessa foi rejeitada.");
    }
  });
  
  promessa.then(function(mensagem) {
    console.log(mensagem);
  }).catch(function(mensagem) {
    console.log(mensagem);
  });
  