const nomeAluno = document.getElementById("nome-aluno");
const numMatricula = document.getElementById("matricula-aluno");

const notaB1 = document.getElementById("nota-B1");
const notaB2 = document.getElementById("nota-B2");
const notaB3 = document.getElementById("nota-B3");
const notaB4 = document.getElementById("nota-B4");

const pSection = document.getElementById("media-section");

const corpoTabela = document.getElementById("corpo-tabela");
const tabelaNotas = document.getElementById("tabela-notas");

let turma = [];
let newEntries= []; 

function Aluno(matricula, nome, nota1, nota2, nota3, nota4, media, situacao){
    this.matricula = matricula;
    this.nome = nome;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
    this.nota4 = nota4;
    this.media = media;
    this.situacao = situacao;
}

function cadastroAluno(){
    if(nomeAluno.value == '' || numMatricula.value == '' || notaB1.value == '' || notaB2.value == '' || notaB3.value == '' || notaB4.value == ''){
        alert("Insira todos os dados para cadastrar um novo aluno!");
    }
    else if(Number(notaB1.value) < 0 || Number(notaB1.value) > 10 || Number(notaB2.value) < 0 || Number(notaB2.value) > 10 || Number(notaB3.value) < 0 || Number(notaB3.value) > 10 || Number(notaB4.value) < 0 || Number(notaB4.value) > 10){
        alert("Insira apenas notas entre 0 e 10.")
    }
    else{
        let found = false;
        for(k = 0; k < turma.length; k++){
            if(numMatricula.value == turma[k].matricula){
                found = true;
                alert(`Matrícula ${numMatricula.value} já cadastrada! Confira os dados inseridos.`);
                break;
            }
        }
        if(found == false){
            let mediafinal = ((Number(notaB1.value) + Number(notaB2.value) + Number(notaB3.value) + Number(notaB4.value))/4).toFixed(2);
            let situacao = null; 
            if(mediafinal >= 7)
                situacao = "Aprovado"
            else
                situacao = "Reprovado"
            let novoAluno = new Aluno(numMatricula.value, nomeAluno.value, notaB1.value, notaB2.value, notaB3.value, notaB4.value, mediafinal, situacao)
            turma.push(novoAluno);
            newEntries.push(novoAluno);
        }
    }
    numMatricula.value = null;
    nomeAluno.value = null;
    notaB1.value = null;
    notaB2.value = null;
    notaB3.value = null;
    notaB4.value = null;   
}


function setTabelaNotas(){
    if(turma.length < 15){
        alert("Necessário 15 alunos no mínimo.")
    }
    else{
        var maiorNota = Math.max.apply(Math, turma.map(o => o.media));
        if(document.getElementById("tabela-notas").rows.length == 0){  
            let sectionTitle = document.createElement('H3');
            let sectionTitleText = document.createTextNode("Médias Finais");
            let cabecalho = ["Matrícula","Nome","1º Bimestre", "2º Bimestre", "3º Bimestre","4º Bimestre","Média Final","Situação"];
            let headTabela = document.createElement('THEAD');
            let trHead = document.createElement("TR");
            for(h = 0; h < cabecalho.length; h++){
                let th = document.createElement("TH");
                let thText = document.createTextNode(cabecalho[h]);
                th.appendChild(thText);
                trHead.appendChild(th);
            }
            sectionTitle.appendChild(sectionTitleText);
            pSection.appendChild(sectionTitle);
            headTabela.appendChild(trHead);
            tabelaNotas.appendChild(headTabela);
        }
    
        if(newEntries.length == 0){
            alert("Não foram cadastrados novos alunos.");
        }
        else{
            for(i = 0; i < newEntries.length; i++){
                let trx = document.createElement("TR");
                for(chave in newEntries[i]){
                    let td = document.createElement("TD");
                    let tdText = document.createTextNode(newEntries[i][chave]);
                    td.appendChild(tdText);
                    trx.appendChild(td);
                }
                corpoTabela.appendChild(trx);
            }
            tabelaNotas.appendChild(corpoTabela);
            newEntries = [];
        }
    }
    searchTable(maiorNota, corpoTabela);
}

function searchTable(value, table) {
    tr = table.getElementsByTagName("tr")
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")
        if(td[7].innerText == "Aprovado"){
            td[7].style.color = "green"
        }
        else{
            td[7].style.color = "red"
        }
        if (td[6].innerText == value && td[7].innerText == "Aprovado") {
            td[6].style.fontWeight = "700"
        }
        else{
            td[6].style.fontWeight = "400"
        } 
    }
}
