var pages;
async function loadPages(){
    pages = document.querySelectorAll('.container');
    console.log(pages);
    pages[0].classList.add('focus');
    pages[0].style.top = '0';
    for(let i = 1; i < pages.length; i++){
        pages[i].style.top = '100vh';
    }
    pages[2].scrollTop = 0;
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

function wait(timeout){
    return new Promise(function(resolve) {
        setTimeout(resolve, timeout);
    });
}

async function scroll(div1, div2, amt, full=false){
    console.log("scroll");
    var top = parseFloat(div2.style.top.slice(0, -2));
    
    if(full && amt > 0){
        var newTop = 0;
    }
    else if(full && amt < 0){
        var newTop = 100;
    }
    else{
        var newTop = top - 10*Math.sign(amt);
    }
    for(let i = 1; Math.abs(i) <= Math.abs(newTop-top); i+= 1*Math.sign(newTop-top)){
        console.log("e");
        if((top+i) >= 100 && amt < 0){
            div2.style.top = '100vh';
            div1.classList.add('focus');
            div2.classList.remove('focus');
            div2.classList.remove('progress');
            pauseScroll();
            console.log("case 1");
            break;
        }
        else if((top+i) <= 0 && amt > 0){
            div2.style.top = '0vh';
            div1.classList.remove('focus');
            div2.classList.add('focus');
            div2.classList.remove('progress');
            pauseScroll();
            console.log("case 2");
            break;
        }
        else{
            div2.style.top = (top + i) + 'vh';
            div1.style.filter = 'brightness(' + (parseFloat(div2.style.top.slice(0, -2))) + '%)';            
            div2.classList.add('progress');
            console.log("scrolling");
            await wait(1);
        }
            
    }
}

var sponsors = document.querySelector('.sponsors');
var clubsContainer = document.querySelector('.clubs-container');
clubsContainer.style.top = '100vh';
clubsContainer.style.opacity = 0;
var organizerContainer = document.querySelector('.organizer-container');
organizerContainer.style.top = '100vh';
var clubsIconsContainer = document.querySelector('.clubs-icons-container');
clubsIconsContainer.style.marginLeft = '80%';

async function scrollLast(event, full=false){
    console.log("scroll last: " + event.deltaY);
    // var scrollAmt = event.deltaY*150;
    var top = parseFloat(organizerContainer.style.top.slice(0, -2));
    var newTop = top - 17*Math.sign(event.deltaY);
    if(full && event.deltaY > 0){
        newTop = 100;
    }
    else if(full && event.deltaY < 0){
        newTop = 50;
    }
    for(let i = 1; Math.abs(i) <= Math.abs(newTop-top); i += 1*Math.sign(newTop-top)){
        if((top+i) >= 100 && event.deltaY < 0){
            clubsContainer.style.top = '100vh';
            organizerContainer.style.top = '100vh';
            clubsIconsContainer.style.marginLeft = '80%';
            sponsors.classList.add('focus');
            organizerContainer.classList.remove('focus');
            organizerContainer.classList.remove('progress');
            return;
        }
        else if((top+i) <= 50 && event.deltaY > 0){
            organizerContainer.style.top = '50vh';
            clubsContainer.style.opacity = 1;
            clubsIconsContainer.style.marginLeft = '0';
            sponsors.classList.remove('focus');
            organizerContainer.classList.add('focus');
            organizerContainer.classList.remove('progress');
            return;
        }
        else{
            // clubsBack.style.filter = 'brightness(' + Math.abs((1 - (top+i)/50)*100) + '%)';
            clubsContainer.style.top = '0';
            clubsContainer.style.opacity = Math.abs((100-top-i)/50);
            clubsIconsContainer.style.marginLeft = (Math.abs(top+i-50)/50*80) + '%';
            console.log((Math.abs(top+i-50)/50)*80)
            organizerContainer.style.top = (top+i) + 'vh';
            organizerContainer.classList.add('progress');
            await wait(1);
        }
    }
}

async function scrollPage(event, full=false){
    console.log("scroll page function call");
    var top = pages[2].scrollTop;
    var delta = pages[2].clientHeight*0.1*Math.sign(event.deltaY);
    if(full && event.deltaY > 0){
        delta = pages[2].scrollHeight - top;
    }
    else if(full && event.deltaY < 0){
        delta = -top-2;
    }
    console.log("delta: " + delta);
    for(let i = 1; Math.abs(i) <= Math.abs(delta); i += delta*0.1){
        if(pages[2].scrollTop + pages[2].clientHeight >= pages[2].scrollHeight && event.deltaY > 0){
            pages[2].scrollTop = pages[2].scrollHeight;
            console.log("case 1");
            pauseScroll();
            return;
        }
        else if(pages[2].scrollTop <= 0 && event.deltaY < 0){
            pages[2].scrollTop = 0;
            console.log("case 2");
            pauseScroll();
            return;
        }
        else{
            console.log("attempted scrolling");
            pages[2].scrollTop = top+i;
            console.log(pages[2].scrollTop);
            await wait(1);
        }
    }
}

function handleScroll(event, full=false) {
    //whether allow scrolling on panelist page 
    if(parseFloat(pages[2].style.top.slice(0, -2)) == 0 && pages[3].style.top.slice(0, -2) >= 100){
        console.log("scroll top: " + pages[2].scrollTop);
        console.log("client height: " + pages[2].clientHeight);
        console.log("scroll height: " + pages[2].scrollHeight);
        scrollPage(event, full);
    }

    //positive: scroll down
    if(event.deltaY > 0){
        if(sponsors.classList.contains('focus') && !sponsors.classList.contains('progress')){
            scrollLast(event, full);
            return;   
        }       
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
            console.log("schedule protection");
            console.log(firstDiv.style.overflowY);
            return; 
        }
        console.log("normal scroll call");
        scroll(firstDiv, secondDiv, event.deltaY, full);
    }
    // negative: scroll up 
    else{
        if(organizerContainer.classList.contains('focus') || organizerContainer.classList.contains('progress')){
            scrollLast(event, full);
            return;
        }
        //find the page that is in focus
        for(var i = 0; i < pages.length; i++){
            if(pages[i].classList.contains('focus')){
                firstDiv = pages[i-1];
                secondDiv = pages[i];
            }
            if(pages[i].classList.contains('progress')){
                firstDiv = pages[i-1];
                secondDiv = pages[i];
                break;
            }
        }
        //prevent overflow
        if(Array.prototype.indexOf.call(pages, secondDiv) < 1){ return; }
        if(secondDiv.classList.contains('panelist-schedule') && secondDiv.scrollTop > 0){ return; }

        scroll(firstDiv, secondDiv, event.deltaY, full);
    }
}

