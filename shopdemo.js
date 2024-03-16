let item=document.querySelector("#item");
let desc=document.querySelector("#desc");
let price=document.querySelector("#price");
let quant=document.querySelector("#quant");

let form=document.getElementById("form");
let body=document.querySelector("#display");
let src="https://crudcrud.com/api/8a7a6980559e44b983a91649b470c932/itemdata";

//Displaying all data one by one
function display_data1(){
    axios
    .get(src)
    .then((resolve)=>{
    resolve.data.forEach(items => {
    let itemList=document.createElement('tr');
    //<td>${items.Sl_no}</td>
    itemList.innerHTML=`
    <td>${items.Item}</td>
    <td>${items.Description}</td>
    <td>${items.Price}</td>
    <td>${items.Quantity}</td>
    <button id="B1" class='btn'>BUY 1</button>
    <button id="B2" class='btn'>BUY 2</button>
    <button id="B3" class='btn'>BUY 3</button>
    `
    body.appendChild(itemList);
        })
    })
    .catch((err)=>{
        alert("Error Occured During Display");
    })
}
//Displaying current data
async function display_data2(items){
try{
    
    let itemList=document.createElement('tr');
    //<td>${localStorage.getItem('data')}</td>
    itemList.innerHTML=`
    <td>${items.data.Item}</td>
    <td>${items.data.Description}</td>
    <td>${items.data.Price}</td>
    <td>${items.data.Quantity}</td>
    <button id="B1" class='btn'>BUY 1</button>
    <button id="B2" class='btn'>BUY 2</button>
    <button id="B3" class='btn'>BUY 3</button>
    `
    body.appendChild(itemList);
    let num=localStorage.getItem("data");
    localStorage.clear();
    ++num;
    localStorage.setItem('data',num);
}
catch(err)
{
    alert("ERROR IN DISPLAYING DATA");
}
}
//Adding to backEnd 
async function add_to_CRUD(event)
{
try{
    event.preventDefault();
    if(item.value==""||desc.value==""||price.value==""||quant.value=="")
    {
        alert("Details missing");
        return;
    }
    //let no=localStorage.getItem('data');
    const item_obj={
        //Sl_no: no,
        Item : item.value,
        Description:desc.value,
        Price:price.value,
        Quantity:quant.value,
    }
    item.value="";
    desc.value="";
    price.value="";
    quant.value="";
    axios
    .post(src,item_obj)
    .then((resolve)=>{
        display_data2(resolve);
    })
    }
    catch(err){
        alert("Error Occured During POST request!!!");
    }
}
form.addEventListener('submit',(event)=>{
    return add_to_CRUD(event);
})


//SELL
async function fun(event){
    event.preventDefault();
axios
    .get(src)
    .then((Resolve)=>{
        if(event.target.tagName === 'BUTTON')
        {
            const button=event.target;
            const li=button.parentNode;
            const ins_body=li.parentNode;
            
            let dataList=Resolve.data;//List of data from backEnd
    for(let i=0;i<dataList.length;i++)
    {
        if(dataList[i].Item==li.children[0].innerText)
        {
            let IED=dataList[i]._id;
            if(li.children[3].innerText < 3)
            {
                ins_body.removeChild(li);
                axios.delete(`${src}/${IED}`);
                continue;
            }
            if(button.innerText=='BUY 1' )
            {
                li.children[3].innerText-=1;
                let x=parseInt(dataList[i].Quantity);
                --x;
                const obj={
                    Item : dataList[i].Item,
                    Description:dataList[i].Description,
                    Price:dataList[i].Price,
                    Quantity:x,
                }
                JSON.stringify(obj);
                axios.put(`${src}/${IED}`,obj);
                
            }
            else if(button.innerText=='BUY 2')
            {
                li.children[3].innerText-=2;
                let x=parseInt(dataList[i].Quantity);
                x-=2;
                const obj={
                    Item : dataList[i].Item,
                    Description:dataList[i].Description,
                    Price:dataList[i].Price,
                    Quantity:x,
                }
                JSON.stringify(obj);
                axios.put(`${src}/${IED}`,obj);
            }
            else if(button.innerText=='BUY 3')
            {
                li.children[3].innerText-=3;
                let x=parseInt(dataList[i].Quantity);
                x-=3;
                const obj={
                    Item : dataList[i].Item,
                    Description:dataList[i].Description,
                    Price:dataList[i].Price,
                    Quantity:x,
                }
                JSON.stringify(obj);
                axios.put(`${src}/${IED}`,obj);
            }

        }
           } 
        }
    })
    
}
//SELLING ITEMS
body.addEventListener('click',(event)=>{
    return fun(event);
})
window.addEventListener("load", display_data1);