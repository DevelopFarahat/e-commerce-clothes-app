let userNumberOfOrders;
let denim_container = document.querySelector('.denim-container');
let cartShop = document.querySelector('.cart');
let cartDetailsArr = [];
let cartDetailsBackupArr =[];
let favoriteArr = [];
let favoriteBackupArr = [];
if(localStorage.getItem('orderDeatils')!=null){
for(let i = 0 ; i <JSON.parse(localStorage.getItem('orderDeatils')).length ; i++ ){
    cartDetailsBackupArr[i] = JSON.parse(localStorage.getItem('orderDeatils'))[i];
}
}
if(localStorage.getItem('favorite')!=null){
for(let i = 0 ; i <JSON.parse(localStorage.getItem('favorite')).length ; i++ ){
    favoriteBackupArr[i] = JSON.parse(localStorage.getItem('favorite'))[i];
}
}
if (localStorage.getItem('userNumberOfOrder') !== null) {
    userNumberOfOrders =Number(localStorage.getItem(`userNumberOfOrder`));
} else {
    userNumberOfOrders = 0;
}

let ProductNumberOfOrder = 1;
let isCartEmpty = true;


if(localStorage.getItem("app_version")=="arabic"){
    document.body.classList.add("arabic-orientation");
    document.querySelector("[lang='en']").classList.add("arabic-orientation");
    document.body.setAttribute("language-version","arabic");
}else{
    document.body.classList.remove("arabic-orientation");
    document.querySelector("[lang='en']").classList.remove("arabic-orientation");
    document.body.removeAttribute("language-version");
}
function getDenimData(URL){
    if(localStorage.getItem('userNumberOfOrder') !== null){
    cartShop.title = localStorage.getItem('userNumberOfOrder');
    }else{
        cartShop.title = 0;
    }
    var request  = new XMLHttpRequest();
    request.open("get",URL,true)
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            let data = JSON.parse(request.responseText);
            for(let item in data.first){
            let card = document.createElement("div");
            card.className = " card";
            /*  arabic version */
            if(localStorage.getItem('app_version') == "arabic"){
                card.classList.add("arabic-orientation");
            }else{
                card.classList.remove("arabic-orientation");
            }
            let cardImg = document.createElement("img");
            cardImg.className = " card-img";
            cardImg.src = data.first[item].imageURL;
            card.appendChild(cardImg);
            if(data.first[item].new_product == true){
            let newProductDadge = document.createElement("div");
            newProductDadge.className = " new-product-badge";
            if(localStorage.getItem('app_version') == "arabic"){
                newProductDadge.classList.add("new-product-badge-arabic-orientation");
                newProductDadge.innerHTML = "جديد";
            }else{
            newProductDadge.classList.remove("new-product-badge-arabic-orientation");
            newProductDadge.innerHTML = "New";
            }
            card.appendChild(newProductDadge);
            }
            let favoriteProductContainer = document.createElement("div");
            favoriteProductContainer.className = "favorite-product-container";
            if(localStorage.getItem('app_version') == "arabic"){
                favoriteProductContainer.classList.add("favorite-product-container-arabic-orientation");
            }
            favoriteProductContainer.innerHTML = `<i class="fa-solid fa-heart"></i>`;
            favoriteProductContainer.addEventListener('mousemove',()=>{
                favoriteProductContainer.style.color = "#f60025";
            });
            favoriteProductContainer.addEventListener('mouseleave',()=>{
                favoriteProductContainer.removeAttribute("style");
            });
            let favoritSuccessfulAlert = document.createElement("div");
            favoritSuccessfulAlert.className = "favorit-successfull-alert";
            
            favoriteProductContainer.addEventListener('click',()=>{
                favoriteProductContainer.classList.toggle("favorite");
                if(favoriteProductContainer.classList.contains("favorite")){
                    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
                        for(let i = 0 ; i < favoriteBackupArr.length ; i++){
                            favoriteArr[i] = favoriteBackupArr[i];   
                        }
                      } else {
                        for(let i = 0 ; i < favoriteBackupArr.length ; i++){
                            favoriteArr[i] = favoriteBackupArr[i];
                            
                        }
                      }
                    favoriteArr.push(data.first[item]);
                    //favoriteArr.push({"first":{item:data.first[item]}},{"second":{item:{item:data.second[item]}}});
                    localStorage.setItem('favorite',JSON.stringify(favoriteArr));
                    favoritSuccessfulAlert.innerHTML = "Added to favorites list successfully";
                }else{
                    for(let i = 0 ; i < JSON.parse(localStorage.getItem('favorite')).length ; i++){
                        if(JSON.parse(localStorage.getItem('favorite'))[i].imageURL == data.first[item].imageURL){
                           // let targetFavProObject = JSON.parse(localStorage.getItem('favorite'))[i];
                            favoriteArr.splice(i,1);
                            localStorage.setItem('favorite',JSON.stringify(favoriteArr));
                        }
                    }
                    favoritSuccessfulAlert.innerHTML = "Removed from favorites list successfully";
                }
                let pageHeader = document.querySelector("header");
                pageHeader.appendChild(favoritSuccessfulAlert);
                setTimeout(()=>{
                    favoritSuccessfulAlert.remove();
                },1000);
            });
            if(localStorage.getItem("favorite") !== null){
                for(let i = 0 ; i < JSON.parse(localStorage.getItem('favorite')).length ; i++){
                    if(data.first[item].imageURL == JSON.parse(localStorage.getItem('favorite'))[i].imageURL){
                        favoriteProductContainer.classList.add("favorite");
                    }
                    }
            }
            card.appendChild(favoriteProductContainer);
            let cardDetails = document.createElement("div");
            cardDetails.className = " card-details";
            let details_container = document.createElement("div");
            let productPriceContainer = document.createElement("span");
            let price_befor_discount = document.createElement("span");
            if(localStorage.getItem('app_version') == "arabic"){
                price_befor_discount.innerHTML = data.first[item].price.split("EGP")[0] + ""+"ج";
            }else{
                price_befor_discount.innerHTML = data.first[item].price;
            }
            if(data.first[item].discount > 0 ){
            let price_after_discount = document.createElement("span");
            if(localStorage.getItem('app_version') == "arabic"){
                price_after_discount.innerHTML = (Number.parseInt(data.first[item].price) ) - (Number.parseInt(data.first[item].price) * data.first[item].discount / 100) + "ج";
            }else{
                price_after_discount.innerHTML = (Number.parseInt(data.first[item].price) ) - (Number.parseInt(data.first[item].price) * data.first[item].discount / 100) + "EGP";
            }
           
           // priceAfterDiscountArr.push((Number.parseInt(data.first[item].price) ) - (Number.parseInt(data.first[item].price) * data.first[item].discount / 100));
            price_befor_discount.style.cssText = "text-decoration: line-through; color:#040000;";
            productPriceContainer.appendChild(price_after_discount);
            let discountBadge = document.createElement("div");
            discountBadge.className = "discount-badge";
            if(localStorage.getItem('app_version') == "arabic"){
                discountBadge.innerHTML = "خصم"+ " " + data.first[item].discount + "%";
            }else{
                discountBadge.innerHTML = "Save"+ " " + data.first[item].discount + "%";
            }
            
            //discountArr.push(data.first[item].discount);
            cardDetails.appendChild(discountBadge);
            }
            productPriceContainer.className = "product-price";
            productPriceContainer.append(price_befor_discount);
            details_container.appendChild(productPriceContainer);
            cardDetails.appendChild(details_container);
            card.appendChild(cardDetails);
            let quickView = document.createElement("button");
            if(localStorage.getItem("app_version") == "arabic"){
                quickView.innerHTML = "عرض الآن";
            }else{
            quickView.innerHTML = "Quick View";
            }
            quickView.className = "quick-view";
            details_container.appendChild(quickView);
            quickView.addEventListener('mouseenter',function(){
                if(data.first[item].stock == "SoldOut"){
                    quickView.style.cursor = "not-allowed";
                }
                
            });
            quickView.addEventListener('mouseout',function(){
                if(data.first[item].stock == "SoldOut"){
                quickView.removeAttribute("style");
                }
            });
            let stock_status = document.createElement("span");
            stock_status.className = "stock-status";
            if(data.first[item].stock == "InStock"){
                if(localStorage.getItem('app_version') == "arabic"){
                    stock_status.innerHTML = "متوفر";
                    stock_status.classList.add("stock-status-arabic-orientation");
                }else{
                    stock_status.innerHTML = "In Stock";
                    stock_status.classList.remove("stock-status-arabic-orientation");
                }
                stock_status.style.color = "#040000";
                
            }else{
                if(localStorage.getItem('app_version') == "arabic"){
                    stock_status.innerHTML = "غير متوفر";
                    stock_status.classList.add("stock-status-arabic-orientation");
                }else{
                    stock_status.innerHTML = "Sold Out";
                    stock_status.classList.remove("stock-status-arabic-orientation");
                }             
                stock_status.style.color = '#f60025';
                stock_status.className+= " in-stock-before";
            }
            details_container.appendChild(stock_status);
            denim_container.appendChild(card);
            quickView.addEventListener("click",function(){
                if(data.first[item].stock == "InStock"){
                /*    let ProductNumberOfOrder = 1;*/
                let darkenFullBody = document.createElement("div");
                darkenFullBody.className = "darken-full-body";
                let orderDetailsContainer = document.createElement("div");
                orderDetailsContainer.className = "order-details-container";
                let orderDetailsCol1 = document.createElement("div");
                let orderDetailsCol2 = document.createElement("div");
                let orderDetailsCol3 = document.createElement("div");
                orderDetailsContainer.append(orderDetailsCol1,orderDetailsCol2,orderDetailsCol3);
                let productImg1 = document.createElement("img");
                productImg1.src = data.first[item].imageURL;
                productImg1.style.cssText = "border:2px solid #f60025";
                let productImg2 = document.createElement("img");
                productImg2.src = data.second[item];
                orderDetailsCol1.append(productImg1,productImg2);
                let imgGallary = document.createElement("img");
                imgGallary.src = data.first[item].imageURL;
                orderDetailsCol2.append(imgGallary);
                let cardSection1 = document.createElement("div");
                let list  =  document.createElement("ul");
                let listItem1 = document.createElement("li");
                listItem1.className = "new-product";
                if(data.first[item].new_product == true){
               /* arabic version */
                if(document.body.getAttribute("language-version") == "arabic"){
                    listItem1.innerHTML = "جديد";
                }else{
                    listItem1.innerHTML = "New";
                }
                    listItem1.style.cssText = `background:#f60025;color: #FFFFFF;text-align: center;`;
                    list.append(listItem1);
                }
                let listItem2 = document.createElement("li");
                listItem2.className = "sale";
                if(data.first[item].discount !== 0){
                   /* araibic version */
                    if(document.body.getAttribute("language-version") == "arabic"){
                        listItem2.innerHTML = "خصم"+" "+ data.first[item].discount + "%";
                    }else{
                        listItem2.innerHTML = data.first[item].discount + "%";
                    }
                    
                    listItem2.style.cssText =  `background:#1D215A;color: #FFFFFF;text-align: center;`
                    list.append(listItem2);
                }
                let listItem3 = document.createElement("li");
                listItem3.className = "close";
                listItem3.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
                listItem3.style.cssText = `font-size: 1.9rem;float: right;cursor: pointer;text-align: right;position:relative;top:-16%;left:-4%;`;
                /* arabic version */
                if(document.body.getAttribute("language-version") == "arabic"){
                    listItem3.classList.add("close-arabic-orientation");
                }else{
                    listItem3.classList.remove("close-arabic-orientation");
                }
                list.append(listItem3);
                listItem3.addEventListener('click',function(){
                    orderDetailsContainer.remove();
                    darkenFullBody.remove();
                    document.body.style.cssText = `overflow: scroll;`;
                });
                cardSection1.append(list);
                let cardSection2 = document.createElement("div");
                let cardSection2_headers = document.createElement("div");
                let header = document.createElement("h3");
                /* arabic version */
                if(document.body.getAttribute("language-version") == "arabic"){
                    header.innerHTML = "مقاس";
                }else{
                    header.innerHTML = "Size";
                }
                
                cardSection2_headers.append(header);
                let cardSection2_Sizes = document.createElement("div");
                for(let i = 0; i < data.first[item].size.length; i++){
                    let size_number = document.createElement("span");
                    size_number.className = "size-number";
                    size_number.id = i;
                    size_number.innerHTML = data.first[item].size[i].value;
                    var SoldOut = false;
                    if(data.first[item].size[i].stcok == "SoldOut"){
                       size_number.classList.add("size_not_exist");
                    }
                    cardSection2_Sizes.append(size_number);
                    
                    size_number.addEventListener('click',function(e){
                        let size_spans = document.querySelectorAll('.size-number');
                        e.target.style.cssText = `color:#FFFFFF; border:none; background:#87e293; transition:all .5s ease-in-out;`;
                        /* arabic version */
                        if(document.body.getAttribute("language-version") == "arabic"){
                            header.innerHTML = "مقاس:" +  " " +data.first[item].size[i].value;
                        }else{
                            header.innerHTML = "Size:" +  " " +data.first[item].size[i].value;
                        }
                        
                        for(let x = 0 ; x < size_spans.length; x++){
                            if(e.target.id != x){
                                size_spans[x].removeAttribute("style");
                            }
                        }
                        if(data.first[item].size[i].stcok == "SoldOut"){
                            SoldOut = true;
                        }else{
                            SoldOut = false;
                        }
                    });
                }
                
               cardSection2.append(cardSection2_headers,cardSection2_Sizes);
                let cardSection3 = document.createElement("div");
                cardSection3.className = "card-section-3";
                let cardSection3_row1 = document.createElement("div");
                let cardSection3_row1_col1 = document.createElement("span");
                /* arabic version */
                if(document.body.getAttribute("language-version") == "arabic"){
                    cardSection3_row1_col1.innerHTML = "السعر";
                }else{
                    cardSection3_row1_col1.innerHTML = "Price";
                }
                let cardSection3_row1_col2 = document.createElement("span");
                let cardSection3_row1_col2_row1_col1 = document.createElement("span");
                /* arabic version */
                if(document.body.getAttribute("language-version") == "arabic"){

                    cardSection3_row1_col2_row1_col1.innerHTML = (Number.parseInt(data.first[item].price) ) - (Number.parseInt(data.first[item].price) * data.first[item].discount / 100) + "ج";
                }else{
                    cardSection3_row1_col2_row1_col1.innerHTML = (Number.parseInt(data.first[item].price) ) - (Number.parseInt(data.first[item].price) * data.first[item].discount / 100) + "EGP";
                }
                let cardSection3_row1_col2_row1_col2 = document.createElement("span");
                /* arabic version */
                if(document.body.getAttribute("language-version") == "arabic"){
                    cardSection3_row1_col2_row1_col2.innerHTML = data.first[item].price.split("EGP")[0] + "ج";
                }else{
                    cardSection3_row1_col2_row1_col2.innerHTML = data.first[item].price;
                }
                
                let cardSection3_row1_col2_row2 = document.createElement("span");
                /* araabic version */
                if(document.body.getAttribute("language-version") == "arabic"){
                    cardSection3_row1_col2_row2.innerHTML = "شامل الضرائب. شحن مجاني لجميع الطلبات";
                }else{
                    cardSection3_row1_col2_row2.innerHTML = "Taxes are included. Free shipping on all orders.";
                }
                if(Number.parseFloat(cardSection3_row1_col2_row1_col2.innerHTML)  !== Number.parseFloat(cardSection3_row1_col2_row1_col1.innerHTML)){
                    cardSection3_row1_col2.append(cardSection3_row1_col2_row1_col1);
                    cardSection3_row1_col2_row1_col2.style.cssText = `text-decoration: line-through; color: #f60025;`;
                }
                
                cardSection3_row1_col2.append(cardSection3_row1_col2_row1_col2);
                cardSection3_row1.append(cardSection3_row1_col1,cardSection3_row1_col2,cardSection3_row1_col2_row2);
                let cardSection3_row2 = document.createElement("div");
                let qunatitySpan = document.createElement("span");
                /* arabic version */
                if(document.body.getAttribute("language-version") == "arabic"){
                    qunatitySpan.innerHTML = "الكمية";
                    qunatitySpan.style.paddingTop = "1%";
                }else{
                    qunatitySpan.innerHTML = "Qunatity:";
                }
                  
                let quantitySettings = document.createElement("ul");
                let quantitySettings_li1 = document.createElement("li");
                quantitySettings_li1.className = "quantity-settings-li1";
                quantitySettings_li1.innerHTML = "-";
                quantitySettings_li1.addEventListener('click',function(){
                    ProductNumberOfOrder-=1;
                    quantitySettings_li2.innerHTML = ProductNumberOfOrder; 
                });
                let quantitySettings_li2 = document.createElement("li");
                quantitySettings_li2.className = "quantity-settings-li2";
                quantitySettings_li2.innerHTML = ProductNumberOfOrder;
                let quantitySettings_li3 = document.createElement("li");
                quantitySettings_li3.className = "quantity-settings-li3";
                quantitySettings_li3.innerHTML = "+";
                quantitySettings_li3.addEventListener('click',function(){
                    ProductNumberOfOrder+=1;
                   quantitySettings_li2.innerHTML = ProductNumberOfOrder;
                });
                quantitySettings.append(quantitySettings_li1,quantitySettings_li2,quantitySettings_li3);
                cardSection3_row2.append(qunatitySpan,quantitySettings);
                let cardSection3_row3 = document.createElement("div");
                let addToCartButton  = document.createElement("button");
                addToCartButton.className = "add-to-cart-btn";
                /* arabic version */
                if(document.body.getAttribute("language-version") == "arabic"){
                    addToCartButton.innerHTML = "اضف الى الحقيبة";
                }else{
                    addToCartButton.innerHTML = "Add to Cart";
                }
                
                addToCartButton.addEventListener('mouseover',function(){
                    if(SoldOut == true){
                        addToCartButton.style.cssText = `cursor: not-allowed;`;
                    }
                });
                addToCartButton.addEventListener('mouseout',function(){
                        addToCartButton.removeAttribute("style");
                });
                addToCartButton.addEventListener('click',function(){
                if(header.innerHTML.split(":")[1] !== undefined){
                    if(SoldOut == false){
                    userNumberOfOrders+=1;
                    localStorage.setItem("userNumberOfOrder",userNumberOfOrders);
                    cartShop.title = localStorage.getItem("userNumberOfOrder");
                    let orderDetails = {"imageURL":data.first[item].imageURL,"price_beforDiscount":data.first[item].price,"size":header.innerHTML.split(":")[1],"quantity":ProductNumberOfOrder};
                    if(data.first[item].discount > 0){
                        orderDetails["price_afterDiscount"] = (Number.parseInt(data.first[item].price) ) - (Number.parseInt(data.first[item].price) * data.first[item].discount / 100) + "EGP";
                    }
                    //if(isCartEmpty == false){
                        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
                            console.info( "This page is reloaded" );
                            for(let i = 0 ; i < cartDetailsBackupArr.length ; i++){
                                cartDetailsArr[i] = cartDetailsBackupArr[i];
                            }
                          } else {
                            for(let i = 0 ; i < cartDetailsBackupArr.length ; i++){
                                cartDetailsArr[i] = cartDetailsBackupArr[i];
                            }
                            console.info( "This page is not reloaded");
                          }
                     //   }
                    cartDetailsArr.push(orderDetails);
                    console.log(cartDetailsArr);
                    isCartEmpty = false;
                    localStorage.setItem("orderDeatils",JSON.stringify(cartDetailsArr));
                    darkenFullBody.remove();
                    createShoppingCart();
               
                 
                }
                }else{
                    let sizeWarningAlert = document.createElement("div");
                    sizeWarningAlert.className = "size-warning-alert";
                    sizeWarningAlert.innerHTML = "Please select a size";
                    darkenFullBody.append(sizeWarningAlert);
                    
                                        setTimeout(()=>{
                        sizeWarningAlert.remove();
                    },1000);
                    
                    
                }
            });
                cardSection3_row3.append(addToCartButton);
                cardSection3.append(cardSection3_row1,cardSection3_row2,cardSection3_row3);
                orderDetailsCol3.append(cardSection1,cardSection2,cardSection3);
                darkenFullBody.appendChild(orderDetailsContainer);
                document.body.style.cssText = `overflow: hidden;`;
                document.body.appendChild(darkenFullBody);
             
                productImg1.addEventListener("click",function(e){
                    imgGallary.src = e.target.src;
                    productImg1.style.cssText = "border:2px solid #f60025";
                    productImg2.style.cssText = "none";
                });
                productImg2.addEventListener("click",function(e){
                    imgGallary.src =  e.target.src;
                    productImg2.style.cssText = "border:2px solid #f60025";
                    productImg1.style.cssText = "border:none";

                });
            }
            });
            cardImg.addEventListener('mouseenter',function(){
                cardImg.src = data.second[item];
            });
            cardImg.addEventListener('mouseout',function(){
                cardImg.src = data.first[item].imageURL;
            });
              
            
           
    
        }
    
    }
    }
}

getDenimData("../json/shoes/boats.json");
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

let  app_version  = "english";
let loginBtn = document.querySelector(".login-button");
let usernameWelcomeSpan = document.querySelector(".header_login_signup_container > span");
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
       // languageBox.selectedIndex = 0;
        document.body.classList.remove("arabic-orientation");
        document.body.setAttribute("language-version","english");
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
    }else{
       // languageBox.selectedIndex = 1;
        document.body.classList.add("arabic-orientation");
        document.body.setAttribute("language-version","arabic");
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
    }
}else{
    app_version  = "english";
}

let userStatusSection = document.querySelector(".header_login_signup_container");
let loginContainer = document.querySelector(".login-signup-container");
userStatusSection.onclick = function(){
    loginContainer.classList.toggle("hide");
}
loginBtn.onclick = function(){
    window.location.href = "/html/form.html";
}

    
