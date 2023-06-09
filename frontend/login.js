let passwordObj=document.querySelectorAll(".password")

let pShowHidePObj=document.querySelectorAll(".showHideP")


pShowHidePObj.forEach(e=>{
    e.addEventListener("click",()=>{
        console.log('gggggg')
        passwordObj.forEach(e2=>{

            if(e2.type=="password"){
                e2.type='text'
            }
            else{
                e2.type='password'
            }
            
        })
    })
})
