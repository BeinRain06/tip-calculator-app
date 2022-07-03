// statements

const doc= document.querySelector('body');
const inputNumberBill= document.querySelector('.bill_sharing0');
const inputNumberSharing= document.querySelector('.bill_sharing1');
const selectTip= document.querySelectorAll('.general_hike');
const selectTip1= document.querySelectorAll("input[type='button']");
const selectRandomTip= document.querySelector('.general_hike');
const selectMainTip= document.querySelector('.main_rate');
const selectTipCustom= document.querySelectorAll("input[type='number']");
const reset= document.querySelector('.reset_btn');
const message1= document.querySelector('.bill .message');
const message2= document.querySelector('.select .message');
const message3= document.querySelector('.people_bill .message');
const formalBoxResult= document.querySelector('.formalbox_result');

const tipAmount= document.querySelector('.amount_result1');
const totalAmount= document.querySelector('.amount_result2');


let i;
let numberBillChecked;
let msg, color;
let test;
let numberPeopleParameter, billParameter, selectTipToBeTaken;

let m;

let coordSelectip ={
    tipValue: 0 ,
    tipPosition: 0 
};




// set error message

function setMessage1(msg, color){
  message1.textContent= msg;
  message1.style.color= color;
}

function setMessage2(msg, color){
  message2.textContent= msg;
  message2.style.color= color;
}

function setMessage3(msg, color){
  message3.textContent= msg;
  message3.style.color= color;
}

function removeMessage(){
  setMessage1("", "");
  setMessage2("", "");
  setMessage3("", "");
}



// active Main select Tip spotlight

inputNumberBill.addEventListener('input', activeMainSelectTip);

function activeMainSelectTip(){
  if( parseFloat(inputNumberBill.value) > 0 ){
    i= selectTip.length - 4;
    selectTip[i].classList.add('main_rate');

  } 
}



// Enter Input Bill Number before selecting a specific Tip Percent

doc.addEventListener('click', enterBillFirst);

function enterBillFirst(e){
  selectMainTip.classList.remove('main_rate');
  e.preventDefault();
  if(e.target.classList.contains('general_hike') && inputNumberBill.value ==='' ){
    setTimeout(setMessage2('Please Enter the Bill First', 'red'), 1000);
    setTimeout(removeMessage, 3000);
  }else if(inputNumberBill.value ==='0'){
    setTimeout(setMessage1("can't be 0", 'red'), 1000);
    setTimeout(removeMessage, 3000);
  }
  else if (parseFloat(inputNumberBill.value) < 0) {
    setTimeout(setMessage1("Can't be negative", 'red'), 1000);
    setTimeout(removeMessage, 3000);
  }
}




// retrieve value entered in custom select Tip

selectTipCustom[1].addEventListener('keyup', retrieveCustomTipValue);

function retrieveCustomTipValue(e){
  coordSelectip.tipValue=e.target.value;
  coordSelectip.tipPosition= selectTip.length-1;
}


// right input Number Bill inserted , choice of select Tip enabled

doc.addEventListener('click', activeSelectTipChoosed);


function activeSelectTipChoosed(e){
  if( parseFloat(inputNumberBill.value) > 0 ){
    if(e.target.classList.contains('rate_hike')){
      e.target.classList.add('main_rate');
      coordSelectip.tipValue= parseFloat(e.target.value);

     
     for(let j=0; j<selectTip1.length-1; j++){
       if(selectTip1[j]===e.target){
        coordSelectip.tipPosition= j;
       }
     }
     
      
     
  
    }else if(e.target.classList.contains('rate_hikenum')){
      e.target.classList.add('main_rate1');
      e.target.style.outline='none'; 
      coordSelectip.tipValue= parseFloat(e.target.value);
      coordSelectip.tipPosition= selectTip.length-1;
    
    }
   
    let k;
    for(let k=0; k<selectTip.length; k++){
      if(selectTip[k] !== e.target){
        selectTip[k].classList.remove('main_rate');
        selectTip[k].classList.remove('main_rate1'); 
      }
    }
   
  }
}

// input people focused retrieve the value of select tip percent

inputNumberSharing.addEventListener('keyup', retrieveLatestSelectTipValue);

function retrieveLatestSelectTipValue (e){
  if(parseFloat(inputNumberBill)>0){
    coordSelectip.tipValue= parseFloat(inputNumberSharing.value);
    coordSelectip.tipPosition= selectTip.length-1;
    if(coordSelectip.tipValue==='' || coordSelectip.tipValue===0){
      setTimeout(setMessage2("Can't be 0", 'red'), 1000);
      setTimeout(removeMessage, 3000);
    }else if(coordSelectip.tipValue<0){
      setTimeout(setMessage1("Can't be negative", 'red'), 1000);
      setTimeout(removeMessage, 3000);
    }
  }

}



// function calculation

