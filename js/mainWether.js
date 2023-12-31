//================Selected inpust Search=============
let searchInput=document.querySelector('.inputSearch input');
let searchInputValue;

// =============Selected Elements  ===================
let today=document.querySelector('#today');

let month=document.querySelector('#month');

let locationCity=document.querySelector('#locationName');

let conditionImage=document.querySelector('#conditionImage');

let temp_c=document.querySelector('#temp_c');

let clear=document.querySelector('#clear');

let humidity=document.querySelector('#humidity');

let wind_kph=document.querySelector('#wind_kph');


let wind_dir=document.querySelector('#wind_dir');


let detalise=document.querySelector('.detalise');


let tempBody=document.querySelector('.tempBody_h ')

let tomContent=document.querySelectorAll('.tempCont_h')

// ==================next selectors ==================
let tomImage=document.querySelectorAll('#tomImage')

let maxTemp_c=document.querySelectorAll('#maxTemp_c');

let minTemp_c=document.querySelectorAll('#minTemp_c');


let tomClear=document.querySelectorAll('#tomClear');

//============== list of Days and Month   =====================
monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
   days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
//========== Date Object Data ===========================
let date=new Date();

let is_dayIndex=date.getDay();


let is_monthIndex=date.getMonth();
let is_day=days[is_dayIndex];
//========== Date Object Data ===========================
let is_Tomorwo;
let is_nextTomorowo;
let is_month=monthName[is_monthIndex];
let is_dayDate=date.getDate();






//============= api  fectch      function getWeatherData()===================================
let apiData;
let city='Cairo';
async function getWeatherData(city){
  
 let apiResponse=await 
 fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${city}&days=3`);

     apiData=await apiResponse.json();
    console.log(city,apiData);
    
  
   
    displayData(city);
    displayNextday();

}

//====== calling  function getWeatherData()===================


getWeatherData(city);


//========== display()========

function displayData(city){


   

    today.innerHTML=is_day;
    month.innerHTML=` ${is_dayDate} ${is_month} `;
   


   locationCity.innerHTML=city

  
    temp_c.innerHTML=`<h2 id="temp_c">${apiData.current.temp_c} <span class="supA">o</span> <span class="supC">C</span></h2>`
    conditionImage.setAttribute('src',`https:${apiData.current.condition.icon}`);
    conditionImage.classList.remove('border');
    clear.innerHTML=apiData.current.condition.text;

   humidity.innerHTML=`<p id="humidity"><span><i class="fas fa-umbrella pr-1" ></i></span> ${apiData.current.humidity } <span>%</span></p> `

   wind_kph.innerHTML=`<p id="wind_kph"><span><i class="fas fa-wind pl-3 pr-1"></i></span> ${apiData.current.wind_kph} <span>km/h</span></p>` 

     wind_dir.innerHTML=`<p id="wind_dir"><span><i class="far fa-compass pl-3 pr-1"></i></span> ${apiData.current.wind_dir} </p> `


    tempBody.classList.remove('tempBody_h')
}


//================ dispaly nextDay           =========================









function displayNextday(){
  for(let i=0;i<2;i++){
  let tomorrow=document.querySelectorAll('.tomorrow');

  let tomDate=apiData.forecast.forecastday[i+1].date;
 
  const d = new Date(tomDate);
 
  tomorrow[i].innerHTML=days[d.getDay()];

  tomImage[i].setAttribute('src',`https:${apiData.forecast.forecastday[i+1].day.condition.icon}`);
 
  maxTemp_c[i].innerHTML=`<h2 class="" id="maxTemp_c" >${apiData.forecast.forecastday[i+1].day.maxtemp_c} <span class="supA">o</span> <span class="supC">C</span></h2>`
  
  minTemp_c[i].innerHTML=`<p class="py-1" id="minTemp_c">${apiData.forecast.forecastday[i+1].day.mintemp_c} <span class="supA">o</span> <span class="supC">C</span></p>`
  tomClear[i].innerHTML=`<p class="sunny mb-3 mt-3" id="tomClear">${apiData.forecast.forecastday[i+1].day.condition.text}</p>`
   tomClear[i].classList.add('mt-5')


  

}


tomContent.forEach((tomContents)=>{
   tomContents.classList.remove('tempCont_h');
})
  }






// ==================

searchInput.addEventListener('keyup',function(e){
   
   searchInputValue=searchInput.value;
   console.log(searchInputValue);
  
      getWeatherData(searchInputValue);
   
});


  