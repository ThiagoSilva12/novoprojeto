//importar o módulo express
const express = require("express");
//importar o módulo mysql
const mysql = require("mysql");
//importar o módulo cors
const cors =  require("cors");

const app = express();
//Teste de rota usando a arquitetura http como GET,POST,PUT,DELETE

app.use(express.json());

app.use(cors());
/* 
estabelece a conexão com o banc de dados e realizar um CRUD na base
*/
const jogos = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"dbjogos"

});
/*
Testar e estabelecer a conexão com o banco de dados
*/
jogos.connect((erro)=>{
    if(erro){
        console.error("Erro ao tentar estabelecer a conexão" +erro.stack);
        return;
    }
    console.log("Conectado ao Banco" +jogos.threadId);
})

//rota para o metodo GET
app.get ("/jogo/listar", (req,res)=>{

//consultar sql para selecinar os jogos no banco de dados
jogos.query("select * from tbjogos",(erro,resultado)=>{
    if(erro){
return res.status(500).send({output:"Erro ao tentarexecutar a consulta",erro});
    }
res.status(200).send({output:resultado});
    })
});

//rota para o metodo GET, buscando apenas um produto
app.get("/jogo/buscar/:id",(res,req)=>{
    jogos.query("select * from tbjogos where idjogos=?" , [req.params.id],(erro,resultado)=>{
        if(erro){
            return res.status(500).send({output:`Erro ao tentar executar a consulta ${erro}`});
        }
        if(resultado==null || resultado == ""){
            return res.status(404).send({output:`Não foi possivel localizar esse jogo`});
        }
        res.status(200).send({output:resultado});
    })
});

// rota para método POST

app.post("/jogo/cadastro",(res,req)=>{
    jogos.query("insert into tbjogos set ?", [req.body], (erro,resultado)=>{
        if(erro){
            res.status(500).send({output:`Não foi possivel cadastrar -> ${erro}`});
            return;
        }
        res.status(201).send({output:resultado});
    });
});

//rota para o método PUT
app.put("/jogo/atualizar/:id" , (req,res)=>{
    jogos.query("update tbjogos set ? where idjogos=?",[req.body,req.params.id],(erro,resultado)=>{
        if(erro){
            res.status(500).send({output:`Erro ao tenatr atualizar os dados -> ${erro}`});
            return;
        }
        res.status(200).send({output:resultado});
    });
});
//rota para o método DELETE
app.delete("/jogo/apagar/:id", (req,res)=>{
    jogos.query("delete from tbjogos where idjogos = ?" , [req.params.id],(erro,resultado)=>{
        if(erro){
            res.status(500).send({output:`Erro ao tentar apagar este jogo -> ${erro}`});
            return;
        }
        res.status(204).send({output:resultado});
    });
});






app.listen("5000", ()=>console.log("Servidor online em http://localhost:5000"))

module.exports = app

