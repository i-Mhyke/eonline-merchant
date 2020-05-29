function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

let form = document.querySelector('form');
let name = document.querySelector('#name');
let category = document.querySelector('#category');
let price = document.querySelector('#price');
let number = document.querySelector('#numberAvailable');
let image = document.querySelector('#image');

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

form.addEventListener('submit', submitForm);


function submitForm(e) {
    e.preventDefault();
    
    fetch('https://evonline.herokuapp.com/api/v1/wholesaler/products', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: new FormData(form)
    })
    .then(res=>res.json())
    .then(data=> {
        console.log(data)
        if(data){
            output.innerHTML = `<p>Product uploaded successfully!</p>`;
            output.className = 'success';
        }
    })
    
    
}
