

function apagar(){
    if(confirm("Você deseja apagar esse jogo?")==0){
        window.location.replace("index.html");
        return;
    }
    fetch(`http://localhost:5000/jogo/apagar/${window.location.search.substring(4
    
    
    )}`,

   
    {
        method:"DELETE",
        headers:{
            accepts:"application/json",
            "content-type":"application/json"
        }
    }
    ).catch((erro)=> console.error(`Erro -> ${erro}`));
}

function carregarDadosAPI(){


    fetch("http://localhost:5000/jogo/listar")
    .then((response)=>response.json())
    .then((resultado)=>{
        
        var linha = `<div class="row justify-content-md-center">`;

        resultado.output.map((itens,ix)=>{
           

      linha+=`<div class="card col-4" >
        <img src=${itens.foto} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${itens.nomejogo}</h5>
            <p class="card-text">${itens.descricao}</p>
            <p class="card-text">${itens.preco}</p>
         </div>

         <div class="card-footer">
             <small class="text-muted">
                <a href="atualizar.html?id=${itens.idjogos}">Atualizar</a>
                
             </small>
        </div>
        </div>`;







        });

        linha+="</div>";

        document.getElementById("conteudo").innerHTML=linha;

    })
    .catch((erro)=>console.error(`Erro ao carregar a API ->${erro}`))

}


function cadastrar(){
    var nome = document.getElementById("txtNomeJogo").value;
    var descricao =document.getElementById("txtDescricao").value;
    var preco = document.getElementById("txtPreco").value;
    var foto = document.getElementById("txtFoto").value;

    fetch("http://localhost:5000/jogo/cadastro",{
        method:"POST",
        headers:{
            accepts:"application/json",
            "content-type":"application/json"
        },
          body:JSON.stringify({
            nomejogo:nome,
            descricao:descricao,
            preco:preco,
            foto:foto
          })  
        
    })
    .then((response)=>response.json())
    .then((dados)=>{
        alert(`Dados cadastrados com sucesso!\n Id gerado ${dados.output.insertId}`);

        document.getElementById("txtNomeJogo").value;
        document.getElementById("txtDescricao").value;
        document.getElementById("txtPreco").value;
        document.getElementById("txtFoto").value;
    })
    .catch((erro)=>console.error(`Erro ao cadastrar -> ${erro}`))
}

function carregarAtualizar(){

    /*Obter o id passado na barra de endereço */

    var id = window.location.search.substring(4);
    /*Vamos fazer uma busca para receber o produto específico e carregar o formul´rio com dados  */
    fetch(`http://localhost:5000/jogo/atualizar/${id}`)
    .then((response)=>response.json())
    .then((dados)=>{
        console.log(dados);
        document.getElementById("txtNomeJogo").value = dados.output[0].nomejogo;
        document.getElementById("txtDescricao").value = dados.output[0].descricao;
        document.getElementById("txtPreco").value = dados.output[0].preco;
        document.getElementById("txtFoto").value = dados.output[0].foto;
    })
    .catch((erro)=>console.error(`Erro ao carregar a api -> ${erro}`));
}

function atualizar(){

    if(confirm("Você deseja atualizar este produto!")==0){
        return; 
    }

    var id = window.location.search.substring(4);

    var nome = document.getElementById("txtNomeJogo").value;
    var descricao =document.getElementById("txtDescricao").value;
    var preco = document.getElementById("txtPreco").value;
    var foto = document.getElementById("txtFoto").value;

    fetch(`http://localhost:5000/jogo/atualizar/${id}`,{
        method:"PUT",
        headers:{
            accepts:"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nomejogo:nome,
            descricao:descricao,
            preco:preco,
            foto:foto
        })
    })
        .then((response)=>response.json())
        .then((dados)=>{
            alert(dados.output.message);
        })
   .catch((erro)=>console.error(`Erro ao tentar acessar a api -> ${erro}`))
}






