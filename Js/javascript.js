

// -----------------------------------

let itemArrayJson = []
function getUpdate(){
    tit = document.getElementById("Title").value
    desc = document.getElementById("Description").value

    if(localStorage.getItem("itemsJson")===null){
        itemArrayJson.unshift([tit, desc])
        localStorage.setItem("itemsJson", JSON.stringify(itemArrayJson))
        // console.log("IF", itemArrayJson)
    }else{
        itemArrayJson = JSON.parse(localStorage.getItem("itemsJson"))
        itemArrayJson.unshift([tit, desc])
        localStorage.setItem("itemsJson", JSON.stringify(itemArrayJson))
        // console.log("ELSE", itemArrayJson)
    }
    Update()
}

// -----------------------------------

function Update(){

    if(localStorage.getItem("itemsJson")===null){
        localStorage.setItem("itemsJson", JSON.stringify(itemArrayJson))
        itemArrayJson = JSON.parse(localStorage.getItem("itemsJson"))
    }else{
        itemArrayJson = JSON.parse(localStorage.getItem("itemsJson"))
        localStorage.setItem("itemsJson", JSON.stringify(itemArrayJson))
    }
    
    
    let str = ''
    itemArrayJson.forEach((element, index) => {
            str += `<tr>
            <th scope='row'>${index+1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='edit(${index})'>
            Edit
        </button></td>
            <td><button class="btn btn-sm btn-primary" onclick="deleted()">Delete</button></td>
        </tr>`
    });

    document.getElementById("tableBody").innerHTML = str;


    if(localStorage.getItem("itemsJson")==='[]'){
        // console.log("OK")
        document.getElementById("tableHead").style.display = 'none';
        document.getElementById("tableBody").innerHTML = '<h5>No Notes to Display!</h5>';
    }

}

// -----------------------------------

// document.getElementById("add").addEventListener("click", getUpdate);


function onSubmit(){
    getUpdate()
}
Update()

// -----------------------------------

function cleared(){
    if(confirm('Do You want to Clear the Entire List Permanently?')){
        itemArrayJson = []
        localStorage.setItem("itemsJson", JSON.stringify(itemArrayJson))
        // console.log("Data cleared")
    }
    Update()
}

// -----------------------------------

function deleted(itemIndex){
    itemArrayJson = JSON.parse(localStorage.getItem("itemsJson"))
    itemArrayJson.splice(itemIndex, 1)
    localStorage.setItem("itemsJson", JSON.stringify(itemArrayJson))
    Update()
}

// -----------------------------------

let editItemIndex = ''
function edit(itemIndex){
    // console.log(itemArrayJson[itemIndex])
    document.getElementById("titleNew").value = itemArrayJson[itemIndex][0]
    document.getElementById("descNew").value = itemArrayJson[itemIndex][1]
    editItemIndex = itemIndex
}

// -----------------------------------

function editNotes(){
    itemArrayJson = JSON.parse(localStorage.getItem("itemsJson"))
    let titN = document.getElementById("titleNew").value
    let descN = document.getElementById("descNew").value
    itemArrayJson[editItemIndex] = [titN, descN]
    localStorage.setItem("itemsJson", JSON.stringify(itemArrayJson))

    // document.getElementById("exampleModal").style.display = 'none'
    Update()
}

