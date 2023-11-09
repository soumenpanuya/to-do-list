
class newtask{
    constructor(data)
    {
        this.id=Date.now();
        this.state=false;
        this.data=data;
    }
}

const app=(function()
{
    // previous task store into an array.....
    let task_list=[];
    const ul=document.querySelector("ul");
    let pending=document.getElementById("pending");
    let complete=document.getElementById("com");
    let total=document.getElementById("total");
    let pendingtask=0;
    let completetask=0;
    let toataltask=0;
    return{
        initialize: function()
        {
            const savedata=localStorage.getItem("save_list");
            if(savedata)
            {
                task_list=JSON.parse(savedata);
            }
            this.render_task();
        },
        
        render_task:function(){
            ul.innerHTML="";
            task_list.forEach((obj)=>{
                this.dompost(obj);
            })
            this.updatecount();
        },
        addtask:function()
        {
            const input=document.querySelector("#user_input");
            if(!input.value)
            {
                alert("Please enter task....");
                return;
            }
            let obj=new newtask(input.value);
            input.value="";
            task_list.push(obj);
            this.savetask();
            this.dompost(obj);
            this.updatecount();
        },
        updatetask:function(id,state,data){
            const element=document.getElementById(`${id}`);
            console.log(element)
            
            task_list.forEach(function(item){
                if(item.id==id)
                {
                    if(state)
                    {
                        item.state=!item.state;
                    }
                    if(data)
                    {
                        item.data=data;
                    }
                }
            })
            // save update task.......
            this.savetask();

        },
        deletetask:function(id){
            task_list=task_list.filter((item)=>{
                return item.id!=id
            })
            this.savetask();

        },
        dompost:function(obj){
            let li=document.createElement("li");
            li.id=obj.id;
            if(obj.state)
            {
                completetask++;
                li.classList.add("checked");
            }else{
                pendingtask++;
            }
            toataltask++;
            li.innerHTML=`<input  type="text" disabled value="${obj.data}">

            <div id="status" class="img"></div>
            <div id="icon-container" class="">
                
                <div class="icon">
                    <i id="delete" class="fa-sharp fa-solid fa-trash "></i>
                    <i id="edit" class="fa-solid fa-pen-to-square"></i>
                </div> 
                <div class="icon">
                    <i id="save" class="fa-solid fa-pen"></i>
                </div> 
            </div>`
            
            this.addevent(li);
            ul.prepend(li);
        },
        savetask:function(){
            localStorage.setItem("save_list",JSON.stringify(task_list));
        },
        updatecount:function(){
            pending.innerText=pendingtask;
            complete.innerText=completetask;
            total.innerText=toataltask;
        },
        keypress:function(key){
            if(key=="Enter")
            {
                this.addtask();
            }
        },
        addevent:function(item){
            item.onclick=(e)=>{
                let key=e.target.id;
                let li=e.target.closest("li");
                let inp=li.querySelector("input");
                if(key=="delete")
                {
                    this.deletetask(li.id);
                    if(li.classList.contains("checked"))
                    {
                        completetask--;
                    }else{
                        pendingtask--;
                    }
                    toataltask--;
                    this.updatecount();
                    li.remove();
                }
                else if(key=="edit")
                {
                    li.classList.toggle("active");
                    console.log(inp)
                    inp.disabled=!inp.disabled;
                    inp.focus();
                }
                else if(key=="status")
                {
                    this.updatetask(li.id,true);
                    li.classList.contains("checked")?(completetask-- && pendingtask++) : (pendingtask--&& completetask++);
                    li.classList.toggle("checked");
                    this.updatecount();
                }
                else if(key=="save")
                {
                    console.log(inp)
                    this.updatetask(li.id,false,inp.value);
                    li.classList.toggle("active");
                }
            }
        }
    }

})();


app.initialize();
// localStorage.clear();

// all Evemt listener..........
const add = document.querySelector('button[value="add"]');
add.onclick=app.addtask.bind(app);
document.onkeyup=(event)=>
{
    app.keypress(event.key);
}





