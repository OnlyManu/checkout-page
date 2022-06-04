const input=document.getElementById("country");
const countries=document.getElementById("countries");
input.onfocus = function () {
    countries.style.display = 'block';  
};

for (let option of countries.options) {
    option.onclick = function () {
        input.value = option.value;
        countries.style.display = 'none';
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
}

var currentFocus = -1;
input.onkeydown = function(e) {
    if(e.keyCode == 40){
        currentFocus++
        addActive(countries.options);
    }
    else if(e.keyCode == 38){
        currentFocus--
        addActive(countries.options);
    }
    else if(e.keyCode == 13){
        e.preventDefault();
            if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (countries.options) countries.options[currentFocus].click();
            }
    }
}

function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("active");
}
function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
    }
}