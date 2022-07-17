let loginBtn = document.querySelector(".login-button");
let userVerificationParagraph = document.querySelector(".thanksUserContainer > p ");
let usernameWelcomeSpan = document.querySelector(".header_login_signup_container > span");
let shopSneakersBtn = document.querySelector(".btn-shop-sneakers");
let swiper_header = document.querySelector(".swiper > h1");
let  app_version  = "english";
let languageBox = document.querySelector("[name = 'select-language']");
let listItemLink = document.querySelectorAll("ul > li:not(.cart,.hart) > a");
let listItemLink_arabic_arr = ["دارجون","وصلنا حديثا","ملابس","احذية","تخفيضات"];
let listItemLink_english_arr = ["Dragon","new","clothes","shoes","sale"];
let listItemMenu = document.querySelectorAll("ul > li > a+ul");
let listItemMenuListItemLink = document.querySelectorAll("ul > li > a+ul > span > li > a");
let listItemMenuListItemLink_arabic_arr = ["جكتات ومعاطف","جينز","بناطيل","تيشرتات","سويت شرتات","ابوات","صنادل","سنيكرز"];
let listItemMenuListItemLink_english_arr = ["Jaket","Denim","pants","Shirts","Sweat Shirts","Boats","Sandals","Sneakers"];
if(localStorage.getItem("app_version") !== null){
    app_version = localStorage.getItem("app_version");
    if(localStorage.getItem("app_version") === "english"){
        //languageBox.selectedIndex = 0;
        document.body.classList.remove("arabic-orientation");
        document.body.setAttribute("language-version","english");
        document.querySelector("[lang='en']").removeAttribute("class");
        listItemLink.forEach((item,index)=>{
            item.innerHTML = listItemLink_english_arr[index];
        });
        listItemMenu.forEach((menu,index)=>{
            menu.classList.remove("menu-arabic-orientation"+index);
        });
        listItemMenuListItemLink.forEach((menuLink,index)=>{
            menuLink.innerHTML = listItemMenuListItemLink_english_arr[index];
        });
        loginBtn.innerHTML = "Login";
        if(localStorage.getItem("username") !== null){
            usernameWelcomeSpan.innerHTML = "Welcome " + localStorage.getItem("username");
        }else{
            usernameWelcomeSpan.innerHTML = "Welcome Guest";

        }
        userVerificationParagraph.innerHTML = "Thank you for using Dargon services, our customer service representatives will contact you";
    }else{
        //languageBox.selectedIndex = 1;
        document.body.classList.add("arabic-orientation");
        document.body.setAttribute("language-version","arabic");
        document.querySelector("[lang='en']").setAttribute("class","arabic-orientation");
        listItemLink.forEach((item,index)=>{
            item.innerHTML = listItemLink_arabic_arr[index];
        });
        listItemMenu.forEach((menu,index)=>{
            menu.classList.add("menu-arabic-orientation"+index);
        });
        listItemMenuListItemLink.forEach((menuLink,index)=>{
            menuLink.innerHTML = listItemMenuListItemLink_arabic_arr[index];
        });
        loginBtn.innerHTML = "تسجيل الدخول";
        if(localStorage.getItem("username") !== null){
            usernameWelcomeSpan.innerHTML = "مرحبا " + localStorage.getItem("username");
        }else{
            usernameWelcomeSpan.innerHTML = "مرحبا بك كضيف ";
        }
        userVerificationParagraph.innerHTML = "شكرا للك على استخدام خدمات دارجون سيقوم ممثلى خدمت العملاء بالتواصل معك";
        
    }
}else{
    app_version  = "english";
}
  

localStorage.setItem("app_version", app_version);
let userStatusSection = document.querySelector(".header_login_signup_container");
let loginContainer = document.querySelector(".login-signup-container");
userStatusSection.onclick = function(){
    loginContainer.classList.toggle("hide");
}
loginBtn.onclick = function(){
    window.location.href = "html/form.html";
}

