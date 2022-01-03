var linhaEdit = "";

function cadastrarAluno() 
{
    //caso a variável com linha a ser editada esteja setada, não roda a inclusão de novo registro
    if (linhaEdit != "")
    {
        alert("Termine a edição antes de inserir um novo registro")
    }
    else
    {
        // busca dados do formulário
        var nome = document.getElementById('nome').value;
        var telefone = document.getElementById('tel').value;
        var dataNasc = document.getElementById('data').value;
        var nota = document.getElementById('nota').value;
        var editar = "<input type='button' value='Editar' onclick='enviaParaFormulario(this)'>";
        var excluir = "<input type='button' value='Excluir' onclick='excluir(this)'>";
        var dataInclusao = Date();
        var dataEdicao = dataInclusao;

        //verifica se os dados foram preenchidos. não faz nada se houver dados vazios
        if (nome == "" || telefone == "" || dataNasc == "" || nota == "") alert("Preencha todos os dados");
        //verifica se data maior do que 1/1/1900
        else if (dataNasc < '1900-01-01') alert ("Data deve ser posterior a 01/01/1900");
        //verifica se a nota está entre 0 e 10
        else if (nota < 0 || nota > 10) alert("Nota deve ser um número entre 0 e 10");

        else
        {
            // busca tabela
            var tabela = document.getElementById('tabela');

            //verifica o número de colunas
            var linhas = document.getElementById('tabela').rows.length;
            
            //cria linha no final
            var linha = tabela.insertRow(linhas);

            //realça as linhas ao passar o mouse sobre elas
            linha.onmouseover = function() {realce(linha)};
            linha.onmouseout = function () {desrealce(linha)};
                
            //cria as células
            cell1 = linha.insertCell(0);
            cell2 = linha.insertCell(1);
            cell3 = linha.insertCell(2);
            cell4 = linha.insertCell(3);
            cell5 = linha.insertCell(4);
            cell6 = linha.insertCell(5);
            cell7 = linha.insertCell(6);
            cell8 = linha.insertCell(7);
            
            //insere os dados
            cell1.innerHTML = nome;
            cell2.innerHTML = telefone;
            cell3.innerHTML = dataNasc;
            cell4.innerHTML = nota;
            cell5.innerHTML = editar;
            cell6.innerHTML = excluir;
            cell7.innerHTML = dataInclusao;
            cell8.innerHTML = dataEdicao;
            
            alert("Registro inserido com sucesso");

            limparCampos()
        }   
    }
}

function enviaParaFormulario(txtCelula)
{
    // cria um array com todas as celulas da linha a ser editada. 
    // txtCelula é o conteúdo da celula com o botão editar, o primeiro parentNode remete à célula, o segundo remete à linha.   
    var celulas = txtCelula.parentNode.parentNode.childNodes;
    
    //cria um array vazio para armazenagem dos dados
    var aluno = [];
    
    // percorre o array celulas até a coluna com a nota (4a coluna)
    for (var i = 0 ; i < 4 ; i++ )
    {
        aluno[i] = celulas[i].innerHTML;
    }

    document.getElementById('nome').value = aluno[0];
    document.getElementById('tel').value = aluno[1];
    document.getElementById('data').value = aluno[2];
    document.getElementById('nota').value = aluno[3];
   
    //salva a linha que vai ser editada em uma variável global
    // txtCelula é o conteúdo da celula com o botão editar, o primeiro parentNode remete à célula, o segundo remete à linha.  
    linhaEdit = txtCelula.parentNode.parentNode;
}

function editarAluno()
{
    //caso a variável com linha a ser editada NÃO esteja setada, não roda a edição de registro
    if (linhaEdit == "")
    {
        alert("Selecione o registro a ser editado")
    }
    else
    {
        //busca os dados no formulário
        var nome = document.getElementById('nome').value;
        var telefone = document.getElementById('tel').value;
        var dataNasc = document.getElementById('data').value;
        var nota = document.getElementById('nota').value;
    
        linhaEdit.cells[0].innerHTML = nome;
        linhaEdit.cells[1].innerHTML = telefone;
        linhaEdit.cells[2].innerHTML = dataNasc;
        linhaEdit.cells[3].innerHTML = nota;
        //altera a data de edição
        linhaEdit.cells[7].innerHTML = Date();
    
        limparCampos();
        alert("Registro editado com sucesso");
        //limpa a variável global com a linha a ser editada
        linhaEdit = "";
    }

}

function limparCampos()
{
    //limpa os campos do formulário
    document.getElementById('nome').value = "";
    document.getElementById('tel').value = "";
    document.getElementById('data').value = "";
    document.getElementById('nota').value = "";
}

function excluir(txtCelula)
{ 
    // pede confirmação do usuário para exclusão. não faz nada caso o usuário cancele a operação
    if (confirm("Tem certeza que deseja excluir esse registro?"))
    {
        var linha = txtCelula.parentNode.parentNode.rowIndex;
        document.getElementById("tabela").deleteRow(linha);
        linhaEdit = "";  // garante que a variável que indica edição será limpa
        limparCampos();
        alert("Registro excluído com sucesso");
    }
}

function realce(linha)
{
    linha.style.backgroundColor = "lightgray";
}

function desrealce(linha)
{
    linha.style.backgroundColor = "";
}