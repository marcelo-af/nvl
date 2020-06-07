//Para acessar o campo UF
//document.querySelector("select[name=uf]")
//.addEventListener("change", () => {console.log("mudei") })

//colocando a api UF dentro do campo Estado
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then((res) => {return res.json() } ) 
  .then(states => {
      for(const state of states)
      ufSelect.innerHTML =  ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
  }) 
}

populateUFs()



//colocando a api Cidades/Municipios dentro do campo Cidade
function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput= document.querySelector("input[name=state]")

const ufValue = event.target.value

const indexOfSelectedState = event.target.selectedIndex
stateInput.value = event.target.options[indexOfSelectedState].text

const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


//Para limpar a cidade e bloquear o campo (cidade) caso volte a selecionar o campo Estado
citySelect.innerHTML = "<option value>Selecione a cidade</option>"
citySelect.disabled = true 


fetch(url)
.then((res) => {return res.json() } ) 
.then(cities => {
    for(const city of cities){
        citySelect.innerHTML =  citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
    }
        
    
    
    citySelect.disabled = false
}) 


}


document.querySelector("select[name=uf]")
.addEventListener("change", getCities)

//itens de coleta 
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma classe com javascript
   //geralmente o toggle serve para adicionar ou remover classe no javascript
    itemLi.classList.toggle("selected")

    //pega o item selecionado
    const itemId = itemLi.dataset.id


    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados 

    const alreadySelected = selectedItems.findIndex( item => {
const itemFound = item == itemId //isso sera true ou false
return itemFound
    })

//se ja estiver selecionado,
if(alreadySelected >= 0){
    //tirar da selecao
    const filteredItems = selectedItems.filter( item => {
        const itemIsDifferent = item != itemId //false
        return itemIsDifferent
    })

    console.log(filteredItems)
    selectedItems = filteredItems   

} else{
    //se nao estiver selecionado
    //adicionar a seleção
    selectedItems.push(itemId)
}

//atualizar o campo escondido com os itens selecionados
collectedItems.value = selectedItems

}