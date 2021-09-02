// DOM object fetching
const searchField = document.getElementById('search-field');
const isLoading = document.getElementById('loading');
const booksFound = document.getElementById('books-found');
const searchResult = document.getElementById('search-result');

isLoading.style.display = 'none';

// fetching books search url
const searchBtn = () => {

    if (document.getElementById('search-field').value == '') {
        alert("Please enter any book name");
    }

    else {
        isLoading.style.display = 'block';

        const searchText = searchField.value;
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => displayBook(data));
        searchField.value = '';

        clearSearchResults();
    }
}

// clearing previous result
const clearSearchResults = () => {
    booksFound.textContent = '';
    while (searchResult.firstChild) {
        searchResult.removeChild(searchResult.firstChild);
    }
}

// search result found
const resultFound = (result) => {
    isLoading.style.display = 'none';
    const div = document.createElement('div');
    div.innerHTML = `
            <h4 class="text-primary">${result}</h4>
        `;
    booksFound.appendChild(div);
}

// matched books details
const displayBook = (data) => {

    if (data.numFound === 0) {
        resultFound('No result found');
    }

    else {
        resultFound(`${data.numFound} books found`);

        data.docs.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('col');

            div.innerHTML = `
            <div class="card h-100 rounded">
            
                    <div class="w-75 my-4 rounded mx-auto border border-success">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 10909258}-M.jpg" class="card-img-top mw-100" style="width:100%; height:25vw;object-fit:cover" alt="...">
                    </div>
            
                    <div class="card-body">

                        <h5 class="card-title">
                            <span class="fw-bold text-success">Book Title : </span>
                            ${book.title}
                        </h5>

                        <p class="mt-3 mb-1 pb-0 card-text">
                            <span class="fw-bold text-success">Author Name : </span>
                            ${book.author_name ? book.author_name : ''}
                        </p>

                        <p class="my-1 py-0 card-text">
                            <span class="fw-bold text-success">Publisher Name : </span>
                            ${book.publisher ? book.publisher : ''}
                        </p>

                        <p class=" my-1 py-0 card-text">
                            <span class="fw-bold text-success">First Published In : </span>
                            ${book.first_publish_year ? book.first_publish_year : ''}
                        </p>

                    </div>

                </div>
            `;
            searchResult.appendChild(div);
        });
    }
}