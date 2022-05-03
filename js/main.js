let sideBar = $("#sidebar");

sideBar.html(`
<div class="side_brand">
<h2><i class="fa-solid fa-user-gear"></i> <span>SASSI HOLFORD ADMIN</span></h2>
</div>
<div class="side_menu">
<ul>
    <li><a href="index.html" id="dash"><i class="fa-solid fa-chart-column"></i><span>DASHBOARD</span></a></li>

    <li><a href="allusers.html" id="allUser"><i class="fa-solid fa-users"></i><span>ALL USERS</span></a></li>

    <li><a href="createusers.html" id="createUser"><i class="fa-solid fa-user-plus"></i><span>CREATE USERS</span></a></li>

    <li><a href="allproducts.html" id="allProd"><i class="fa-solid fa-clipboard-list"></i><span>ALL PRODUCTS</span></a></li>

    <li><a href="createproducts.html" id="createProd"><i class="fa-solid fa-add"></i><span>CREATE PRODUCTS</span></a></li>

    <li><a href="allorders.html" id="allOrd"><i class="fa-solid fa-shipping-fast"></i><span>ALL ORDERS</span></a></li>
</ul>
</div>
`);

// sideBar.on('click', function () {
//     $("#sideMenu-Dash").addClass("active")
// })

window.onload = function () {
  const uid = sessionStorage.getItem("active");
  if (!uid) return $("#dash").toggleClass("active");

  $(uid).toggleClass("active");
};

const navBarLinksIDs = [
  "#dash",
  "#allUser",
  "#createUser",
  "#allProd",
  "#createProd",
  "#allOrd",
];

function handleActiveLink(uid) {
  navBarLinksIDs.forEach((id) => {
    if (uid === id) {
      sessionStorage.setItem("active", uid);
      $(uid).toggleClass("active");
    } else {
      $(id).removeClass("active");
    }
  });
}

navBarLinksIDs.forEach((id) => {
  $(id).on("click", function () {
    handleActiveLink(id);
  });
});

// For Dashboard
// $("#dash").on('click', function () {
//   $(this).toggleClass("active")
//   $("#allUser").removeClass("active")
//   $("#createUser").removeClass("active")
//   $("#allProd").removeClass("active")
//   $("#createProd").removeClass("active")
//   $("#allOrd").removeClass("active")
// })

// // For All users
// $("#allUser").on('click', function () {
//   $("#dash").removeClass("active")
//   $(this).addClass("active")
//   $("#createUser").removeClass("active")
//   $("#allProd").removeClass("active")
//   $("#createProd").removeClass("active")
//   $("#allOrd").removeClass("active")
// })

// // For Create users
// $("#createUser").on('click', function () {
//   $("#dash").removeClass("active")
//   $("#allUser").removeClass("active")
//   $(this).addClass("active")
//   $("#allProd").removeClass("active")
//   $("#createProd").removeClass("active")
//   $("#allOrd").removeClass("active")
// })

// // for all products
// $("#allProd").on("click", function () {
//   $("#dash").removeClass("active");
//   $("#allUser").removeClass("active");
//   $("#createUser").removeClass("active");
//   $(this).addClass("active");
//   $("#createProd").removeClass("active");
//   $("#allOrd").removeClass("active");
// });

// // for create products
// $("#createProd").on("click", function () {
//   $("#dash").removeClass("active");
//   $("#allUser").removeClass("active");
//   $("#createUser").removeClass("active");
//   $("#allProd").removeClass("active");
//   $(this).addClass("active");
//   $("#allOrd").removeClass("active");
// });

// // for all orders
// $("#allOrd").on("click", function () {
//   $("#dash").removeClass("active");
//   $("#allUser").removeClass("active");
//   $("#createUser").removeClass("active");
//   $("#allProd").removeClass("active");
//   $("#createProd").removeClass("active");
//   $(this).addClass("active");
// });