function pauseScroll(){
    window.removeEventListener('wheel', handleScroll);
    setTimeout(() => {
        window.addEventListener('wheel', handleScroll);
        console.log('pause scroll');
    }, 100);
}

var firstDiv, secondDiv;
window.addEventListener('wheel', handleScroll, { passive: false });


var panelistsContainer = document.getElementById('panelists');
var panelistsContainerBack = document.getElementById('panelist-back');

panelistsContainerBack.style.height = panelistsContainer.clientHeight + 'px';


document.querySelector('.bracket-text').style.marginTop = '-' + document.querySelector('.bracket').clientHeight + 'px';
console.log(document.querySelector('.bracket-text').style.marginTop);



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
    rows.forEach(function(row){
        row.style.height = tallestHeight + 'px';
    })
});

var clubImg = document.querySelector('.club-image');
var clubTitle = document.getElementById('club-title');
var description = document.querySelector('.description');
var contact = document.getElementById('contact');
var instagram = document.getElementById('instagram');
var instagramAcc = document.getElementById('instagram-account');
var email = document.querySelector('.email');

function setDescription(name){
    if(name == "AIAS"){
        clubImg.src = "club-logo/aias.jpg";
        clubTitle.innerHTML = "AIAS";
        description.innerHTML = "American Institute Architecture Society";
        contact.innerHTML = "Contact:";
        instagram.innerHTML = "Instagram: @";
        instagramAcc.innerHTML = "indyaias";
        instagramAcc.href = "https://www.instagram.com/indyaias/";
        email.innerHTML = "";
    }
    if(name == "Computer Science"){
        clubImg.src = "club-logo/cs.png";
        clubTitle.innerHTML = "Computer Science Club";
        description.innerHTML = "computer science club is where you learn cs";
        contact.innerHTML = "Contact: ";
        instagram.innerHTML = "Instagram: @";
        instagramAcc.innerHTML = "ihscsclub76";
        instagramAcc.href = "https://www.instagram.com/ihscsclub76/";
        email.innerHTML = "Email: ihscompsciclub76@gmail.com";
    }
}