function calculation(coordSelectip, numberPeopleParameter, billParameter){

  let tipAmountResult, totalAmountResult;
  let convertSelectTip, factorResult;
  let signDollar= '$';

 

  factorResult= parseFloat((billParameter/numberPeopleParameter).toFixed(2));
  
  convertSelectTip= coordSelectip.tipValue/100;
 
  tipAmountResult=parseFloat((factorResult*convertSelectTip).toFixed(2));

  totalAmountResult=factorResult+tipAmountResult;


  tipAmount.value= signDollar +tipAmountResult;
  totalAmount.value= signDollar +totalAmountResult.toFixed(2);

  // active background color reset
  
  reset.style.background='hsl(172, 67%, 45%)';

  reset.disabled=false;

  // disable  input number Bill
  
    selectTipCustom[0].disabled=true;

}


// keep the select Tip percent focused when inserting value in input Number of people 

inputNumberSharing.addEventListener('input', keepSelectTipPercentActived);

function keepSelectTipPercentActived(e){
  if( parseFloat(inputNumberBill.value) < 0 ){
    setTimeout(setMessage1("Can't be negative", 'red'), 1000);
    setTimeout(removeMessage, 3000);
    e.target.disabled=true;
  }else if(inputNumberBill.value ===''){
    setTimeout(setMessage1("Can't be 0", 'red'), 1000);
    setTimeout(removeMessage, 3000);
    e.target.disabled=true;
  }else if(parseFloat(inputNumberBill.value) > 0 ){
    let m1;
    m1= coordSelectip.tipPosition;
    m2= coordSelectip.tipValue;

    if (m1===0 && m2===0) {
      coordSelectip.tipPosition=selectTip.length-4;
      m1= coordSelectip.tipPosition;
      console.log(coordSelectip.tipPosition);
      coordSelectip.tipValue= parseFloat(selectTip[m1].value);
      selectTip[m1].classList.add('main_rate');

      calculation(coordSelectip,parseFloat(inputNumberSharing.value), parseFloat(inputNumberBill.value));
     
      
    }else if(m1 < selectTip.length-1){
      selectTip[m1].classList.add('main_rate');
      calculation(coordSelectip,parseFloat(inputNumberSharing.value), parseFloat(inputNumberBill.value));
    }else if(m1=== selectTip.length-1 && m2 ===''){
      selectTip[m1].classList.add('main_rate1');
      selectTipCustom[m].classList.add('main_rate1');
      setTimeout(setMessage2("custom value needed", 'red'), 1000);
      setTimeout(removeMessage, 3000);
    }else if(m1=== selectTip.length-1 && m2 < 0){
      selectTip[m1].classList.add('main_rate1');
      setTimeout(setMessage2("can't be negative", 'red'), 1000);
      setTimeout(removeMessage, 3000);
    }else if(m1=== selectTip.length-1 && m2 > 0){
      selectTip[m1].classList.add('main_rate1');

      calculation(coordSelectip,parseFloat(inputNumberSharing.value), parseFloat(inputNumberBill.value));
   
    }
     
  }
    
}


// keep the select Tip percent focused in whatever other cases

doc.addEventListener('click', activatedWhatever);

function activatedWhatever(){



  if(coordSelectip.tipValue === 0 && coordSelectip.tipPosition === 0){
    let i;
    i=selectTip.length-4;
    selectTip[i].classList.add('main_rate');
  }else if(coordSelectip.tipValue !== 0 && coordSelectip.tipPosition >= 0 && coordSelectip.tipPosition < selectTip.length-1){
    let m1;
    m1= coordSelectip.tipPosition;
    selectTip[m1].classList.add('main_rate');
  }else if( coordSelectip.tipPosition === selectTip.length-1 ) {
    let m1;
    m1= selectTip.length-1;
    selectTip[m1].classList.add('main_rate1');
  }
}


// reset Input to zero when a value is focused again

selectTipCustom[0].addEventListener('focus', resetInputToZero1);
function resetInputToZero1(e){
  e.target.value='';
}
selectTipCustom[1].addEventListener('focus', resetInputToZero1);
function resetInputToZero1(e){
  e.target.value='';
}
selectTipCustom[2].addEventListener('focus', resetInputToZero1);
function resetInputToZero1(e){
  e.target.value='';
}


// reset Button  _ Reset The Entire Input Number Value to Zero

function inputAllSetToZero(){
  inputNumberBill.value='';
  inputNumberSharing.value='';
  selectTipCustom[2].value='';
  tipAmount.value='$0.00';
  totalAmount.value='$0.00';
  coordSelectip.tipValue= 0;
  coordSelectip.tipPosition=0;

  reset.style.background='hsl(184, 14%, 56%)';
  reset.disabled=true;

  for( let p=0; p<selectTipCustom.length; p++){
    selectTipCustom[p].disabled=false;
  }

  for(let p=0; p<selectTip.length; p++){
    if(p=== selectTip.length-4){
      selectTip[p].classList.add('main_rate');
    }else{
      selectTip[p].classList.remove('main_rate');
    }
  }
 
}

reset.addEventListener('click',inputAllSetToZero);





