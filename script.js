// Definição dos dados (JSON)

const catalogo = [
    {
        id: 1,
        titulo: "Interestelar",
        tipo: "filme",
        ano: 2014,
        generos: ["Ficção Científica", "Drama", "Aventura"],
        nota: 10.0,
        assistido: true
    },
    {
        id: 2,
        titulo: "Grey's Anatomy",
        tipo: "serie",
        ano: 2008,
        generos: ["Medico", "Drama", "Romance"],
        nota: 9.5,
        assistido: true
    },
    {
        id: 3,
        titulo: "O Poço",
        tipo: "filme",
        ano: 2019,
        generos: ["Terror", "Ficção Científica", "Suspense"],
        nota: 9.0,
        assistido: true
    },
    {
        id: 4,
        titulo: "Stranger Things",
        tipo: "serie",
        ano: 2016,
        generos: ["Terror", "Fantasia", "Drama"],
        nota: 10.0,
        assistido: true
    },
    {
        id: 5,
        titulo: "Pulp Fiction",
        tipo: "filme",
        ano: 1994,
        generos: ["Crime", "Drama"],
        nota: 8.9,
        assistido: false
    },
    {
        id: 6,
        titulo: "The Bear",
        tipo: "serie",
        ano: 2022,
        generos: ["Comédia", "Drama"],
        nota: 8.6,
        assistido: true
    }
];

//Acesso e leitura dos dados

//Para confirmar a estrutura
console.log(catalogo);

//Título do primeiro item
console.log("Título do primeiro item:", catalogo[0].titulo);

//Ano do último item 
// (.length - 1 para pegar sempre o último)
console.log("Ano do último item:", catalogo[catalogo.length - 1].ano);

//Segundo gênero do terceiro item (quando existir)
const terceiroItem = catalogo[2];
const segundoGenero = terceiroItem.generos[1]; // Índice 1 é a segunda posição

if (segundoGenero) {
    console.log("Segundo gênero do terceiro item:", segundoGenero);
} else {
    console.log("O terceiro item possui apenas um gênero cadastrado.");
}

//Iterações com iterators (tarefas)

// A) Listagem com forEach
console.log("--- Listagem de Títulos ---");
catalogo.forEach(item => {
    console.log(`- [${item.tipo}] ${item.titulo} (${item.ano})`);
});

// B) Transformação com map
const titulosEmCaixaAlta = catalogo.map(item => item.titulo.toUpperCase());
console.log("Títulos em Caixa Alta:", titulosEmCaixaAlta);

// C) Seleção com filter
const naoAssistidos = catalogo.filter(item => item.assistido === false);
console.log(`Existem ${naoAssistidos.length} itens não assistidos.`);

// D) Busca com find
const notaAlta = catalogo.find(item => item.nota >= 9);

if (notaAlta) {
    console.log(`Destaque: ${notaAlta.titulo} (Nota: ${notaAlta.nota})`);
} else {
    console.log("Nenhum item com nota superior a 9 encontrado.");
}

// E) Agregação com reduce
// Média de todas as notas
const somaNotasTotal = catalogo.reduce((acumulador, item) => acumulador + item.nota, 0);
const mediaGeral = somaNotasTotal / catalogo.length;

// Média apenas dos assistidos
const assistidos = catalogo.filter(item => item.assistido); // Filtra primeiro
const somaNotasAssistidos = assistidos.reduce((acumulador, item) => acumulador + item.nota, 0);
const mediaAssistidos = assistidos.length > 0 ? somaNotasAssistidos / assistidos.length : 0;

console.log(`Média geral: ${mediaGeral.toFixed(2)}`);
console.log(`Média dos assistidos: ${mediaAssistidos.toFixed(2)}`);

// F) Checagens com some e every
const temAntigo = catalogo.some(item => item.ano < 2000);
const todosComGenero = catalogo.every(item => item.generos.length >= 1);

console.log(`Existe algum item anterior ao ano 2000? ${temAntigo ? "Sim" : "Não"}`);
console.log(`Todos possuem pelo menos um gênero? ${todosComGenero ? "Sim" : "Não"}`);

// B.4. Saída na tela (DOM simples)

// 1. Cálculos necessários
const totalItens = catalogo.length;
const totalFilmes = catalogo.filter(item => item.tipo === "filme").length;
const totalSeries = catalogo.filter(item => item.tipo === "serie").length;
const totalNaoAssistidos = catalogo.filter(item => !item.assistido).length;

// Média geral (reutilizando a lógica anterior)
const mediaGeralNotas = catalogo.reduce((acc, item) => acc + item.nota, 0) / totalItens;

// 2. Criando o Ranking (Top 3)
// Usamos o spread operator [...] para criar uma cópia e não modificar o array original
const ranking = [...catalogo]
    .sort((a, b) => b.nota - a.nota) // Ordena do maior para o menor
    .slice(0, 3); // Pega apenas os 3 primeiros

// 3. Referenciando a div de saída
const output = document.getElementById('output');

// 4. Injetando o conteúdo no HTML com innerHTML
output.innerHTML = `
    <h2>Resumo do Catálogo</h2>
    <p><strong>Total de itens:</strong> ${totalItens}</p>
    <ul>
        <li>Filmes: ${totalFilmes}</li>
        <li>Séries: ${totalSeries}</li>
    </ul>
    <p><strong>Não assistidos:</strong> ${totalNaoAssistidos}</p>
    <p><strong>Média Geral:</strong> ${mediaGeralNotas.toFixed(2)}</p>

    <h3>🏆 Top 3 Melhores Avaliados</h3>
    <ol>
        ${ranking.map(item => `<li>${item.titulo} - Nota: ${item.nota}</li>`).join('')}
    </ol>
`;