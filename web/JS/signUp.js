let agree = document.getElementById('agree')
let nextButton = document.getElementById('nextButton')
let isChecked = false;

agree.addEventListener('click', () => {
    isChecked = agree.checked
    if(isChecked) {
        nextButton.classList.remove('noClick')
    } else {
        nextButton.classList.add('noClick')
    }
})

nextButton.addEventListener('click', () => {
    if(!isChecked) return 0;
    console.log('gg')
})