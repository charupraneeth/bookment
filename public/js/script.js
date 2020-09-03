const registerbtn = document.getElementById('registerbtn')
registerbtn.addEventListener('click',(e)=>{
    console.log('clicked');
    const messages = []
    const name = document.getElementById('name')
    const password = document.getElementById('password')
    const repeat   = document.getElementById('repeat')
    const agreeTerm = document.getElementById('agree-term')
    // console.log(password,repeat);


    if (/\s/.test(name.value)) {
        e.preventDefault()
        alert('username cannot contain white spaces')
        return
    }
    function isValid(str){
        return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
       }
    if(!isValid(name.value)){
        e.preventDefault()
        alert('username cannot contain special characters')
        return
    }
    if(password.value === ''){
        e.preventDefault()
        messages.push('password field cannot be empty')
        alert('password field cannot be empty')
        return
    }
    if(password.value !== repeat.value){
        e.preventDefault()
        alert('passwords must be same , try again')
        return
    }
    if(!agreeTerm.checked){
        e.preventDefault()
        alert('please check the terms before submitting')
        return
        
    }
    else{
        agreeTerm.setAttribute('disabled','disabled')
        repeat.setAttribute('disabled','disabled')
    }
})


