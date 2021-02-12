window.onload=function () {
    var addBook=document.getElementById("addbook");
    addBook.onclick=createEntries;
    var searchButton=document.getElementById("sechButton");
    searchButton.onclick=searchBook;

    var entriesArray=getEntriesArray();

    for(let i=0; i<entriesArray.length; i++){
        var key=entriesArray[i];
        var value=JSON.parse(localStorage.getItem(key));
        addbooksToDom(key, value);
        searchBook(key, value);
    }
}
function getEntriesArray(){
    var entriesArray=localStorage.getItem("entriesArray");
    if(!entriesArray){
        var entriesArray=[];
        localStorage.setItem("entriesArray", JSON.stringify(entriesArray));
    }else{
        entriesArray=JSON.parse(entriesArray);
    }
    return entriesArray;
}
function createEntries(){
    entriesArray=getEntriesArray();
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var isbn = document.getElementById("isbn").value;

    if (title===""){
        alert("Please type in the title of the book.");
    }else if(author===""){
        alert("Please type in the author of the book.");
    }else if(isbn===""){
        alert("Please type in the isbn number");
    }else{
    var entryInfoArray=[title, author, isbn];
    var newDate=new Date();
    var time=newDate.getMilliseconds();
    var key= "entry" + time;
    localStorage.setItem(key, JSON.stringify(entryInfoArray));
    entriesArray.push(key);
    localStorage.setItem("entriesArray", JSON.stringify(entriesArray));

    for(let i=0; i<entriesArray.length; i++){
        var key=entriesArray[i];
        var value=JSON.parse(localStorage.getItem(key));
    }
    addbooksToDom(key, value);
}
    document.getElementById("title").value="";
    document.getElementById("author").value="";
    document.getElementById("isbn").value="";
}

function addbooksToDom(key, value) {
    var table = document.getElementById("table");
    var tableRow = document.createElement("tr");
    var deleteButton=document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("id", key);
    deleteButton.innerText="Trash";

    table.appendChild(tableRow);
    var allInfo=[];
    for (let j=0; j<value.length; j++){
        var entries=document.createTextNode(value[j]);
        allInfo.push(entries);
    }
    allInfo.push(deleteButton);

    for (let i=0; i<allInfo.length; i++){
        var tableColumn=document.createElement("td");
        tableRow.appendChild(tableColumn);
        tableColumn.appendChild(allInfo[i]);
    }
    deleteButton.onclick=deleteBook;
}

function deleteBook(e){
    var key=e.target.id;
    localStorage.removeItem(key);
    var entriesArray=getEntriesArray();
    
    if(entriesArray){
        for (let i=0; i<entriesArray.length; i++){
            if(key===entriesArray[i]){
                entriesArray.splice(i,1);
            }   
        }
        localStorage.setItem("entriesArray", JSON.stringify(entriesArray));
       removeBookFromDom(key);
    }
}
function removeBookFromDom(key){
    var button=document.getElementById(key);
    var td=button.parentNode;
    var row=td.parentNode;
    row.parentNode.removeChild(row);    
}
function searchBook(key, value){
    const search=document.getElementById("serch").value;
    entriesArray=getEntriesArray();
    /*The first for loop is meant to iterate through the entriesArray in order to get the keys and the values of the array,
    then the second for loop through iterates each value of the array to determine whether a book searched by the user is 
    on the list*/
    for(let i=0; i<entriesArray.length; i++){
        var key=entriesArray[i];
        var value=JSON.parse(localStorage.getItem(key));
        for (let j=0; j<value.length; j++){
            if (search===value[j]){
               //showBookinDom;
               alert(value);
            }
        }
    }
    document.getElementById("serch").value="";
}
function showBookinDom(){
 
}