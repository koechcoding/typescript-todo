const title = document.getElementById('title')! as HTMLInputElement
const desc = document.getElementById('desc')! as HTMLInputElement
const date = document.getElementById('date')! as HTMLInputElement
const btn = document.getElementById('create-btn')! as HTMLButtonElement
const content = document.querySelector('.content1') as HTMLDivElement
const uncompleted = document.querySelector('.completed') as HTMLDivElement

interface Todo{
    id:number
    Title:string
    Description:string
    Date:string
    Completed:boolean
}

let updating:number=-1

const Todos:Todo[]=[{
    id:123,
    Title:'Todo1',
    Description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident cum',
    Date:'20/01/2023',
    Completed:false
}]

function Checkbtn(){

    console.log(updating);
    
    if(updating!=-1){
    btn.textContent='Update'
}else{
    btn.textContent='Create Todo'
}

}

btn.addEventListener('click', Addorupdate)


function Addorupdate(){
    if(updating >=0){
        console.log('Here' +updating);
        
        let todo = Todos[updating]
        
        
            const Title= title.value
            const Description= desc.value
            const Date= date.value

            Todos[updating]= {...todo, Title,Date,Description}
            Showtodos()
            updating=-1
            Checkbtn()

             title.value=''
             desc.value=''
             date.value=''
    }else{
        const Title= title.value
    const Description= desc.value
    const Date= date.value

    if(Title==''|| Description=='' ||Date==''){
        const p = document.createElement('p')
        p.textContent='Please fill in all Fields'
        p.style.color='red'
        p.id='error-message'
        content.insertAdjacentElement('afterbegin', p)

        setTimeout(()=>{
            p.style.display='none'
        },4000)
    }else{
         let singleTodo:Todo= {Title,Description,Date,Completed:false, id:Math.random() *10000 }
         Todos.push(singleTodo)
         Showtodos()

    console.log(Todos);
    }

    }
}

Showtodos()

function Showtodos(){
    const todos:Todo[]= Todos.filter(a=>a.Completed===false)
    if(todos.length==0){
        uncompleted.innerHTML=''
        const p = document.createElement('p')
        p.textContent='No Todos Add One !!'
        p.style.color='Black'
        uncompleted.insertAdjacentElement('afterbegin', p)
    }else{

        uncompleted.innerHTML=''
         todos.forEach((a)=>{
            let html =`
            <div class="todo" onclick="deleteTodo(${a.id}">
                <h1>${a.Title}</h1>
                <p>${a.Description}</p>
                <div class="btn">
                    <button onclick="updateTodo(${a.id})" >update</button>
                   
                    <button>Complete</button>
                </div>
            </div>
            `

            uncompleted.innerHTML += html
      })
    }
}

   function DeleteTodo(id:number){
     const index= Todos.findIndex(a=>a.id===id) 
     console.log(index);
      Todos.splice(index,1)  
      Showtodos()    
    }


 function UpdateTodo (id:number){
   const index= Todos.findIndex(a=>a.id===id) 
    let todo=Todos[index]

    //Prepopopulate Form
    title.value=todo.Title
    desc.value=todo.Description
    date.value=todo.Date
    // btn.textContent="Update"
    updating=index
    Checkbtn()
    console.log(updating);
    
    }