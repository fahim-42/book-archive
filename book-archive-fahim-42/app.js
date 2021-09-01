let errorMessage = document.getElementById('error-message');
errorMessage.style.display = 'none';

let searchBook = () => {
    let searchField = document.getElementById('input-field');
    let searchText = searchField.value;

    searchField.value = '';

    if (searchText === '') {
        errorMessage.style.display = 'block';
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.docs));
    }
}

let displaySearchResult = results => {
    // console.log(results);
    let searchResult = document.getElementById('search-result');

    searchResult.textContent = '';

    results.forEach(result => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg" class="card-img-top" alt="">
                <div class="card-body">
                    <h4 class="card-title text-center">Book: ${result.title}</h4>
                    <h5 class="card-text text-center">Authors: ${result.author_name}</h5>
                    <h6 class="card-text text-center">1st Published: ${result.first_publish_year}</h6>
                </div>
            </div>`;
        searchResult.appendChild(div);
    });
}