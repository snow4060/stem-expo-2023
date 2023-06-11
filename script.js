document.addEventListener("DOMContentLoaded", async function() {
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

    console.log(document.querySelector('.small-text').innerHTML);

});

var firstDiv = document.querySelector('.logo-background');
var secondDiv = document.querySelector('.purpose');
secondDiv.style.top = '100vh';
  
window.addEventListener('wheel', function(event) {
    event.preventDefault();
    var scrollAmt = event.deltaY*300;
    var top = parseFloat(secondDiv.style.top.slice(0, -2));
    var newTop = top - scrollAmt/window.innerHeight;
    let j = 0;
    for(let i = 0; Math.abs(i) < Math.abs(newTop-top); i+= (newTop-top)/20){
        j++;
        setTimeout(() => {
            if((top+i) >= 100){
                secondDiv.style.top = '100vh';
            }
            else if((top+i) <= 0){
                secondDiv.style.top = '0vh';
            }
            else{
            
            secondDiv.style.top = (top + i) + 'vh';
            firstDiv.style.filter = 'brightness(' + (parseFloat(secondDiv.style.top.slice(0, -2))) + '%)';
            console.log(firstDiv.style.filter);

            }
        }, j*6);
        
    }
});
  