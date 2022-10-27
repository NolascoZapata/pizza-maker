let stdPizzas=[]
let extras=[]
let toppings=[]
let base=[]

const loadPage = async()=>{
  let response = await fetch(`./../db.json`);
  let data= await response.json();
  base=[...data[0]] 
  extras=[...data[1]]
  stdPizzas=[...data[2]]
  toppings=[...data[3]]
  loadCards()
  loadMakePizzaElements()
}

loadPage()


let userPizza=[];
let toppingsValue = 0;
let charge = 2;
let totalNewPizza = toppingsValue + charge;
let cart = [];
let userPizzaCounter = 0;
let total = 0
document.getElementById('cartTotal').innerHTML = `$${total}`

// if (cart.length===0) {
//   document.getElementById('cart').innerHTML = `<p>No items added yet</p>`
// }
function loadCards(){
  let stdPizzBox = document.getElementById('standard-pizzas-box')
  let htmlCards=''
  for (let i = 0; i < stdPizzas.length; i++) {
    let pizza = stdPizzas[i];
    let pizzaCard = `
                      <div class="card" id=${pizza.id} >
                      <img src=${pizza.img_src} class="card-img-top" alt=${pizza.name}>
                      <div class="card-body">
                        <h4 class="card-title">${pizza.name}</h4>
                        <p class="card-text">${pizza.description}</p>
                        <p class="card-text"><strong>$${pizza.price}</strong></p>
                        <button id="addToCartBtn" class= "button add-to-cart-btn">
                          <div>
                            <span>
                              <p>Add to cart</p>
                            </span>
                          </div>
                          <div>
                            <span>
                              <p><i class="bi bi-cart-plus"></i></p>
                            </span>
                          </div>
                        </button>


                      </div>
                    </div>
                    `
    htmlCards = htmlCards + pizzaCard
  
  }
  stdPizzBox.innerHTML = htmlCards

  // List AddToCartBtn
  document.querySelectorAll('#addToCartBtn').forEach(item => {
  item.onclick = function(){
    let itemToAdd = stdPizzas.find(pizza => pizza.id === item.parentElement.parentElement.id);
    let prodToAdd
    if (itemToAdd===undefined) {
      
      let userToppingPizza = []
      userPizza.forEach(el=> userToppingPizza.push(el.name));
      prodToAdd= {
        name:`User's Pizza #${++userPizzaCounter} (${userToppingPizza}) `,
        price: totalNewPizza,
        quantity: 1,
      }
    }else{
      
      prodToAdd = {
                      name:itemToAdd.name,
                      price: itemToAdd.price,
                      quantity: 1
                    }
    
    }
    if (cart.find(prod=>prod.name===prodToAdd.name) === undefined){
      cart.push(prodToAdd)
    }else{
      ++cart.find(prod=>prod.name===prodToAdd.name).quantity
    }
    swal({
      title: `Pizza added to cart!`,
      icon: "success",
    });
    loadCartAndOrderList()
  }
})
}

function loadMakePizzaElements() {
  let pizzaBoard= document.getElementById('pizzaBoard')
  let elements = ''
  for (let i = 0; i < base.length; i++) {
    let b = base[i];
    let htmlBase = `
                <img src=${b.img_src} alt="${b.name}-img" id="img-${b.id}" class="pizza-base-${b.id}">
                  `
    elements+=htmlBase;
  }
  for (let i = 0; i < toppings.length; i++) {
    let top = toppings[i];
    let htmlTopp = `
                <img src=${top.img_src} alt="${top.name}-img" id="img-${top.id}"  class="pizza-topping">
                  `
    elements+=htmlTopp;
  }
  for (let i = 0; i < extras.length; i++) {
    let ext = extras[i];
    let htmlExtr = `
                <img src=${ext.img_src} alt="${ext.name}-img" id="img-${ext.id}" class="pizza-extra">
                  `
    elements+=htmlExtr;
  }
  pizzaBoard.innerHTML=elements
}

function udapteNewPizzaValue() {
document.getElementById('chargeNewPizza').textContent = charge
document.getElementById('toppingsValue').textContent = toppingsValue
totalNewPizza = toppingsValue + charge
document.getElementById('newPizzaValue').textContent = toppingsValue + charge

}


