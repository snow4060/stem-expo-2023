var pages;
async function loadPages(){
    pages = document.querySelectorAll('.container');
    console.log(pages);
    pages[0].classList.add('focus');
    pages[0].style.top = '0';
    for(let i = 1; i < pages.length; i++){
        pages[i].style.top = '100vh';
    }
}





document.addEventListener("DOMContentLoaded", async function() {
    loadPages();
    // Get the animated-text element
    const animatedText = document.querySelector(".large-text");
    
    // Split the text into individual characters
    const characters = animatedText.textContent.split("");
    
    // Clear the original text content
    animatedText.textContent = "";
    
    // Loop through the characters and append them one by one with a delay
    characters.forEach(function(char, index) {
      const delay = index * 100; // Adjust the delay time as needed
      setTimeout(function() {
        animatedText.textContent += char;
      }, delay);
    });

    setTimeout(() => {
            document.querySelector('.small-text').style.visibility = 'visible';
    }, characters.length*100 + 150);
});

function scroll(div1, div2, amt){
    var top = parseFloat(div2.style.top.slice(0, -2));
    var newTop = top - amt/window.innerHeight;
    let j = 0;
    for(let i = 0; Math.abs(i) < Math.abs(newTop-top); i+= (newTop-top)/20){
        j++;
        setTimeout(() => {
            if((top+i) >= 100){
                div2.style.top = '100vh';
                div1.classList.add('focus');
                div2.classList.remove('focus');
                div2.classList.remove('progress');
                return;
            }
            else if((top+i) <= 0){
                div2.style.top = '0vh';
                div1.classList.remove('focus');
                div2.classList.add('focus');
                div2.classList.remove('progress');
                return;
            }
            else{
            
            div2.style.top = (top + i) + 'vh';
            div1.style.filter = 'brightness(' + (parseFloat(div2.style.top.slice(0, -2))) + '%)';            div2.classList.add('progress');

            }
        }, j*6);
            
    }
}

var firstDiv, secondDiv;


window.addEventListener('wheel', function(event) {
    if(pages[2].style.top === '0vh'){
        pages[2].style.overflowY = 'scroll';
    }
    else{
        pages[2].style.overflowY = 'hidden';
    }
    //positive: scroll down
    if(event.deltaY > 0){
        event.preventDefault();        
        //find the page that is in focus
        for(let i = 0; i < pages.length; i++){
            if(pages[i].classList.contains('focus')){
                firstDiv = pages[i];
                secondDiv = pages[i+1];
            }
            if(pages[i].classList.contains('progress')){
                firstDiv = pages[i-1];
                secondDiv = pages[i];
                break;
            }
        }
        //prevent overflow
        if(Array.prototype.indexOf.call(pages, firstDiv)+1 >= pages.length || Array.prototype.indexOf.call(pages, secondDiv) < 1){
            return;
        }
        // console.log(firstDiv.scrollHeight)
        if(firstDiv.classList.contains('panelist-schedule') && firstDiv.scrollTop + firstDiv.clientHeight < firstDiv.scrollHeight){ 
            return; 
        }

        scroll(firstDiv, secondDiv, event.deltaY*300);
    }
    // negative: scroll up 
    else{
        console.log("triggered")
        var firstDiv, secondDiv;
        //find the page that is in focus
        for(var i = 0; i < pages.length; i++){
            if(pages[i].classList.contains('focus')){
                console.log("focus")
                firstDiv = pages[i-1];
                secondDiv = pages[i];
            }
            if(pages[i].classList.contains('progress')){
                console.log("progress")
                firstDiv = pages[i-1];
                secondDiv = pages[i];
                break;
            }
        }
        //prevent overflow
        if(Array.prototype.indexOf.call(pages, secondDiv) < 1){ return; }
        if(secondDiv.classList.contains('panelist-schedule') && secondDiv.scrollTop > 0){ return; }
        scroll(firstDiv, secondDiv, event.deltaY*300);
    }
});
  

var panelistsContainer = document.getElementById('panelists');
var panelistsContainerBack = document.getElementById('panelist-back');

panelistsContainerBack.style.height = panelistsContainer.clientHeight + 'px';

window.addEventListener('resize', function(){
    panelistsContainerBack.style.height = panelistsContainer.clientHeight + 'px';
})

window.addEventListener('load', function(){
    var rows = document.querySelectorAll(".schedule-row");
    var tallestHeight = 0;
    rows.forEach(function(row){
        if(row.offsetHeight > tallestHeight){
            tallestHeight = row.offsetHeight;
        }
    })
    console.log(tallestHeight)
    rows.forEach(function(row){
        row.style.height = tallestHeight + 'px';
    })
})