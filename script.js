
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
        savetask:function(){
            localStorage.setItem("save_list",JSON.stringify(task_list));
        },
        render_task:function(){
            // ul.innerHTML="";
            task_list.forEach((obj)=>{
                this.dompost(obj);
            })
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
                }
                if(data)
                {
                    item.data=data;
                }
            })
            // save update task.......
            this.savetask();
            this.render_task();

        },
        deletetask:function(id){
            const ele=document.getElementById(id);
            task_list=task_list.filter((item)=>{
                return item.id!=id
            })
            this.savetask();
            ul.removeChild(ele);

        },
        dompost:function(obj){
            let li=document.createElement("li");
            li.id=obj.id;
            if(obj.state)
            {
                li.classList.add("checked");
            }
            li.innerHTML=`<p>${obj.data}</p>
                <div id="status" class="img"></div>
                <div class="icon"><i id="delete" class="fa-sharp fa-solid fa-trash "></i><i id="edit" class="fa-solid fa-pen-to-square"></i></div>`
            
                this.addevent(li);
            ul.prepend(li);
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
                if(key=="delete")
                {
                    app.deletetask(e.target.parentElement.parentElement.id)
                }
                else if(key=="edit")
                {
                    // app.updatetask();
                    console.log("edit this")
                }
                else if(key=="status")
                {
                    app.updatetask(e.target.parentElement.id,true);
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





