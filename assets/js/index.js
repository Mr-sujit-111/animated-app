const first = document.getElementById("first");
const second = document.getElementById("second");
const third = document.getElementById("third");
const firstpage = document.getElementById("first-page");
const secondPage = document.getElementById("second-page");
const thirdpage = document.getElementById("third-page");
const modalImage = document.getElementById("modalImage");
const imageWrapper = document.querySelectorAll(".image-wrapper");
const imageName = document.querySelectorAll(".image-name");
const firstPageBtn = document.getElementById("firstPageBtn");
const secondpagebtn = document.getElementById("secondpagebtn");
const thirdPagebtn = document.getElementById("thirdPagebtn");
const iconList = document.querySelectorAll('.icon-item');
const imageItems = document.querySelectorAll(".image-item");
var x = window.matchMedia("(max-height:800px)");
var primaryHeight = "150px";
//for third page 
const thirdpageImageWrapper = document.querySelectorAll(".third-page-image-wrapper");
const thirdpageimageItem = document.querySelectorAll(".third-page-image-item");
const thirdpageImageName = document.querySelectorAll(".third-page-image-name");
const thirdContentWrapper = document.querySelectorAll(".third-content-wrapper");
const pageButtonList = [firstPageBtn, secondpagebtn, thirdPagebtn];
// for the initial and updated animation event
let timeOuts = {};
let thirdpageTimeOuts = {};
let fadeOutTimes = {};

// disable inspect element 
/* document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }

    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
} */


//media query for small height devices
if (window.matchMedia("(max-height: 720px)").matches) {
    primaryHeight = "140px";
} else {
    primaryHeight = "159px";
}
//initial animation 
const animationStart = () => {
    let count = 0;
    imageWrapper.forEach((item, index) => {
        timeOuts["container" + index] = setTimeout(() => {
            item.style.borderTop = "1px  solid black";
            item.style.borderLeft = "1px  solid black";
            item.style.borderRight = "1px  solid black";
            item.style.height = primaryHeight;
        }, 500);
        setTimeout(() => {
            item.style.borderBottom = "1px  solid black";
        }, 2600);
    })
    var timeDelayForImagefadein = 4000;
    imageWrapper.forEach((item, i) => {
        timeOuts["image" + i] = setTimeout(() => {
            imageName[i].style.display = "none";
            imageItems[i].style.opacity = 1;
            if (count === imageWrapper.length - 1) {
                count = 0;
            } else {
                count++
            }
        }, timeDelayForImagefadein);
        (imageWrapper.length - 1 === i) ? (timeDelayForImagefadein = 4000) : timeDelayForImagefadein += 1500
    })
}

const animationthirdpage = () => {
    let count = 0;
    thirdpageImageWrapper.forEach((item, index) => {
        thirdpageTimeOuts["container" + index] = setTimeout(() => {
            item.style.borderTop = "1px  solid black";
            item.style.borderLeft = "1px  solid black";
            item.style.borderRight = "1px  solid black";
            item.style.height = primaryHeight;
        }, 500);
        setTimeout(() => {
            item.style.borderBottom = "1px  solid black";
        }, 2600);
    })
    var thirdPageTimeDelayForImagefadein = 4000;
    thirdpageImageWrapper.forEach((item, i) => {
        thirdpageTimeOuts["image" + i] = setTimeout(() => {
            thirdpageImageName[i].style.display = "none";
            thirdpageimageItem[i].style.opacity = 1;
            if (count === thirdpageImageWrapper.length - 1) {
                count = 0;
            } else {
                count++
            }
        }, thirdPageTimeDelayForImagefadein);

        (thirdpageImageWrapper.length - 1 === i) ? (thirdPageTimeDelayForImagefadein = 4000) : thirdPageTimeDelayForImagefadein += 1500
    })
}

// for the reset animation
const resetAnimation = (onlyReset) => {
    !onlyReset && (secondPage.style.display = "none")

    Object.values(fadeOutTimes).forEach((item) => {
        clearTimeout(item);
    })

    // fadeOutTimes["resetAnimationData"] = setTimeout(() => {
    setTimeout(() => {
        Object.values(timeOuts).forEach((item) => {
            clearTimeout(item);
        })
        let timeDelayForImagefadeOut = 500;
        let counter = imageWrapper.length - 1;

        if (onlyReset) {
            let paracounter = imageWrapper.length - 1;
            imageWrapper.forEach((item, index) => {
                fadeOutTimes["imagefadeOut" + index] = setTimeout(() => {
                    imageItems[counter].style.opacity = 0;
                    counter--;
                    timeOuts["imageTextfadeOut" + index] = setTimeout(() => {
                        imageName[paracounter].style.display = "block";
                        paracounter--;
                    }, 1600);
                }, timeDelayForImagefadeOut);
                (imageWrapper.length - 1 === index) ? (timeDelayForImagefadeOut = 500) : timeDelayForImagefadeOut += 1500
            });
            fadeOutTimes["borderfadeOutOuter"] = setTimeout(() => {
                imageWrapper.forEach((item, index) => {
                    item.style.borderBottom = "0px";
                    item.style.height = "0px";
                })
                fadeOutTimes["borderfadeOut"] = setTimeout(() => {
                    imageWrapper.forEach((item, index) => {
                        item.style.border = "0px";
                    })
                }, 2000);
                fadeOutTimes["animationStageStart"] = setTimeout(() => {
                    animationStart(true);
                }, 3000);
            }, 7000);
        } else {
            secondPage.style.display = "block"

            imageWrapper.forEach((item, index) => {
                item.style.border = "none";
                item.style.height = "0px";
                imageItems[index].style.opacity = 0;
            })
            imageName.forEach((item, i) => {
                item.style.display = "block";
            })
            animationStart(true);
        }
    }, 1000)
};

