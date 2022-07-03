class Article{
    constructor(article){
        this.price=parseFloat(article.querySelector('.price').innerText.slice(1));
        this.quantity=article.querySelector('.quantity');
        this.addbutton=article.querySelector('.add');
        this.removeButton=article.querySelector('.remove');
    }
    add_article(){
        let cur=parseInt(this.quantity.innerText)+1
        this.quantity.innerText=cur;
    }
    remove_article(){
        let cur=parseInt(this.quantity.innerText)-1;
        cur=cur<1 ? 1 : cur;
        this.quantity.innerText=cur;
    }
}
class FormManager{
    constructor(){
        this.inputs=[];
        this.saveCheckbox;
        let inputs=document.querySelectorAll('input');
        inputs.forEach(e=>{
            let input={
                'el': e,
                'id': e.getAttribute('id')
            };
            if(input.id!="save"){
                this.inputs.push(input)
            }else{
                this.saveCheckbox=input;
            }
        });
    }
    verif_empty(e){
        if(e.value!=""){
            return true;
        }
        return false;        
    }
    verif_empty_all(){
        let result=true;
        this.inputs.forEach(e=>{
            let state=this.verif_empty(e.el);
            let errorMessage=e.el.parentNode.querySelector('.error-message');
            if(!state){
                e.el.parentNode.classList.add('error');
                errorMessage!=null?(errorMessage.innerText='This field must not be empty'):'';
                result=false;
            }else{
                if(e.type=="phone" || e.type=="email"){
                    state=eval('this.verif_'+e.type+'(e.el)');
                    if(!state){
                        e.el.parentNode.classList.add('error');
                        errorMessage!=null?(errorMessage.innerText='Enter the correct format'):'';
                        result=false;
                    }
                }
            }
        })
        return result;
    }
    verif_email(e){
        if(/^[a-zA-Z0-9]*@[a-zA-Z0-9]*\.[a-zA-Z0-9]*$/.test(e.value)){
            return true;
        }
        return false;
    }
    verif_phone(e){
        if(/\+?\d{6,12}/.test(e.value)){
            return true;
        }
        return false;
    }
    saveInformations(){
        this.inputs.forEach(inp=>{
            localStorage.setItem(inp.id, inp.el.value);
        })
    }
    loadInformations(){
        this.inputs.forEach(inp=>{
            inp.el.value=localStorage.getItem(inp.id);
        })
    }
}
const myForm=new FormManager();
const body=document.querySelector('body');
const alertWrapper=document.querySelector('.alert-wrapper');
const alertBox=document.querySelector('.alert-box');
const alertCloseButton=document.querySelector('.alert-box .close-icon');
const alertActionButton=document.querySelector('.btn-alert');
const submitButton=document.querySelector('.btn-submit');
const totalPrice=document.getElementById('total-price');
const articlesNode=document.querySelectorAll('.article');
let articleTab=[];
articlesNode.forEach(e=>{
    articleTab.push(new Article(e));
})
articleTab.forEach(e=>{
    e.addbutton.addEventListener('click', function(){
        e.add_article();
        total_price();
    });
    e.removeButton.addEventListener('click', function(){
        e.remove_article();
        total_price();
    });
})
function deleteClassError(p){
    p.classList.remove('error');
    let errorMessage=p.querySelector('.error-message');
    errorMessage!=null?errorMessage.classList.remove('visible'):true;
}
function total_price(){
    let total=articleTab.reduce((a, b)=>{
        return (parseInt(b.quantity.innerText)*b.price)+a;
    }, 0);
    total=total+19;
    totalPrice.innerText='$'+total.toFixed(2);
}
myForm.inputs.forEach(e=>{
    e.el.addEventListener('keypress', function(f){
        if(f.currentTarget.parentNode.classList.contains('error'))
            deleteClassError(f.currentTarget.parentNode)
    })
    e.el.addEventListener('focus', function(f){
        if(f.currentTarget.parentNode.classList.contains('error')){
            let errorMessage=f.currentTarget.parentNode.querySelector('.error-message');
            errorMessage!=null?errorMessage.classList.add('visible'):'';
        }
    })
    e.el.addEventListener('focusout', function(f){
        if(f.currentTarget.parentNode.classList.contains('error')){
            let errorMessage=f.currentTarget.parentNode.querySelector('.error-message');
            errorMessage!=null?errorMessage.classList.remove('visible'):'';
        }
    })
});
submitButton.addEventListener('click', function(e){
    e.preventDefault()
    if(myForm.verif_empty_all()){
        alertBox.classList.remove('error');
        alertBox.classList.add('sucess');
        if(myForm.saveCheckbox.el.checked){
            localStorage.setItem('save', true);
            myForm.saveInformations();
        }else{
            localStorage.setItem('save', false);
        }
    }else{
        alertBox.classList.remove('sucess');
        alertBox.classList.add('error');
    }
    openAlertBox();
})
alertActionButton.addEventListener('click', closeAlertBox, false);
alertCloseButton.addEventListener('click', closeAlertBox, false);
document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.getItem('save')=='true'){
        myForm.loadInformations();
        myForm.saveCheckbox.el.checked=true;
    }   
}, false);
document.addEventListener('keypress', function(e){
    if(e.keycode==13){
        submitButton.click()
    }
}, false)

function closeAlertBox(){
    alertWrapper.classList.add('close');
    body.classList.remove('hide');
}
function openAlertBox(){
    alertWrapper.classList.remove('close');
    body.classList.add('hide');
}