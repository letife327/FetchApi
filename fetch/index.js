
let skip = 0;
let limit = 20;
let tbody = document.getElementById('tbody')
let total = 0;
let select = document.getElementById('limit-select')
let inp = document.getElementById('search-input')
let q =''

inp.addEventListener('keyup',(e)=>{
    q = e.target.value;
    fetchUser();
})

select.addEventListener('change',(e)=>{
    e.preventDefault();
    limit =Number(e.target.value)
    fetchUser();
    
})


let fetchUser = () => {
    fetch(`https://dummyjson.com/users/search?skip=${skip}&limit=${limit}&q=${q}`)
        .then(res => res.json())
        .then((data) => {
            total = data.total;
            generateTbody(data.users);
            createList();
        });

}


let generateTbody = (user) => {
    let str = '';
    for (let index = 0; index < user.length; index++) {
        str += getTbodyRows(user[index]);
        
    }
    tbody.innerHTML = str;
}


let getTbodyRows = (user) => {
    return `<tr>
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.gender}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.birthDate}</td>
        <td>${user.ip}</td>
        <td>${user.macAddress}</td>
    </tr>`
    
}



let pagination = document.getElementById('pagination-list')
fetchUser();



let createList = () => {
    let html = '';
    let currentPage =Math.floor(skip/limit)+1
    html += `<li class="page-item">
    <a id="prev" href="#" class="page-link ${skip==0? "disabled": ""}" >
    Previous
    </a>
    </li>`;
    for (let i = 1; i < Math.ceil(total / limit); i++) {
        html += `<li class="page-item"><a id="${i}" href="#" class="page-link ${i===currentPage? 'active':''} ">${i}</a></li>`;
    }
    html += `<li class="page-item"><a id="next" href="#" class="page-link ${skip+limit>=100? "disabled": ""}">Next</a></li>`;
    pagination.innerHTML = html;

}
let link = document.getElementsByClassName('page-link')
pagination.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.target.tagName);
    if (e.target.tagName === 'A') {
        const action = e.target.id;
        switch (action) {
            case 'prev':
                skip = skip - limit;
                fetchUser();
                break;
            case 'next':
                skip = skip + limit;
                fetchUser();
                break
            default:
                const page = Number(e.target.id);
                skip = (page-1)*limit;
                fetchUser();

        }
    }

})

























