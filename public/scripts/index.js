
const buttonSearch = document.querySelector("#page-home main a")
//Como no index.html o botao que realiza o search nao tem nome foi preciso 
//pegar  a sua estrutura (#page-home main a)

const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})