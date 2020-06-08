const express = require("express")
const server = express()

//pegar o banco de dados que foi exportado do db.js
const db = require("./database/db.js")

// donfigurar pasta public onde estao as pastas (assets, scripts, styles)
server.use(express.static("public")) 


//utilizando template engine
//ou seja vai pegar o ("nunjucks") da pasta node_modules
const nunjucks = require("nunjucks") 
//verifica em qual pasta estao os arquivos .html e qual servidor
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação
//pagina inicial 
//req: Requisição, ou seja solicita alguma coisa
//res: Resposta
server.get("/", (req, res) => {
   return res.render("index.html", {title : "Um titulo para teste"}) // renderiza o caminho da página pq o nunjucks foi instalado

   // res.sendFile(__dirname + "/views/index.html" ) //envia o caminho da pagina
// o __dirname pega o caminho da pasta ate o src
})

//chamada da rota da pagina create-point
server.get("/create-point", (req, res) => {
    console.log(req.query)
    return res.render("create-point.html")  // renderiza o caminho da página pq o nunjucks foi instalado
    //res.sendFile(__dirname + "/views/create-point.html" ) //envia o caminho da pagina
})

//chamada do post no create-point
server.post("/savepoint", (req, res) => {
    return res.send("ok")
})

//chamada da rota da pagina search-results
server.get("/search-results", (req, res) => {
//pegar os dados do banco de dados 
db.all(`SELECT * FROM places`, function(err, rows){
    if(err) {
        return console.log(err)
    }
    
    console.log("Aqui estão seus registros:")
    console.log(rows)

    const total = rows.length

    // mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", {places : rows, total: total} ) 
   // res.sendFile(__dirname + "/views/search-results.html" ) //envia o caminho da pagina
    
    })


    
})


//ligar o servidor 
server.listen(3000)