let cartShop = document.querySelector('.cart');
function createShoppingCart(){
    let ourCartShop = document.querySelector(".cart-main-container");
    if(document.body.contains(ourCartShop) == false){
    var cartMainContainer = document.createElement("div");
    cartMainContainer.className = "cart-main-container";
    if(localStorage.getItem("app_version") == "arabic"){
        cartMainContainer.classList.add("cart-main-container-arabic-orientation");
    }
    let cartShoppingContainer = document.createElement("div");
    cartShoppingContainer.className = "cart-shopping-container";
    let shoppingCartFooter = document.createElement("footer");
    shoppingCartFooter.className = "shopping-cart-footer";
    let footer_row1 = document.createElement("div");
    let footer_row2 = document.createElement("div");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("span");
    span3.style.color = "#f60025";
    if(localStorage.getItem("app_version") == "arabic"){
        span1.innerHTML = "المجموع";
    }else{
        span1.innerHTML = "Total";
    }
    /*
    let viewCartBtn = document.createElement("button");
    if(localStorage.getItem("app_version") == "arabic"){
        viewCartBtn.innerHTML = "عرض الحقيبة";
    }else{
        viewCartBtn.innerHTML = "View Cart";
    }
    */
    
    let checkoutBtn = document.createElement("button");
    if(localStorage.getItem("app_version") == "arabic"){
        checkoutBtn.innerHTML = "الدفع";
    }else{
        checkoutBtn.innerHTML = "Checkout";
    }
    checkoutBtn.addEventListener('click',function(){
        if(localStorage.getItem("userNumberOfOrder") !== 0 && localStorage.getItem("username") != null && localStorage.getItem("password")  != null){
            location.href = "/html/payment.html";

        }else{
            let loginAlert = document.createElement("div");
            loginAlert.className = "login-alert";
            loginAlert.innerHTML = "Please login to checkout";
            document.querySelector("header").appendChild(loginAlert);
            setTimeout(()=>{
                loginAlert.remove();
            },1000);
        }
      
    });
    function getTotalPriceAndTotalSavings(){
    //let totalPriceBeforDiscount = 0;
    //let totalPriceAfterDiscount = 0 ;
    let totalPriceSavedAfterDiscount = 0;
    let totalPrice = 0;
    for(let j = 0 ; j <JSON.parse(localStorage.getItem("orderDeatils")).length; j++){
        /*
        if(JSON.parse(localStorage.getItem("orderDeatils"))[j].price_afterDiscount == undefined){
        totalPriceBeforDiscount +=  Number.parseFloat(JSON.parse(localStorage.getItem("orderDeatils"))[j].price_beforDiscount.split("EGP")[0]);
    }
    */
        if(JSON.parse(localStorage.getItem("orderDeatils"))[j].price_afterDiscount != undefined){
           // totalPriceAfterDiscount +=  Number.parseFloat(JSON.parse(localStorage.getItem("orderDeatils"))[j].price_afterDiscount.split("EGP")[0]);
            totalPriceSavedAfterDiscount+= Number.parseFloat(JSON.parse(localStorage.getItem("orderDeatils"))[j].price_beforDiscount.split("EGP")[0]) - Number.parseFloat(JSON.parse(localStorage.getItem("orderDeatils"))[j].price_afterDiscount.split("EGP")[0]);
        }
        if(JSON.parse(localStorage.getItem("orderDeatils"))[j].price_afterDiscount != undefined){
            totalPrice +=    Number.parseFloat(JSON.parse(localStorage.getItem("orderDeatils"))[j].price_afterDiscount.split("EGP")[0]);
        }else{
            totalPrice +=  Number.parseFloat(JSON.parse(localStorage.getItem("orderDeatils"))[j].price_beforDiscount.split("EGP")[0]);
        }
    }
    if(localStorage.getItem("app_version") == "arabic"){
    span2.innerHTML = totalPrice + " " + "ج";
    span3.innerHTML = "لقد ادخرت " + " " + totalPriceSavedAfterDiscount + " " + "ج";
    }else{
    span2.innerHTML = totalPrice + " " + "EGP";
    span3.innerHTML = "You Saved:" + " " +totalPriceSavedAfterDiscount + " " + "EGP";
    }
}
    getTotalPriceAndTotalSavings();
    footer_row1.append(span1,span2,span3);
    footer_row2.append(checkoutBtn);
    shoppingCartFooter.append(footer_row1,footer_row2);

    cartMainContainer.append(cartShoppingContainer,shoppingCartFooter);
    for(let i = 0 ; i < JSON.parse(localStorage.getItem("orderDeatils")).length; i++){
    let order_details_container = document.createElement("div");
    let order_image_container = document.createElement("div");
    let order_image = document.createElement("img");
    order_image.src = JSON.parse(localStorage.getItem("orderDeatils"))[i].imageURL;
    order_image_container.append(order_image);
    let order_price_size_container = document.createElement("div");
    let priceBeforAndAfterContainer = document.createElement("div");
    let order_price_befoeDiscount = document.createElement("span");
    if(localStorage.getItem("app_version") == "arabic"){
        order_price_befoeDiscount.innerHTML = JSON.parse(localStorage.getItem("orderDeatils"))[i].price_beforDiscount.split("EGP")[0] + " " + "ج";
    }else{
        order_price_befoeDiscount.innerHTML = JSON.parse(localStorage.getItem("orderDeatils"))[i].price_beforDiscount;
    }
    if(JSON.parse(localStorage.getItem("orderDeatils"))[i].price_afterDiscount != undefined){
    order_price_befoeDiscount.style.cssText = `text-decoration: line-through;`;
    }
    let order_price_afterDiscount = document.createElement("span");
    if(JSON.parse(localStorage.getItem("orderDeatils"))[i].price_afterDiscount != undefined){
    if(localStorage.getItem("app_version") == "arabic"){
        order_price_afterDiscount.innerHTML = (JSON.parse(localStorage.getItem("orderDeatils"))[i].price_afterDiscount.split("EGP")[0])+ " " + "ج";
    }else{
        order_price_afterDiscount.innerHTML = ( JSON.parse(localStorage.getItem("orderDeatils"))[i].price_afterDiscount.split("EGP")[0])+" " + "EGP";
    }
    order_price_afterDiscount.style.cssText = `color: #f60025;`;
}
    let order_size = document.createElement("span");
    if(localStorage.getItem("app_version") == "arabic"){
        order_size.innerHTML ="المقاس:"+" "+ JSON.parse(localStorage.getItem("orderDeatils"))[i].size;
    }else{
        order_size.innerHTML ="Size:"+" "+ JSON.parse(localStorage.getItem("orderDeatils"))[i].size;
    }
    
    priceBeforAndAfterContainer.append(order_price_befoeDiscount);
    if(JSON.parse(localStorage.getItem("orderDeatils"))[i].price_afterDiscount != undefined){
    priceBeforAndAfterContainer.append(order_price_afterDiscount);
    }
    order_price_size_container.append(priceBeforAndAfterContainer,order_size);
    let order_settings_container = document.createElement("div");

    let quantitySettings = document.createElement("ul");
    let quantitySettings_li1 = document.createElement("li");
    quantitySettings_li1.className = "quantity-settings-li1";
    quantitySettings_li1.innerHTML = "-";
    quantitySettings_li1.style.cursor  = "pointer";
    quantitySettings_li1.addEventListener('click',function(){
       let QunatityFromLocalStorage = Number(JSON.parse(localStorage.getItem("orderDeatils"))[i].quantity);
        QunatityFromLocalStorage-=1;
        let localStorageArrayOfObjects = JSON.parse(localStorage.getItem("orderDeatils"));
        localStorageArrayOfObjects[i].quantity = QunatityFromLocalStorage;
        localStorage.setItem("orderDeatils",JSON.stringify(localStorageArrayOfObjects));
        quantitySettings_li2.innerHTML = JSON.parse(localStorage.getItem("orderDeatils"))[i].quantity; 
    });
    let quantitySettings_li2 = document.createElement("li");
    quantitySettings_li2.className = "quantity-settings-li2";
    quantitySettings_li2.innerHTML = JSON.parse(localStorage.getItem("orderDeatils"))[i].quantity;
    let quantitySettings_li3 = document.createElement("li");
    quantitySettings_li3.className = "quantity-settings-li3";
    quantitySettings_li3.innerHTML = "+";
    quantitySettings_li3.style.cursor  = "pointer";
    quantitySettings_li3.addEventListener('click',function(){
        let QunatityFromLocalStorage = Number(JSON.parse(localStorage.getItem("orderDeatils"))[i].quantity);
        QunatityFromLocalStorage+=1;
        let localStorageArrayOfObjects = JSON.parse(localStorage.getItem("orderDeatils"));
        localStorageArrayOfObjects[i].quantity = QunatityFromLocalStorage;
        localStorage.setItem("orderDeatils",JSON.stringify(localStorageArrayOfObjects));
        quantitySettings_li2.innerHTML = JSON.parse(localStorage.getItem("orderDeatils"))[i].quantity;
    });
    quantitySettings.append(quantitySettings_li1,quantitySettings_li2,quantitySettings_li3);
    let removeProductFromCart = document.createElement("div");
    //removeProductFromCart.id = JSON.parse(localStorage.getItem("orderDeatils")).map((obj) => obj.imageURL).indexOf(JSON.parse(localStorage.getItem("orderDeatils"))[i].imageURL);
    removeProductFromCart.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    order_settings_container.append(quantitySettings,removeProductFromCart);
    removeProductFromCart.addEventListener('click',function(){
     let cartArrFromLocalStorage  = JSON.parse(localStorage.getItem("orderDeatils"));
        cartArrFromLocalStorage.splice(i,1);
        cartDetailsArr.splice(i,1);
        userNumberOfOrders -= 1;
        localStorage.setItem("orderDeatils",JSON.stringify(cartArrFromLocalStorage));
       var deletedProduct =  order_details_container.remove();
       let numberOdOrders = localStorage.getItem("userNumberOfOrder");
       numberOdOrders-=1;
       localStorage.setItem("userNumberOfOrder",numberOdOrders);
       cartShop.title = localStorage.getItem("userNumberOfOrder");
       getTotalPriceAndTotalSavings();
     
    if(deletedProduct == undefined){

        /*
        if(cartMainContainer.contains(document.querySelector(".cart-main-container > div")) == true){
            console.log("it dose not contain any dom object");
        }
        */
       if(cartArrFromLocalStorage.length == 0 ){
        let cartEmptyContainer = document.createElement("div");
        cartEmptyContainer.className = "empty-cart";
        let emptyCartImage = document.createElement("img");
        emptyCartImage.src = "/images/empty-cart.png";
        let spanHeadLine = document.createElement("span");
        if(localStorage.getItem("app_version") == "arabic"){
            spanHeadLine.innerHTML = "عربة التسوق فارغة";
        }else{
            spanHeadLine.innerHTML = "Your cart is empty";
        }
        cartEmptyContainer.append(emptyCartImage,spanHeadLine);
        cartShoppingContainer.append(cartEmptyContainer);
        getTotalPriceAndTotalSavings();
        isCartEmpty = true;
       }
    }       
    });
    order_details_container.append(order_image_container,order_price_size_container,order_settings_container);

    /* footer */

    cartShoppingContainer.appendChild(order_details_container);
    denim_container.addEventListener('click',function(){
      /*  cartShoppingContainer.remove();*/
        cartMainContainer.style.cssText  = `display:none !important;`;
        document.body.removeAttribute("style");
    });
    
    if(JSON.parse(localStorage.getItem("orderDeatils")).length > 1){
     cartShoppingContainer.style.cssText = `overflow-y: scroll; `;
    }
}
if(JSON.parse(localStorage.getItem("orderDeatils")).length == 0 ){
    let cartEmptyContainer = document.createElement("div");
    cartEmptyContainer.className = "empty-cart";
    let emptyCartImage = document.createElement("img");
    emptyCartImage.src = "/images/empty-cart.png";
    let spanHeadLine = document.createElement("span");
    if(localStorage.getItem("app_version") == "arabic"){
        spanHeadLine.innerHTML = "عربة التسوق فارغة";
    }else{
        spanHeadLine.innerHTML = "Your cart is empty";
    }
    cartEmptyContainer.append(emptyCartImage,spanHeadLine);
    cartShoppingContainer.append(cartEmptyContainer);
    getTotalPriceAndTotalSavings();
    isCartEmpty = true;
}
    denim_container.after(cartMainContainer);
}else{
    ourCartShop.remove();
}
}
cartShop.addEventListener('click',createShoppingCart);
if(localStorage.getItem('userNumberOfOrder') !== null){
    cartShop.title = localStorage.getItem('userNumberOfOrder');
    }else{
        cartShop.title = 0;
    }