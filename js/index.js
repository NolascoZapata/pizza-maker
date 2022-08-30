const stdPizzas= [
  {
    id:"cheesepizza",
    name:"Cheese",
    description : "Tomato Sauce and Mozzarella Cheese",
    img_src: "./img/std-pizza/cheese-sm.png",
    price: 7
  },
  {
    id:"hamcheese",
    name:"Ham and Chesse",
    description : "Tomato Sauce , Mozzarella Cheese and Ham",
    img_src: "./img/std-pizza/ham-cheese-sm.png",
    price: 8 
  },
  {
    id:"peppcheese",
    name:"Pepperoni and Chesse",
    description : "Tomato Sauce , Mozzarella Cheese and Pepperoni",
    img_src: "./img/std-pizza/pepperoni-pizza-sm.png",
    price: 8.5
  },{
    id:"hawaiian",
    name:"Hawaiian",
    description : "Tomato Sauce , Mozzarella Cheese and Pineapple",
    img_src: "./img/std-pizza/hawaiian-pizza-sm.png",
    price: 9.25
  }
]
const base= [
  {
    id: "sauce",
    name: "Sauce",
    img_src: "./img/tomato-sauce.png",
    price: 2.5,
  },
  {
    id: 'cheese',
    name: "Cheese",
    img_src: "./img/cheese.png",
    price: 2.5,
  }

]
const toppings = [
  {
    id: "olivg",
    name: "Green olive",
    img_src: "./img/toppings/olives-g.png",
    price: 0.5,
  },
  {
    id: "olivd",
    name: "Dark olive",
    img_src: "./img/toppings/olives-d.png",
    price: 0.5,
  },
  {
    id: "tomato",
    name: "Tomato slices",
    img_src: "./img/toppings/tomato.png",
    price: 0.5,
  },
  {
    id: "onion",
    name: "Onion",
    img_src: "./img/toppings/onion.png",
    price: 0.5,
  },
  {
    id: "bacon",
    name: "Bacon",
    img_src: "./img/toppings/bacon.png",
    price: 2,
  },
  {
    id: "ham",
    name: "Ham",
    img_src: "./img/toppings/ham.png",
    price: 1,
  },
  {
    id: "pineapple",
    name: "Pineapple",
    img_src: "./img/toppings/pineapple.png",
    price: 1.25,
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    img_src: "./img/toppings/pepperoni.png",
    price: 1.5,
  }
]
const extras = [
  {
    id: "xtomato",
    name: "Extra Tomato slices",
    img_src: "./img/toppings/x-tomato.png",
    price: 0.5,
  },
  {
    id: "xonion",
    name: "Extra Onion",
    img_src: "./img/toppings/x-onion.png",
    price: 0.5,
  },
  {
    id: "xbacon",
    name: "Extra Bacon",
    img_src: "./img/toppings/x-bacon.png",
    price: 0.5,
  },
  {
    id: "xham",
    name: "Extra Ham",
    img_src: "./img/toppings/x-ham.png",
    price: 0.5,
  },
  {
    id: "xpineapple",
    name: "Extra Pineapple",
    img_src: "./img/toppings/x-pineapple.png",
    price: 2,
  },
  {
    id: "xpepperoni",
    name: "Extra Pepperoni",
    img_src: "./img/toppings/x-pepperoni.png",
    price: 1,
  }
]


let userPizza=[];
let toppingsValue = 0;
let charge = 2;
let totalNewPizza = toppingsValue + charge;
let cart = [];
let userPizzaCounter = 0;
let total = 0
document.getElementById('cartTotal').innerHTML = `$${total}`
if (cart.length===0) {
  document.getElementById('cart').innerHTML = `<p>No items added yet</p>`
}
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

loadCards()

let addToCartBtn = document.querySelectorAll('#addToCartBtn')
addToCartBtn.forEach(item => {
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
    loadCartAndOrderList()
  }
})

const buyBtn = document.getElementById('buyBtn')
buyBtn.addEventListener('click',(e) =>{
  
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
      window.location.reload()

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


