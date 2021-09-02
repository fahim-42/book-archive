// error-message
let errorField = document.getElementById('empty-field-error');
errorField.style.display = 'none';

let noResult = document.getElementById('no-result-error');
noResult.style.display = 'none';

// search-result counter
let totalSearch = document.getElementById('total-search');
totalSearch.style.display = 'none';

// call using 'Search' button
let searchBook = () => {
    let searchField = document.getElementById('input-field');
    let searchText = searchField.value;

    // clear search field after button click
    searchField.value = '';

    // error-message condition
    if (searchText === '') {
        errorField.style.display = 'block';
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.docs));
    }
}

let displaySearchResult = results => {
    let searchResult = document.getElementById('search-result');

    // clear old search-result 
    searchResult.textContent = '';
    
    // total search result counter
    totalSearch.style.display = 'block';
    totalSearch.innerHTML = `<h5 class="text-success fw-bold">Search result found: ${results.length}</h5>`;

    // what-if no result found
    if (results.length === 0) {
        noResult.style.display = 'block';
    }
    else {
        results.forEach(result => {
            const div = document.createElement('div');
            div.classList.add('col');
            // dynamic loading
            div.innerHTML = `
                <div class="card h-100 border border-dark border-2">
                    <img src="https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg" class="card-img-top w-50 mx-auto mt-3" alt="book-image">
                    <div class="card-body">
                        <h3 class="card-title bg-dark text-white text-center fw-bolder my-3 pb-2">${result.title}</h3>
                        <h5 class="card-text text-center my-3">${result.author_name}</h5>
                        <h6 class="card-text text-center text-secondary  fw-light my-3">1st Published in: ${result.first_publish_year}</h6>
                        <h6 class="card-text text-center text-secondary  fw-light my-3">Publisher: ${result.publisher}</h6>
                    </div>
                </div>`;
            searchResult.appendChild(div);
        });
    }
}