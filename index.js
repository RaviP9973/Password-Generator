var slider = document.getElementById("myRange");

let passLen = document.querySelector('#lengthNumber');
let rand = document.querySelector('.slidecontainer');

let length = 10;
passLen.innerHTML = slider.value;


function handleSlider() {
  slider.value = length;
  passLen.innerHTML = slider.value;

  const min = slider.min;
  
  const max = slider.max; 
  const percentage = ((slider.value - min) * 100 / (max - min));
  slider.style.background = `linear-gradient(to right, violet ${percentage}%, #d3d3d3 ${percentage}%)`;
}

slider.addEventListener('input', () => {
  length = slider.value;
  handleSlider();
});

handleSlider();


const passwordDisplay = document.querySelector('.display');


let genPass = document.querySelector(".generateButton");

//random interger
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//random number
function randomNumber(){
  return randomInt(0,10);
}

//random lowercase
function randomLower() {
  return String.fromCharCode(randomInt(97, 123));
}




//random uppercase
function randomUpper() {
  return String.fromCharCode(randomInt(65, 91));
}




//random symbol
function randomSymbol() {
  let symbol = `!"#$%&'()*+,-./:;<=>?@\\]^_\`{|}~`;
  // console.log(symbol);
  return symbol[(randomInt(0, symbol.length))];
}
// console.log(randomSymbol());

//display password
function displayPassword(pass) {
  let display = document.querySelector('.display');
  display.value = pass;
}

//strength of pass
function passStrength(length) {
  let s = document.querySelector('#dataIndicator');
  let color = strength(length);

  s.style.backgroundColor = color;

}

//shuffle password
function shufflePassword(arr){
  for(let i = arr.length -1; i > 0;i--){
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  let str = "";
  arr.forEach((el)=>{
    str += el
  })
  console.log(str)
  return str;
}


//password generation
function generatePass() {

  if (count <= 0) {
    return;
  }


  // special case
  if (parseInt(passLen.innerHTML, 10) < count) {
    length = count;
    handleSlider();
  }

  let pass = ``;
  
  let funcArr = [];

  if (upper.checked) {
    funcArr.push(randomUpper);
  }
  if (lower.checked) {
    funcArr.push(randomLower);
  }
  if (number.checked) {
    funcArr.push(randomNumber);
  }
  if (symbol.checked) {
    funcArr.push(randomSymbol);
  }

  //compulasary addition
  for (let i = 0; i < funcArr.length; i++) {
    pass += funcArr[i]();
  }

  for (let i = 0; i < length - funcArr.length; i++) {
    let randIndex = randomInt(0, funcArr.length);
    pass += funcArr[randIndex]();
  }


  // console.log(pass);
  pass = shufflePassword(Array.from(pass));
  // console.log(pass);
  displayPassword(pass);

  passStrength(length);

  //copy password
  let copyPass = document.querySelector(".data-copy");

  copyPass.addEventListener('click', () => {
    if (passwordDisplay.value)
      copyContent();
  });

}

//playing with checkbox
let count = 1;
function handleCheckBoxChange(event) {
  if (event.target.checked) {
    count++;
  } else {
    count--;
  }
  // console.log(count);

  //special case
  if (parseInt(passLen.innerHTML, 10) < count) {
    length = count;
    handleSlider();
  }
}

let allCheckBox = document.querySelectorAll('.checkboxContainer');

allCheckBox.forEach((checkBox) => {
  checkBox.addEventListener('change', handleCheckBoxChange);

});





//strength of password
let upper = document.querySelector('#uppercase');

let lower = document.querySelector('#lowercase');
let number = document.querySelector('#numbers');
let symbol = document.querySelector('#symbols');


function strength(length) {
  if (upper.checked && lower.checked && number.checked && symbol.checked && length >= 8) {
    return 'green';
  } else if (upper.checked && lower.checked && number.checked && symbol.checked == false && length >= 8) {
    return 'blue';
  } else if (upper.checked == false && lower.checked && number.checked && symbol.checked == false && length >= 8) {
    return 'yellow';
  } else if (upper.checked == false && lower.checked == false && number.checked && symbol.checked && length >= 8) {
    return 'pink';
  } else {
    return 'red';
  }

}


//copying msg
let copyMsg = document.querySelector('[data-copyMsg]');
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  }
  catch (e) {
    copyMsg.innerText = "Failed";
  }

  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

document.onkeydown = function (e){
  console.log('down key pressed');
  console.log(e);
}