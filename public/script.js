
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

function displayMatches(event) {
    const matchArray = findMatches(event.target.value, resturants)
    const html = matchArray.map(resturant => {
        return `
        <div class="block">
        <ul>
        <li class="results">
            <span class="name"> ${resturant.name} </span><br />
            <span class="category"> ${resturant.category} </span> <br /> 
        <address class="alpha">
            <span class="address"> ${resturant.address_line_1} </span> <br />
            <span class="city"> ${resturant.city}</span> <br />
            <span class="zip">${resturant.zip}</span> 
        </address>
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