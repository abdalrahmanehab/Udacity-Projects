
// defineing my global variables
const mySections = document.querySelectorAll("section")
const mynUl = document.getElementById("navbar__list")
const myFragment = document.createDocumentFragment();

// used this function to creat the navbar in a dynamic way debending on sections number
//as weell when the event click happens it scroll to its section

mySections.forEach((element, index) => {
    let linkText =element.getAttribute("data-nav");
    let addLink = document.createElement("a");
    let nodeText = document.createTextNode(linkText);
    let addLi = document.createElement("li");
    addLink.appendChild(nodeText);
    addLi.appendChild(addLink);
    myFragment.appendChild(addLi);
// calling this function by event listener will make it sroll to the specific section
    function viewScrolling () {
        element.scrollIntoView({behavior: "smooth"});
}
    addLi.addEventListener("click" , viewScrolling)
    //adding the menu link style to the new navbar li elements
    addLi.setAttribute("class", "menu__link");


})

//using the fragment  till it will not relad the page when using the forEach loop
mynUl.appendChild(myFragment);

//It should be clear which section is being viewed while scrolling through the page by adding and removing this function is active 

function BoundingClientRect() {
    mySections.forEach((active) => {
        if(active.getBoundingClientRect().top >= -350 &&active.getBoundingClientRect().top <= 150) {
            active.classList.add("section-is-active")
        }
        else {
            active.classList.remove("section-is-active")

        }
    }
    )
};
// add the event of scrolling and calling it the page by addEventListener
document.addEventListener("scroll" , BoundingClientRect)



function linksActive () {
    for (let section of mySections) {
    const sectionDim = section.getBoundingClientRect();
    let sectionTitle = section.getAttribute("data-nav");
    const links = document.querySelectorAll("li");
    if (sectionDim.top >= 0 && sectionDim.top < 300) {
        for (let link of links) {
        link.classList.remove("section-is-active");
        if (link.textContent === sectionTitle) {
            link.classList.add("section-is-active");
        }
        }
    }
    }
};

document.addEventListener("scroll" , linksActive)