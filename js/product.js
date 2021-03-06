// Declare Variables
let fName = $('#name'),
  description = $('#description'),
  price = $('#price'),
  quantity = $('#quantity'),
  image = $('#image'),
  category = $('#category'),
  updateProductBtn = $('#updateProductBtn'),
  updateProductForm = $('#updateProductForm'),
  productIndex,
  products = [],
  globalIpAddress="http://159.65.21.42:9000";



  loadProducts()

  


//Hide this form and show only when you want to edit data
// updateProductForm.hide()
loadProducts();
//Events in jquery
updateProductBtn.on('click', function () {
let productObj = {
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
    data: productObj,
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

}
// else {
  let updateId = products[productIndex]['_id'];
//   // $.ajax({
//   //   type: 'PUT',
//   //   url: `${globalIpAddress}/update/product/${updateId}`,
//   //   data: productObj,
//   //   success: function (response) {
//   //     if(response.error){
//   //         alert(`Registration Failed, ${response.error}`);
//   //       }else{
//   //         alert(`Update successful, at ${response.success}`);
//   //         loadProducts();
//   //         window.location.href = 'allproducts.html';
//         // }
      
//   //   },
//   //   error: function (err) {
//   //     alert(err.statusText);
//   //     console.log();
//   //   },
//   // });
//   productIndex = null;
//   regProductBtn.html('Add Data');
// };

clearForm();
loadProducts();
 });

//Assign event to a tag which is editBtn

$('#product_grid').on('click', '.editBtn', function () {
// updateProductForm.show()
productIndex = $(this).attr('indexData');
let updateId = products[productIndex]['_id'];

updateProductForm.html(`
<h1>Update Product</h1>

<form method="PUT" action="${globalIpAddress}/update/product/${updateId}" enctype="multipart/form-data" >

  <label for="name">Product Name
      <input type="text" name="name" id="name" placeholder="Enter Product Name..." value="${products[productIndex]['name']}"/>
  </label>
    
  <label for="description">Product Description
      <input type="text" name="description" id="description" placeholder="Enter Product Description..." value="${products[productIndex]['description']}"/>
  </label>
    
  <div class="priqua">
    <label for="price">Price
        <input type="number" name="price"prodQuan id="price" placeholder="Price" value="${products[productIndex]['price']}"/>
        
    </label>
      
    <label for="quantity">Quantity
        <input type="number" name="quantity" id="quantity" placeholder="Quantity" value="${products[productIndex]['quantity']}"/>
    </label>
  </div>

  <div class="catimg">
      <label for="image">Product Image
        <input type="file" name="image" id="image" value="${products[productIndex]['image']}"/>
      </label>
      
      <label for="category">Category
          <select name="category" id="category" value="${products[productIndex]['category']}">
              <option value="">Category</option>

              <option value="balm_slider">Balm Slider</option>

              <option value="balm_sect2">Section 2</option>

              <option value="balm_shop_prod">Shop Product</option>

          </select>
      </label>
  </div>

  <button type="submit" id="updateBtn">SUBMIT</button>
</form>
`)

// fName.val(products[productIndex]['name']);
// description.val(products[productIndex]['description']);
// price.val(products[productIndex]['price']);
// quantity.val(products[productIndex]['quantity']);
// image.val(products[productIndex]['image']);
// category.val(products[productIndex]['category']);

$('#updateBtn').html('Update Data');

});

$('#product_grid').on('click', '.deleteBtn', function () {
let shouldDelete = confirm('Do you want to delete this record?');

if (shouldDelete) {
  let deleteIndex = $(this).attr('indexData');

  let deleteId = products[deleteIndex]['_id'];

  $.ajax({
    type: 'DELETE',
    url: `${globalIpAddress}/product/${deleteId}`,
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
                        <a href="#"  class="editBtn" indexData="${index}">Edit</a>
                        <a href="#" indexData="${index}" class="deleteBtn">Delete</a>
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
};