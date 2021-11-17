let data = [];
const list = document.querySelector(".ticketCard-area");
const searchResult = document.querySelector(".searchResult-text");
const addBtn = document.querySelector(".addTicket-btn");
const areaSelect = document.querySelector(".regionSearch");

console.log(areaSelect);

function renderHtml(location) {
    let str = "";

    const filterData = data.filter(function (item) {
        if (location === item.area) {
            return item;
        } else if (!location) {
            return item;
        }
    })

    filterData.forEach(function (item) {
        str += `<li class="ticketCard">
        <div class="ticketCard-img">
            <a href="#">
            <img src="${item.imgUrl}" alt="">
            </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
    <div>
        <h3>
         <a href="#" class="ticketCard-name">${item.name}</a>
     </h3>
        <p class="ticketCard-description">
         ${item.description}
     </p>
     </div>
    <div class="ticketCard-info">
        <p class="ticketCard-num">
        <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
        </p>
        <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
        </p>
    </div>
    </div>
    </li>`
    })
    list.innerHTML = str;
    searchResult.textContent = `本次搜尋共 ${filterData.length} 筆資料`
}

function addCard() {
    const name = document.querySelector("#ticketName");
    const imgUrl = document.querySelector('#ticketImgUrl');
    const area = document.querySelector('#ticketRegion');
    const price = document.querySelector('#ticketPrice');
    const group = document.querySelector('#ticketNum');
    const rate = document.querySelector('#ticketRate');
    const description = document.querySelector('#ticketDescription');

    let obj = {};
    obj.id = Date.now();
    obj.name = name.value;
    obj.imgUrl = imgUrl.value;
    obj.area = area.value;
    obj.price = Number(price.value);
    obj.group = Number(group.value);
    obj.rate = Number(rate.value);
    obj.description = description.value;
    data.push(obj)

    const form = document.querySelector(".addTicket-form");
    form.reset();
    renderHtml();
}

addBtn.addEventListener("click", addCard);
areaSelect.addEventListener("change", function (e) {
    console.log(areaSelect.value);
    renderHtml(areaSelect.value);
});


axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
    .then(function (response) {
        data = response.data.data;
        renderHtml();
    })