
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    return data
}
const resturants = []; 
getData().then(data => resturants.push(...data));

function findMatches(matchWord, resturants) {
    return resturants.filter(resturant => {
        const regex = new RegExp(matchWord, 'gi');
        return resturant.zip.match(regex);
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, resturants)
    const html = matchArray.map(resturant => {
        return `
        <div class="block">
        <ul>
        <li>
            <span class="name"> ${resturant.name} </span>
            <span class ="category"> ${resturant.category} </span> 
            <span class ="address"> ${resturant.address_line_1} </span>
        </li>
        </ul>
        </div>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)