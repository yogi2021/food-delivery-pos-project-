//navbar scroll

window.addEventListener("scroll", function(){
    const nav = document.querySelector(".navigation-wrap");
    nav.classList.toggle("scroll-on", window.scrollY > 50);
});



//Button onclick smooth
function viewMenu(){
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}

//POS Logic
const products = [
  { 
    pid:1, 
    pname:'Pizza', 
    price:288,
    discount:10,
    image:'pizza.png' 
  },

  { 
    pid:2, 
    pname:'Cheeze Burger', 
    price:229, discount:10, 
    image:'burger.png' 
  },

  { 
    pid:3, 
    pname:'Momos', 
    price:180, 
    discount:10, 
    image:'momos.png' 
  },

  { 
    pid:4, 
    pname:'French Fries', 
    price:169, 
    discount:10, 
    image:'frenchFries.png' 
  },
  
  {
    pid: 5,
    pname: 'Panner Curry',
    price: 379,
    discount: 10,
    image: 'paneer.png'
  },

  {
    pid: 6,
    pname: 'Mashroom',
    price: 399,
    discount: 10,
    image: 'mashroom.png'
  },

  {
    pid: 7,
    pname: 'Bengan Bharta',
    price: 249,
    discount: 10,
    image: 'bengan.png'
  },

  {
    pid: 8,
    pname: 'Daal Tadka',
    price: 289,
    discount: 10,
    image: 'dal_tadka.png'
  },


    {
    pid: 9,
    pname: 'Tandoori Roti',
    price: 19,
    discount: 10,
    image: 'tandoori9.png'
  },

    {
    pid:10,
    pname: 'Jeera Rice',
    price: 198,
    discount: 10,
    image: 'Bhat10.png'
  },

  {
    pid: 11,
    pname: 'Lassi',
    price: 89,
    discount: 10,
    image: 'Lassi11.png'
  },

  {
    pid: 12,
    pname: 'Special_Thali',
    price: 369,
    discount: 10,
    image: 'special_Thali12.png'
  }
];

function finalPrice(p){
  return p.price - (p.price * p.discount / 100);
}

/* PRODUCTS */
let productHTML = `<div class="row g-4">`;

products.forEach(p=>{
  productHTML += `
    <div class="col-md-4 col-lg-3">
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top" height="200">
        <div class="card-body text-center">
          <h5>${p.pname}</h5>
          <del>₹${p.price}</del>
          <p class="fw-bold">₹${finalPrice(p)}</p>
          <button class="btn btn-primary w-100"
            onclick="addToCart(${p.pid}, '${p.pname}', ${finalPrice(p)})">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  `;
});

productHTML += `</div>`;
document.getElementById("product-list").innerHTML = productHTML;

/* CART LOGIC  */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(pid, pname, price){
  cart.push({pid, pname, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function loadCart(){
  let html = "";
  let total = 0;

  cart.forEach((item, index)=>{
    total += item.price;
    html += `
      <tr>
        <td>${item.pname}</td>
        <td>₹${item.price}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">X</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("cart").innerHTML = html;
  document.getElementById("total").innerText = "₹" + total.toFixed(1);
}

function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function clearCart(){
  cart = [];
  localStorage.removeItem("cart");
  loadCart();
}

loadCart();


//Searchbar Logic
function searchProduct(keyword){
  let resultBox = document.getElementById("searchResult");
  resultBox.innerHTML = "";

  if(keyword.trim() === "") return;

  let filtered = products.filter(p =>
    p.pname.toLowerCase().includes(keyword.toLowerCase())
  );

  filtered.forEach(p=>{
    resultBox.innerHTML += `
      <a class="list-group-item list-group-item-action search-item"
         onclick="selectProduct(${p.pid}, '${p.pname}', ${finalPrice(p)})">
        <img src="${p.image}">
        <div>
          <strong>${p.pname}</strong><br>
          ₹${finalPrice(p)}
        </div>
      </a>
    `;
  });
}

function selectProduct(pid, pname, price){
  addToCart(pid, pname, price);
  document.getElementById("searchInput").value = "";
  document.getElementById("searchResult").innerHTML = "";
}

