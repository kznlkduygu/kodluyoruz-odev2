let data = [];

function fetchData() {
    //verinin çekildiği yer
    fetch("data.json")
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            //json'dan okunan verinin data array'ine atanması
            data = responseData;

            //veri geldikten sonra filtreleme butonu görünür olsun
            let filterClass = document.querySelector("#filterClass");
            filterClass.setAttribute("style", "");

            //verinin html içerisinde listelendiği fonksiyon
            listData(responseData);
        })
        .catch(err => {
            //hata yönetimi
            alert("Bir hata oluştu!",err);
        })
}

//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
function listData(data) {
    let list = document.querySelector(".list");

    

    list.innerHTML = data.map(element => {
        return `
        <li id=${element.id}>
            <span class='bold'>name:</span> ${element.name} <br>
            <span class='bold'>age:</span> ${element.age} <br>
            <span class='bold'>isActive:</span> ${element.isActive}<br>
        </li>
        `;
    }).join('');
}

function filterData() {
    let nameInputValue = document.getElementById('fname').value;
    let isAdultValue = document.getElementById('notMinor').checked;
    let isActiveValue = document.getElementById('true').checked;

    let filteredData = [...data]

    if(isAdultValue) {
        filteredData = filteredData.filter((element) => element.age >= 18);
        
    }
    if (isActiveValue) {
        filteredData = filteredData.filter((element) => element.isActive);
        
    }
    if(nameInputValue) {
        filteredData = filteredData.filter((element) => element.name[0].toLowerCase() === nameInputValue.toLowerCase());
    }
    
    listData(filteredData)
}