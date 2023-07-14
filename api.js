console.log('connetcted!');

function allphone(searchText,dataLimit){


    console.log('Hey!');

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayData(data.data,dataLimit))
}


// function for display

function displayData(data,dataLimit){


  // data= data.slice(0,9);
  const showall= document.getElementById('btn-container');
  if( dataLimit && data.length>10){

    data= data.slice(0,9);
    showall.classList.remove('d-none');
  }
  else
  {
    showall.classList.add('d-none');
  }
  

  // if no phone found ...
  const message= document.getElementById('ifnot');
  if(data.length===0){

    message.classList.remove('d-none');
  }
   else{

     message.classList.add('d-none');
   }

//  console.log(data);
const mainDiv= document.getElementById('maincontainer');
mainDiv.innerText='';
 for(const user of data){
    console.log(user);

    const element= document.createElement('div');
      element.classList.add('col');
// slug
    element.innerHTML= `
    
    <div class="card h-100 p-3 rounded">
    <img class="img-fluid" src="${user.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${user.phone_name}</h5>
      <h6 class="card-title">${user.slug}</h6>
      <p class="card-text">The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.</p>
      </div>

      <button onclick='phoneDetails("${user.slug}")' type="button" class="btn btn-primary"style="width: 140px; height:40px" data-bs-toggle="modal" data-bs-target="#exampleModal">
       Show Detail's
       </button>
     </div>
    

     
     </div>
   </div>
   
    
    
    
    `;
    mainDiv.appendChild(element);  

}
// Stop! Loader....
toggleSpinner(false);


}

function processearch(dataLimit) {        

  toggleSpinner(true)
  const textField= document.getElementById('input_field').value;
  console.log(textField);
  allphone(textField,dataLimit);
}

// input field enter handelar.....

document.getElementById('input_field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      
      processearch(10);
    }
});

// for dinamic...
function searchitem(){
  // start loader.....
//   toggleSpinner(true)
// const textField= document.getElementById('input_field').value;
// console.log(textField);
// allphone(textField);
processearch(10)
}

// toggle spinner function for add search reasult....

const toggleSpinner= isLoading => {
  

   const loaderSection = document.getElementById('loader');

   if(isLoading){

    loaderSection.classList.remove('d-none');
   }
   else
   {
    loaderSection.classList.add('d-none');

   }


}
// click show all button....
document.getElementById('showBtn').addEventListener('click',function(){

   processearch();


})






// calling Function.. data
// allphone('iphone');



//  more data load by modal .....

 function phoneDetails(id){

const url = `https://openapi.programming-hero.com/api/phone/${id}`;
fetch(url)
  .then(response => response.json())
  .then(data => moredisplay(data))



}
function moredisplay(data){

  console.log(data.data.slug);
  document.getElementById('exampleModalLabel').innerText=data.data.slug ;
  document.getElementById('hod').innerHTML= `
  <h4>${data.data.name}</h4>
  <img src="${data.data.image}" alt="">
  <p>${data.data.releaseDate ? data.data.releaseDate: 'No Relase Date Found'}</p>
  <p>${data.data.mainFeatures.storage}</p>
  <p>${data.data.mainFeatures.displaySize}</p>
  <h6>${data.data.mainFeatures.memory}</h6>
  <p>${data.data.others.GPS}</p>
  
  
  
  
  
  
  `
  // hod
  // mainFeatures
}
allphone('apple');