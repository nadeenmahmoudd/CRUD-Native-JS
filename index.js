let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood ="create";
let temp;
// get total
function getTotal(){
    let result =0
    if(price.value !=''){

         result= (+price.value + +taxes.value + +ads.value) 
        - +discount.value ;
        total.innerHTML = result
        total.style.background='#040'
    }
    else{
        total.innerHTML='';
        total.style.background='#a00d02'
    }
    
}

// create product
let dataProducts;
if(localStorage.product != null){
    dataProducts=JSON.parse(localStorage.product)
}
else{
    dataProducts=[]
}
submit.onclick =function(){
    let newProduct = {
       title: title.value.toLowerCase(),
       price: price.value,
       taxes: taxes.value,
       ads: ads.value,
       discount: discount.value,
       total: total.innerHTML,
       count: count.value,
       category: category.value.toLowerCase(),
       
    }
    console.log(newProduct.count);
    //count 
    if(title.value !='' && price.value && category.value && newProduct.count <=100){
    if(mood==='create'){
    if(newProduct.count > 1){
     for( let i=0; i<  newProduct.count; i++){
        dataProducts.push(newProduct);
     }
    }
    else{
    dataProducts.push(newProduct);
    }
}
else{
    dataProducts[temp]=newProduct;
    mood='create',
    submit.innerHTML='Create'
    count.style.display='block'
}
clearData();
    }
    localStorage.setItem('product', JSON.stringify(dataProducts))
    console.log(dataProducts);
    showData();

}

//clear data inputs
function clearData(){
title.value="",
price.value="",
taxes.value="",
ads.value="",
discount.value="",
total.innerHTML="",
count.value="",
category.value=""
}
//Read data
function showData(){
    getTotal();
let table ='';
 for(let i=0 ; i<dataProducts.length; i++){
    // console.log(table);
    table +=`
        <tr>
                        <td>${i +1}</td>
                        <td>${dataProducts[i].title}</td>
                        <td>${dataProducts[i].price}</td>
                        <td>${dataProducts[i].taxes}</td>
                        <td>${dataProducts[i].ads}</td>
                        <td>${dataProducts[i].discount}</td>
                        <td>${dataProducts[i].total}</td>
                        <td>${dataProducts[i].category}</td>
                       <div class="d-flex">
                        <td><button onclick="updateData(${i})" id="update-button" class="btn me-4 w-100">Update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete-button" class="btn me-4 w-100">Delete</button></td>
                       </div>

                    </tr>
    `
 }

document.getElementById('tbody').innerHTML=table;

let deleteAllBtn=document.getElementById('deleteAll');
if(dataProducts.length>0){
deleteAllBtn.innerHTML= `
<button onclick="deleteAll()" class="btn mt-4 w-100">Delete All Products (${dataProducts.length})</button>
`} 
else{
    deleteAllBtn.innerHTML=''
}
}
showData();
//delete one item
function deleteItem(i){
// console.log(i)
dataProducts.splice(i,1);
localStorage.product=JSON.stringify(dataProducts);
showData()
console.log(dataProducts)
}

//delete all data 
function deleteAll(){
localStorage.clear();
dataProducts.splice(0);  //when we select the first index only means it will delete all the data from the first to the last index
showData();
}

//update data 
function updateData(i){
    title.value=dataProducts[i].title,
    price.value=dataProducts[i].price,
    taxes.value=dataProducts[i].taxes,
    ads.value=dataProducts[i].ads,
    discount.value=dataProducts[i].discount,
    category.value=dataProducts[i].category,
    total.value=dataProducts[i].total,
    // count.value=dataProducts[i].count
    count.style.display='none'
    submit.innerHTML='Update'
    mood="update";
    temp=i;
getTotal();
scroll({
    top:0,
    behavior:"smooth"
})

}

// search 
let searchMood='title'
function getSearchMood(id){
    // console.log(id)
    let search = document.getElementById('search');
if(id=='searchTitle'){
searchMood='title';
}
else{
    searchMood='category'
}
search.placeholder='Search by '+searchMood;
// console.log(searchMood);
search.focus();
search.value='';
showData();
}

function searchData(value){
// console.log(value);
let table ='';
for(let i=0; i < dataProducts.length; i++){
if(searchMood=='title'){

    if(dataProducts[i].title.includes(value.toLowerCase())){
        // console.log(i);
        table +=`
        <tr>
                        <td>${i}</td>
                        <td>${dataProducts[i].title}</td>
                        <td>${dataProducts[i].price}</td>
                        <td>${dataProducts[i].taxes}</td>
                        <td>${dataProducts[i].ads}</td>
                        <td>${dataProducts[i].discount}</td>
                        <td>${dataProducts[i].total}</td>
                        <td>${dataProducts[i].category}</td>
                       <div class="d-flex">
                        <td><button onclick="updateData(${i})" id="update-button" class="btn me-4 w-100">Update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete-button" class="btn me-4 w-100">Delete</button></td>
                       </div>

                    </tr>
    `
 }
    
}

else{
        if(dataProducts[i].category.includes(value.toLowerCase())){
            // console.log(i);
            table +=`
            <tr>
                            <td>${i}</td>
                            <td>${dataProducts[i].title}</td>
                            <td>${dataProducts[i].price}</td>
                            <td>${dataProducts[i].taxes}</td>
                            <td>${dataProducts[i].ads}</td>
                            <td>${dataProducts[i].discount}</td>
                            <td>${dataProducts[i].total}</td>
                            <td>${dataProducts[i].category}</td>
                           <div class="d-flex">
                            <td><button onclick="updateData(${i})" id="update-button" class="btn me-4 w-100">Update</button></td>
                            <td><button onclick="deleteItem(${i})" id="delete-button" class="btn me-4 w-100">Delete</button></td>
                           </div>
    
                        </tr>
        `
     }
    }
}
document.getElementById('tbody').innerHTML=table;

}