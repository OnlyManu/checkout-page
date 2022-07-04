const input=document.getElementById("country");
const countries=document.getElementById("countries");
const dropdownIcon=document.querySelector('.dropdown-icon');
let currentFocus = -1;
input.onfocus = function () {
    countries.style.display = 'block';
    countries.parentNode.classList.add('open');
    if(currentFocus>=0){
        if(input.value!=countries.options[currentFocus].value){
            currentFocus=-1;
            addFocus(countries.options)
        }
    }  
};

dropdownIcon.onclick=function(){
    if(countries.parentNode.classList.contains('open')){
        countries.style.display = 'none';
        countries.parentNode.classList.remove('open');
    }else{
        input.focus();
        countries.style.display = 'block';
        countries.parentNode.classList.add('open');
    }
}

for (let option of countries.options) {
    option.onclick = function () {
        input.value = option.value;
        countries.style.display = 'none';
        input.parentNode.classList.remove('error')
        countries.parentNode.classList.remove('open');
    }
    option.onmouseover=function(opt){
        let pos=0;
        for(let i=0; i<countries.options.length; i++){
            countries.options[i].classList.remove('focused');
            if(countries.options[i].value==opt.currentTarget.value){
                pos=i;
            }
        }
        currentFocus=pos;
        addFocus(countries.options);
    }
};

input.oninput = function() {
    currentFocus = -1;
    var text = input.value.toUpperCase();
    for (let option of countries.options) {
        if(option.value.toUpperCase().indexOf(text) > -1){
            option.style.display = "block";
        }else{
            option.style.display = "none";
        }
    };
    addFocus(countries.options);
}

input.onkeydown = function(e) {
    if(e.keyCode == 40){
        currentFocus++
        addFocus(countries.options);
    }
    else if(e.keyCode == 38){
        currentFocus--
        addFocus(countries.options);
    }
    else if(e.keyCode == 13){
        e.preventDefault();
            if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (countries.options) countries.options[currentFocus].click();
            }
    }
}

function addFocus(x) {
    if (!x) return false;
    removeFocus(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("focused");
}
function removeFocus(x) {
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("focused");
    }
}