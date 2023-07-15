const mobileDesign = window.matchMedia("(max-width: 375px)");
const desktopDesign = window.matchMedia("(min-width: 376px)");
const researchContainer = document.getElementById('researchContainer');
const menu = document.getElementById('burgerMenu');
const scrollMenu = document.getElementById('scrollMenu')
const header = document.querySelector('header');
const endMain = document.getElementById('endMain');
const headerLogo = document.getElementById('headerLogo');

const input = document.querySelector('input');
const submitbtn = document.getElementById('submit');
const outputContainer = document.getElementById('outputContainer');
const statisticDescContainer = document.getElementById('statisticDescContainer');

let outputContainerHeight= 0 ;
///////////////searchContainer backgroud Image = > responsive///////////////////
const changeBackgroundImage = () =>{
    if(mobileDesign.matches){
        researchContainer.style.backgroundImage='url(images/bg-boost-mobile.svg)';
        endMain.style.backgroundImage='url(images/bg-boost-mobile.svg)';
    }  else{
        researchContainer.style.backgroundImage ='url(images/bg-boost-desktop.svg)';
        endMain.style.backgroundImage='url(images/bg-boost-desktop.svg)';
        scrollMenu.style.display ='flex';
    }
}
// Call the initial function to set the background image on the initial page load
changeBackgroundImage();

// Add event listeners for screen size changes
mobileDesign.addListener(changeBackgroundImage);
desktopDesign.addListener(changeBackgroundImage);

/////////////////////eventListner BurgerMenu (mobile)///////////////////
const showMenu = () =>{

    scrollMenu.classList.toggle('hiden');
    scrollMenu.classList.toggle('showMenu')
    header.style.flexWrap ='wrap'
}
const hideMenu = () =>{
    scrollMenu.classList.toggle('showMenu')
    scrollMenu.classList.toggle('hiden');
    menu.classList.toggle('hiden');

    
}
menu.addEventListener('click',showMenu);
////////eventlistner for copy buttons //////////////
const copyUrlEventListener = (copyButton) => {
    copyButton.addEventListener('click', () => {
      // delete class "copied" from other buttons
      const allButtons = document.querySelectorAll('.copyButton');
      allButtons.forEach(button => {
        if (button !== copyButton && button.classList.contains('copied')) {
          button.classList.remove('copied');
          button.innerText = 'Copy';
          button.style.backgroundColor ='hsl(180, 66%, 49%)'

        }
      });
  
      // Apply style and copy URL
      copyButton.classList.add('copied');
      copyButton.innerText = 'Copied!';
      copyButton.style.backgroundColor =' hsl(257, 27%, 26%)'

      const elementToCopy = copyButton.previousElementSibling;
      const textToCopy = elementToCopy.textContent;
  
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch(err => {
          console.error('Error in copying text: ', err);
        });
    });
  };
  
////////////////fetch api https://api.shrtco.de/v2/ ///////////////////////
const shortUrl = () => {
    // The URL to shorten
    let url = input.value;
    // Call the API
    fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.result.short_link2);
           let outputCard = document.createElement('div'); document.createElement('div');
           outputCard.className = 'outputCard';
           let inputUrl = document.createElement('p');
           inputUrl.className = 'inputUrl';
           inputUrl.innerText=url;
           let outputUrl = document.createElement('p');
           outputUrl.className = 'outputUrl';
           outputUrl.innerText = data.result.short_link2;
           let copyButton = document.createElement('button');
           let rightOutputContainer =  document.createElement('div');
           rightOutputContainer.className ='rightOutputContainer';
           //eventlistner for copyButton
           copyUrlEventListener(copyButton);
           copyButton.className = 'copyButton';
           copyButton.innerText = 'copy'
           outputCard.append(inputUrl)
           rightOutputContainer.append(outputUrl)
           rightOutputContainer.append(copyButton)
           outputCard.append(rightOutputContainer)
           outputContainer.append(outputCard)
           outputContainerHeight +=200;
/*            outputContainer.style.height= `${outputContainerHeight*100/window.innerHeight}vh`;
*/           outputContainer.style.height= `${outputContainerHeight}px`;

        })
        .catch(error => {
            console.error(error);
        });
}
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      if (input.value === "") {
        input.style.border = "3px solid hsl(0, 87%, 67%)";
      } else {
        const urlPattern = /^(https?:\/\/)?([^\s./]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/i;
        if (urlPattern.test(input.value)) {
          console.log("Valid URL");
          input.style.border = "none"; // Réinitialiser la bordure à aucun
          statisticDescContainer.style.marginTop = "0";
          shortUrl();
        } else {
          console.log("Invalid URL");
          // Ajoutez ici votre code pour gérer un URL invalide
        }
      }
    }
  });
  
  submitbtn.addEventListener("click",() =>{
        if(input.value===''){
            input.style.border ='3px solid hsl(0, 87%, 67%)'
        }
        statisticDescContainer.style.marginTop ='0';
        shortUrl();
        
    
  });
