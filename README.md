# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

This Projects leads to construct a Tip Calculator App.
The **Tip Calculator App** principal function is to calculate according to an **interest hike** the basis of an amount money every single participants of an activity will have to spend, share or keep to make the activity live or be done.  

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

*Desktop*

![./Desktop_Screenshot.png]


*Mobile*

![./Mobile_Screenshot.png]

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [https://github.com/BeinRain06/tip-calculator-app.git](https://your-solution-url.com)
- Live Site URL: [https://beinrain06.github.io/tip-calculator-app/](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Javascript


### What I learned

*Select Tip value stored*

Mainly to do a Tip Calculator app, css and html style take apart , you need to deal with **data objects**. It helps store interest hike(*Selectip Tip*) selected, before performing the calculation.

The statement below shows how i used Javascript to hook the percent select tip value selected:

```js
let coordSelectip ={
    tipValue: 0 ,
    tipPosition: 0 
};

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
}
```

*Maintain select Tip value Focused*

I also have a real headache to keep the value of Select Tip focused , while clicking somewhere else in the inner part of the Calculator Body. These due to the two different kinds of input used. `input:button` and `input:number`.
here is hte part of the code who helps me achieve a remaining focused select Tip value :

```js
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
}
```

*Grid Tool instead of Flexbox*

I definitely have spinned in this section you might guess. The select Tip section made me rewrite my html code in the kind that it can be suitable to apply css the Grid. Why? Because i experienced difficulties as the media query mobile part of Select Tip style changed from what have be done to the Desktop styly. making me try to write an other javascript  just for the mobile part. But it was a kind of weird when i wrote the firt line of the script of mobile scren.It wasn't reponsive with the mobile css style did.
Then i remind css will suit good like it could help me design both the desktop and mobile part os the selectip section with easily.
you could look below how i made it for **mobile part** :

```css
.formalbox_calculation .select_tip .main_grid{
    position: relative;
    left: 0rem;
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 2rem;
    margin: 0 auto;
  
  }
  
  .formalbox_calculation .main_grid :first-child{
    grid-column: 1/ span 1;
    grid-row: 1/ span 1;
    width: 100%;
  }
  .formalbox_calculation .main_grid :nth-child(2){
    grid-column: 2/ span 1;
    grid-row: 1/ span 1;
   
  }
  .formalbox_calculation .main_grid :nth-child(3){
    grid-column: 1/ span 1;
    grid-row: 2/ span 1;
   
  }
  .formalbox_calculation .main_grid :nth-child(4){
    grid-column: 2/ span 1;
    grid-row: 2/ span 1;
  }
  .formalbox_calculation .main_grid :nth-child(5){
    grid-column: 1/ span 1;
    grid-row: 3/ span 1;
  }
  .formalbox_calculation .main_grid :last-child{
    grid-column: 2/ span 1;
    grid-row: 3/ span 1;
  }
```

*inner arrows(down/up) into input: number removed*

Concerning the inner input and outer spin button appearing when `input:number` is generated into the **input tag**  field. here this snippet code that help me get through it :  

```css
input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button{
   -webkit-appearance:none;
   -moz-appearance:none;
    appearance: none;
    margin-right: 1.4rem;  
 }
```

### Continued development

This project tease me to tackle other types of calculator.

But i need to and i want to figure out how improve the responsiveness of the Tip Calculator in the way how:
For a **specific Bill** and **choosed select tip**  picked , a **number of people entered**, and **the calculation** perfomed, how to operate a `new calculation` for the same *specific Bill*  but *the active select Tip changed* , as well as *the number of people grabbed *  


### Useful resources

- **W3Schools**[htpps://w3schools.com] - There is alot of reason to use w3Schools like resources, when being Developer. one of these is that it reaaly a handfull website they teach to code from whatever properties methods, tags, attributes, object ,or anything else... you could encounter in your journey like a programmer.
In this project its helps me figure out which `events` will suit with our project, the method `setTimeout()` 
- **StackoverFlow**[https://stackoverflow.com/questions/60717695/how-to-store-some-data-on-a-click-event-in-js] - have a clue to how to store some data on a click event with JS(javasript)
- **StackoverFlow**[https://stackoverflow.com/questions/33501696/how-to-return-value-from-addeventlistener] - have a clue how to return value from an addEventListener
- **raddevon**[https://raddevon.com/articles/share-variable-two-event-handlers-javascript/] - This articles clarify the need of object data with his shown example, through that project.
- **rollbar**[https://rollbar.com/blog/javascript-typeerror-cannot-read-property-of-undefined/]- helps me understand about object data , giving a specific example.
- **javascript.info**[https://javascript.info/events-change-input] - Teach me about the event `input` with this article


## Author

- Website - [Ngouend Raoul Gerard](https://www.your-site.com)
- Frontend Mentor - [@BeinRain06](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@nest_Ngoueni](https://www.twitter.com/yourusername)


## Acknowledgments

Thanks to Brad's Traversy Media on Youtube which help me figure out that data object is necessary and suitable for this kind of project.

I  thanks Matt Studdert and all the crew  of FrontEndMentor. This project learn me a lot how to implement basis methods and properties of Javascript. I wished to thanks you also.


