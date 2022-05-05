// Declare Variables
let fName = $('#name'),
  description = $('#description'),
  price = $('#price'),
  quantity = $('#quantity'),
  image = $('#image'),
  category = $('#category'),
  regProductBtn = $('#regProductBtn'),
  updateProductForm = $('#updateProductForm'),
  productIndex,
  products = [],
  globalIpAddress="http://159.65.21.42:9000";



  loadProducts()

  


//Hide this form and show only when you want to edit data
updateProductForm.hide()
loadProducts();
//Events in jquery
regProductBtn.on('click', function () {
let userObj = {
  "name": fName.val(),
  "description": description.val(),
  "price": price.val(),
  "quantity": quantity.val(),
  "image": image.val(),
  "category": category.val(),
};

if (productIndex == null) {

  $.ajax({
    type: 'POST',
    url: `${globalIpAddress}/create/product`,
    data: userObj,
    success: function (response) {
        //Authenticating a user
        if(response.error){
          alert(`Registration Failed, ${response.error}`);
        }else{
          alert(`Registration successful, welcome ${response.name}`);
          window.location.href = 'allproducts.html';
        }
      
    },
    error: function (err) {
      console.log(err.statusText);
    },
  });
} else {

  let updateId = products[productIndex]['_id'];
  $.ajax({
    type: 'PUT',
    url: `${globalIpAddress}/update/product/:${updateId}`,
    data: userObj,
    success: function (response) {
      if(response.error){
          alert(`Registration Failed, ${response.error}`);
        }else{
          alert(`Update successful, at ${response.success}`);
          loadProducts();
        }
      
    },
    error: function (err) {
      alert(err.statusText);
      console.log();
    },
  });
  productIndex = null;
  regProductBtn.html('Add Data');
}

clearForm();
loadProducts();
});

//Assign event to a tag which is editBtn
$('#product_grid').on('click', '.editBtn', function () {
updateProductForm.show()
productIndex = $(this).attr('indexData');

fName.val(products[productIndex]['name']);
description.val(products[productIndex]['description']);
price.val(products[productIndex]['price']);
quantity.val(products[productIndex]['quantity']);
image.val(products[productIndex]['image']);
category.val(products[productIndex]['category']);
regProductBtn.html('Update Data');
});

$('#product_grid').on('click', '.deleteBtn', function () {
let shouldDelete = confirm('Do you want to delete this record?');

if (shouldDelete) {
  let deleteIndex = $(this).attr('indexData');

  let deleteId = products[deleteIndex]['_id'];

  $.ajax({
    type: 'DELETE',
    url: `${globalIpAddress}/product/:${deleteId}`,
    success: function (response) {
      console.log(response);
      alert('User Deleted');
      loadProducts(); 
    },
    error: function (err) {
      console.log(err.statusText);
    },
  });

 
  
}
});

  loadProducts()

function loadProducts() {
    // load products
    $.ajax({
      type: 'GET',
      url: `${globalIpAddress}/products`,
      success: function (response) {
        products = response;
        let rows = '';
        let sliderData=""
        for (let index = 0; index < products.length; index++) {
  
            if(products[index]['category']== "balm_slider" || products[index]['category']== "balm_shop_prod" ){
              rows += ` 
              <div class="product_single">
                    <img src="${globalIpAddress}${products[index]['image']}" alt="">
                    <h2>${products[index]['name']}</h2>
                    <div class="priqua">
                        <label for="price">PRICE
                            <p>&pound;${products[index]['price']}</p>
                        </label>
                        <label for="price">QUANTITY
                            <p>${products[index]['quantity']}</p>
                        </label>
                    </div>
                    <div class="edbtns">
                        <button class="editBtn" indexData="${index}">Edit</button>
                        <button indexData="${index}" class="deleteBtn">Delete</button>
                    </div>
                </div>`;
            }
  
            if(products[index]['category']== "balm_slider"){
              sliderData+=``
            }
         
        }
  
        $('#product_grid').html(rows);
        $('#sliderSection').html(sliderData)
      },
      error: function (err) {
        console.log(err);
      },
    });
}