let addToppCheck = document.querySelectorAll('.add-t-check')
addToppCheck.forEach(item => {
  item.onclick= function(e){
    let img = document.getElementById(`img-${item.id}`)
    if (item.checked) {
      img.style.opacity=1;
      let selectedItem = toppings.find(top => item.id === top.id)
      if (selectedItem===undefined) {
        selectedItem=base.find(base => item.id === base.id)
        if (selectedItem===undefined){
          selectedItem=extras.find(extra => item.id === extra.id)
        }
      }
      userPizza.push(selectedItem)
      toppingsValue = toppingsValue + selectedItem.price
      udapteNewPizzaValue()
    } else {
      img.style.opacity=0;
      let itemDeletedPosition=userPizza.findIndex(el=>el.id === item.id)
      toppingsValue = toppingsValue - userPizza[itemDeletedPosition].price
      userPizza.splice(itemDeletedPosition,1)
      udapteNewPizzaValue()
    }
  }
})

function deleteItemFromCart(name) {
  let itemToDeleteIndex = cart.findIndex(item=>item.name === name)
  cart.splice(itemToDeleteIndex,1)
}


function loadCartAndOrderList() {
  let htmlRows=''
  let listOrder =''
  if (cart.length===0) {
    document.getElementById('cart').innerHTML = `<p>No items added yet</p>`
  }else{
    for (let i = 0; i < cart.length; i++) {
      let pizza = cart[i];
        htmlRows +=`
                      <tr >
                        <td class="pizza-name" scope="row">${pizza.name.slice(0,45)}</td>
                        <td>$${pizza.price}</td>
                        <td class= "cart-col-qty">
                          <button id="lessQtyBtn">-</button>
                          <label>${pizza.quantity}</label>
                          <button id="moreQtyBtn">+</button>
                        </td>
                        <td>$${pizza.price*pizza.quantity}</td>
                        <td><input type="button" id="deleteItemBtn" class="delete-item-btn"value="&#x274C"/></td>
                      </tr>
                      `
        listOrder+=`<li>${pizza.name} x${pizza.quantity}  $${pizza.price*pizza.quantity}</li>`
      
    }
    document.getElementById('cart').innerHTML = htmlRows
    document.getElementById('orderList').innerHTML=listOrder;
  }

  let totalCart=0;
  cart.forEach(prod => totalCart+= (prod.price*prod.quantity))
  document.getElementById('cartTotal').innerHTML = `$${totalCart}`
  document.getElementById('orderTotal').innerHTML = `Total :$${totalCart}`

  // deleteItemHandler
  let deteteItemBtn = document.querySelectorAll('#deleteItemBtn')
  deteteItemBtn.forEach(item => {
    item.onclick = function(){
      let itemName=item.parentElement.parentElement.querySelector('.pizza-name').textContent
      deleteItemFromCart(itemName)
      loadCartAndOrderList()
    }})

  //lessQtyHandler
  document.querySelectorAll('#lessQtyBtn').forEach(
    btn=>{
      btn.onclick = ()=>{
        let itemName= btn.parentElement.parentElement.querySelector('.pizza-name').textContent
        let itemIndex = cart.findIndex(item=>item.name == itemName)
        if (cart[itemIndex].quantity>0) {
          --cart[itemIndex].quantity
        }else{
          cart[itemIndex].quantity=0
        }
        loadCartAndOrderList()
      }
    }
  )
  //moreQtyHandler
  document.querySelectorAll('#moreQtyBtn').forEach(
    btn=>{
      btn.onclick = ()=>{
        let itemName= btn.parentElement.parentElement.querySelector('.pizza-name').textContent
        let itemIndex = cart.findIndex(item=>item.name === itemName)
        ++cart[itemIndex].quantity
        loadCartAndOrderList()
      }
    }
  )
}

const buyBtn = document.getElementById('buyBtn')
buyBtn.addEventListener('click',(e) =>{
  e.preventDefault()
  if (cart.length>0) {
    buyBtn.innerHTML = `
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                        `
    setTimeout(() => {
      buyBtn.style.background='blue'
      buyBtn.innerHTML = `Thank you`
      sendOrder()
      
      window.location.href="/"

    }, 3000);

    
  } else {
    alert('No products on cart')
  }
})

function sendOrder() {
  userPizza=[];
  toppingsValue = 0;
  charge = 2;
  totalNewPizza = toppingsValue + charge;
  cart = [];
  userPizzaCounter = 0;
  document.getElementById('orderList').innerHTML=''

  udapteNewPizzaValue()
  loadCartAndOrderList()
}






udapteNewPizzaValue()