// for the reset third page animation
const resetThirdPageAnimation = () => {
    thirdpage.style.display = "none";
    setTimeout(() => {
        thirdpage.style.display = "block";
        thirdpageImageWrapper.forEach((item, index) => {
            item.style.border = "none";
            item.style.height = "0px";
            thirdpageimageItem[index].style.opacity = 0;
        })
        thirdpageImageName.forEach((item, i) => {
            item.style.display = "block";
        })

        Object.values(thirdpageTimeOuts).forEach((item) => {
            clearTimeout(item);
        })
        animationthirdpage(true);
    }, 1000)
};
/* Method List */
//method : handle change pageNumber button styling
const handlebuttonState = (currentbtn) => {
    pageButtonList.map((item) => {
        if (currentbtn === item) {
            item.children[1].style.fontSize = "36px"
            item.style.background = "#404040";
            item.style.height = "60px";
            item.style.width = "60px";
        } else {
            item.children[1].style.fontSize = "21px"
            item.style.background = "#A5A5A5";
            item.style.height = "40px";
            item.style.width = "40px";
        }
    })
}

//method : for second page number button clickable or disable
const seconPageClickable = (clickable) => {
    if (clickable) {
        second.disabled = false;
        second.style.height = "100%";
        second.style.width = "100%";
    } else {
        second.disabled = true;
        second.style.height = "0px";
        second.style.width = "0px";
    }
}

//method : disable keyboard nevigation and click navigation
const currentPage = (pageNumber) => {
    if (pageNumber === 1) {
        first.disabled = false;
        second.disabled = true;
        third.disabled = true;
    } else if (pageNumber === 2) {
        first.disabled = false;
        second.disabled = false;
        third.disabled = true;
    } else if (pageNumber === 3) {
        first.disabled = false;
        second.disabled = false;
        third.disabled = false;
    }
}


//method : for the generate image fileName
const getFileName = (str) => {
    return str.substring(str.lastIndexOf('/') + 1)
}

//method : set third page image placeholder from selected from step2
const setImagePlaceholder = (name) => {
    thirdContentWrapper.forEach((item, index) => {
        item.children[0].innerText = name + index;
        item.children[1].src = `./assets/img/result/${name}${index}.png`
    })
}

//handle the change pageNumber button events
const handleChange = () => {
    if (first.checked) {
        handlebuttonState(firstPageBtn);
        firstpage.style.display = "block";
        secondPage.style.display = "none";
        thirdpage.style.display = "none";
        seconPageClickable(false);
        currentPage(1);
    } else if (second.checked) {
        handlebuttonState(secondpagebtn);
        firstpage.style.display = "none";
        secondPage.style.display = "block";
        thirdpage.style.display = "none";
        resetAnimation(false);
        seconPageClickable(false);
        currentPage(2);
    } else if (third.checked) {
        handlebuttonState(thirdPagebtn);
        firstpage.style.display = "none";
        secondPage.style.display = "none";
        thirdpage.style.display = "block";
        resetThirdPageAnimation();
        seconPageClickable(true);
        currentPage(3);
    }
}

// for the redirect step1 to step2 tap on icon
for (let i = 0; i < iconList.length; i++) {
    iconList[i].addEventListener("click", function (e) {
        // console.log(e.target.getAttribute("name"));
        second.checked = true;
        handleChange();
    });
}

//handle regen-button for refresh step2
const handleRegenButtonClick = () => {
    resetAnimation(true);
}



//handle save-button for save image in device
const handleSaveButtonClick = () => {
    const fileName = getFileName(modalImage.src);
    saveAs(modalImage.src, fileName);
}

//handle share-button for copy url of image in clipboard
const handleShareButtonClick = () => {
    navigator.clipboard.writeText(modalImage.src);
}

//handle home-button for redirect step-1 homepage
const handlehomeButtonClick = () => {
    first.checked = true;
    handleChange();
}


//handle image-click for the show image
const handleImageClick = (target) => {
    setImagePlaceholder(target);
    third.checked = true;
    handleChange();
}

//handle third page popup open click
const thirdPageImageClick = (myImage) => {
    modalImage.src = myImage;
}

handleChange();



