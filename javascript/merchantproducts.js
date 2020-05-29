function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  const tableContainer = document.querySelector('#product-table-container');
  let userName = document.querySelector('#user-name');
  let userName2 = document.querySelector('#user-name2');
  let userPayload = localStorage.getItem('payload');

console.log(JSON.parse(userPayload));
const userNames = () =>{
        let payload = JSON.parse(userPayload);
        userName.innerHTML = `${payload.First_Name} ${payload.Last_Name}`; 
        userName2.innerHTML = `${payload.First_Name} ${payload.Last_Name}`; 
}
userNames();
  const merchantProducts = async () =>{
    const getProducts = async () =>{
      const response = await fetch('https://evonline.herokuapp.com/api/v1/wholesaler/products', {
        method: 'GET',
        headers :{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
      })
      const json = await response.json();
      if(json.data){
        let myProducts = json.data;
        let template = '';
  
        myProducts.map((product, i) =>{
          let id = i + 1 ;
          template+=`<tr id="${product._id}">
                          <td>${id}</td>
                          <td>${product.name}</td>
                          <td>${product.category}</td>
                          <td>50</td>
                          <td>${product.price}</td>
                          <td>${product.numberAvailable}</td>
                          <td>${product.image}</td>
                          <td><i class="del fas fa-trash-alt" id="${product._id}"></i></td>
                        </tr>
                        `
        })
        tableContainer.insertAdjacentHTML('afterend', template);
      }
      console.log(json);
    }

      const updateProduct = async () =>{
              await getProducts();
              var btn = document.getElementsByClassName("del");
              for(i= 0; i< btn.length; i++){
                btn[i].onclick = function() {
                  console.log(this);
                  deleteMyProduct(this.id);
              };
            }
            const deleteMyProduct = async (productId) =>{
              const wholeItem = document.getElementById(`${productId}`)
              const response = await fetch(`https://evonline.herokuapp.com/api/v1/wholesaler/products/${productId}`, {
                method: 'DELETE',
                headers :{
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
              }
              })
              console.log(response);
              if(response.ok){
               wholeItem.innerHTML = '';
              }
            }

            
      }
      updateProduct();
  }
  merchantProducts();
  