var clubsContainerTitle = document.getElementById('clubs-container-title');
var clubInfoContainer = document.querySelector('.club-info-container');
var organizerContent = document.querySelector('.organizer-content');
clubInfoContainer.style.visibility = 'hidden';


document.body.addEventListener('click', function(event){
    console.log("click");
    console.log(clubInfoContainer.style.visibility);
    if(event.target.matches('.club-info') && clubInfoContainer.style.visibility === 'hidden'){
        setDescription(event.target.alt);
        console.log("show")
        if(!clubInfoContainer.classList.contains('enlarge-appear')){
            clubInfoContainer.classList.remove('enlarge-disappear');
            clubInfoContainer.classList.add('enlarge-appear');
        }
        if(!clubsContainerTitle.classList.contains('blur-disappear')){
            clubsContainerTitle.classList.remove('blur-appear');
            clubsContainerTitle.classList.add('blur-disappear');
        }
        if(!clubsIconsContainer.classList.contains('blur-disappear')){
            clubsIconsContainer.classList.remove('blur-appear');
            clubsIconsContainer.classList.add('blur-disappear');
        }
        if(!organizerContent.classList.contains('blur-disappear')){
            organizerContent.classList.remove('blur-appear');
            organizerContent.classList.add('blur-disappear');
        }
        clubInfoContainer.style.visibility = 'visible';
    }
    else if(!clubInfoContainer.contains(event.target) && clubInfoContainer.style.visibility === 'visible'){
        console.log('remove')
        if(!clubInfoContainer.classList.contains('enlarge-disappear')){
            clubInfoContainer.classList.remove('enlarge-appear');
            clubInfoContainer.classList.add('enlarge-disappear');
        }
        if(!clubsContainerTitle.classList.contains('blur-appear')){
            clubsContainerTitle.classList.remove('blur-disappear');
            clubsContainerTitle.classList.add('blur-appear');
            console.log(clubsContainerTitle.classList);
        }
        if(!clubsIconsContainer.classList.contains('blur-appear')){
            clubsIconsContainer.classList.remove('blur-disappear');
            clubsIconsContainer.classList.add('blur-appear');
        }
        if(!organizerContent.classList.contains('blur-appear')){
            organizerContent.classList.remove('blur-disappear');
            organizerContent.classList.add('blur-appear');
        }
        setTimeout(() => {
            clubInfoContainer.style.visibility = 'hidden';
        }, 100);
    }
});


document.addEventListener('keydown', function(event){
    if(event.key === 'ArrowUp'){
        handleScroll({deltaY: -1});
    }
    else if(event.key === 'ArrowDown'){
        handleScroll({deltaY: 1});
    }
    else if(event.key === 'PageUp'){
        handleScroll({deltaY: -1}, true);
    }
    else if(event.key === 'PageDown'){
        console.log('page down');
        handleScroll({deltaY: 1}, true);
    }
})