const API_KEY = "5f56738879f44698b2fa950835ab5f08"; 
const url = "https://newsapi.org/v2/top-headlines?country=in";

async function fetchData(query) {
    const searchQuery = query ? `&q=${query}` : ''; // Include the search query if provided
    const res = await fetch(`${url}${searchQuery}&apiKey=${API_KEY}`);
    const data = await res.json();
    return data;
}

// Fetch and render all news articles
fetchData().then(data => renderMain(data.articles));

//menu btn
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
    mobilemenu.classList.toggle("hidden");
});

//render news 
function renderMain(arr) {
    let mainHTML = '';
    if (arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].urlToImage) {
                mainHTML += ` <div class="card">
                    <a href=${arr[i].url}>
                        <img src=${arr[i].urlToImage} loading="lazy" />
                        <h4>${arr[i].title}</h4>
                        <div class="publishbyDate">
                            <p>${arr[i].source.name}</p>
                            <span>•</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                            ${arr[i].description}
                        </div>
                    </a>
                </div>`;
            }
        }
    }
    document.querySelector("main").innerHTML = mainHTML;
}

const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInput.value);
    renderMain(data.articles);
});

searchBtnMobile.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInput.value);
    renderMain(data.articles);
});
