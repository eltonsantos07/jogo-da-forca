const palavras = [
  {
    categoria: "animal",
    conteudo: "gato",
  },
  {
    categoria: "animal",
    conteudo: "pato",
  },
  {
    categoria: "animal",
    conteudo: "rato",
  },
  {
    categoria: "animal",
    conteudo: "sapo",
  },
  {
    categoria: "animal",
    conteudo: "coelho",
  },
  {
    categoria: "animal",
    conteudo: "galinha",
  },
  {
    categoria: "animal",
    conteudo: "lobo",
  },
  {
    categoria: "nome de pessoa",
    conteudo: "elton",
  },
  {
    categoria: "nome de pessoa",
    conteudo: "maria",
  },
  {
    categoria: "nome de pessoa",
    conteudo: "roberto",
  },
  {
    categoria: "nome de pessoa",
    conteudo: "carla",
  },
  {
    categoria: "nome de pessoa",
    conteudo: "matheus",
  },
  {
    categoria: "nome de pessoa",
    conteudo: "gisele",
  },
  {
    categoria: "nome de pessoa",
    conteudo: "mario",
  },
  {
    categoria: "nome de pessoa",
    conteudo: "marta",
  },
  {
    categoria: "cor",
    conteudo: "azul",
  },
  {
    categoria: "cor",
    conteudo: "rosa",
  },
  {
    categoria: "cor",
    conteudo: "branco",
  },
  {
    categoria: "cor",
    conteudo: "dourado",
  },
  {
    categoria: "cor",
    conteudo: "bege",
  },
  {
    categoria: "cor",
    conteudo: "roxo",
  },
  {
    categoria: "cor",
    conteudo: "prata",
  },
  {
    categoria: "cor",
    conteudo: "amarelo",
  },
];

var palavra;
var tamanhoPalavra;
var categoriaPalavra = document.getElementById("categoria-palavra");
var listaLetras = [];
var letrasUsadas = [];
var paragrafoLetraUsadas = document.getElementById("letras-usadas");
var inputPalpite = document.getElementById("inputPalpite");
const teclaValida = /^([A-Za-z])/;
var letrasCorretas = document.getElementsByClassName("letra-correta");
var acertos = 0;
var erros = 0;
var maxTentativasErradas = 6;

//Div que irá comportar toda a palavra
var divPalavra = document.getElementById("palavra");
//imagem de traço abaixo das letras da palavra
var img = document.createElement("img");
img.setAttribute("src", "../assets/images/letra.png");

function sortearPalavra() {
  const quantidadePalavras = palavras.length;
  var index = Math.round(Math.random() * quantidadePalavras);
  if (index > palavras.length - 1) {
    index = palavras.length - 1;
  }

  palavra = palavras[index];
  categoriaPalavra.innerHTML = palavra.categoria;

  comporPalavra(palavra.conteudo);
}

function comporPalavra(conteudoPalavra) {
  tamanhoPalavra = conteudoPalavra.length;

  for (let i = 0; i < tamanhoPalavra; i++) {
    listaLetras.push(conteudoPalavra.charAt(i).toUpperCase());
  }

  listaLetras.forEach(function (tipo, indice, conteudo) {
    var divExibicao = document.createElement("div");
    divExibicao.setAttribute("class", "exibicaocaractere");
    divExibicao.setAttribute("id", indice);

    var divLetra = document.createElement("div");
    divLetra.setAttribute("class", "exibicao-letra");
    divLetra.setAttribute("id", "letra" + indice);
    var paragrafo = document.createElement("p");
    paragrafo.setAttribute("class", "letra-correta");
    paragrafo.setAttribute("id", "paragrafo" + indice);
    paragrafo.setAttribute("hidden", "true");
    divLetra.appendChild(paragrafo);
    paragrafo.innerHTML = conteudo[indice];

    var divEspaco = document.createElement("div");
    divEspaco.setAttribute("class", "exibicao-espaco");
    divEspaco.appendChild(img);

    divExibicao.appendChild(divLetra);
    divExibicao.appendChild(divEspaco);

    divPalavra.appendChild(divExibicao.cloneNode(true));
  });
}

function palpite() {
  var letra = inputPalpite.value;
  inputPalpite.value = "";
  inputPalpite.focus();
  validaTecla(letra);
  paragrafoLetraUsadas.innerHTML = letrasUsadas;
}

function validaTecla(letra) {
  letra = letra.toUpperCase();
  if (teclaValida.test(letra) && letra.length == 1) {
    verificaLetra(letra);
  } else {
    alert(
      "Você digitou uma tecla inválida. Se atente em digitar apenas letras, nada de números, símbolos ou acentos."
    );
  }
}

function verificaLetra(letra) {
  if (letrasUsadas.includes(letra)) {
    alert("A letra '" + letra + "' já foi usada.");
  } else {
    letrasUsadas.push(letra);
    verificaAcertos(letra);
  }
}

function verificaAcertos(letra) {
  var palavraAux = palavra.conteudo.toUpperCase();
  var contador = 0;

  if (palavra.conteudo.toUpperCase().includes(letra)) {
    Array.from(letrasCorretas).forEach(function (tipo, indice, conteudo) {
      if (palavraAux.charAt(indice) == letra) {
        conteudo[indice].removeAttribute("hidden");
        contador++;
      }
    });
    acertos += contador;

    if (acertos == tamanhoPalavra) {
      window.location.href = "/vitoria.html";
    }
    alert("Correto! A letra '" + letra + "' faz parte da palavra");
  } else {
    erros += 1;

    if (erros == maxTentativasErradas) {
      window.location.href = "./derrota.html";
    }
    alert("A letra '" + letra + "' não faz parte da palavra :(");
  }
}

function novoJogo() {
  inputPalpite.value = "";
  listaLetras = [];
  letrasUsadas = [];
  paragrafoLetraUsadas.innerHTML = "";
  divPalavra.innerHTML = "";
  sortearPalavra();
  acertos = 0;
  erros = 0;
}

sortearPalavra();
