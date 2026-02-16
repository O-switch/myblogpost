const apiURL = "https://dev.to/api/articles";
const container = document.getElementById("container");

// craete async function to fetch articles from API
async function loadArticles() {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const articles = await response.json();

        container.innerHTML = "";

        articles.forEach(article => {
            // Create card element
            const card = document.createElement("div");
            card.classList.add("card");

            // Use cover_image or profile_image 
            const imageURL = article.cover_image || article.user.profile_image;


            card.innerHTML = `
        <img src="${imageURL}" alt="image not found" class="card-img">
        <div class="card-content">
          <h2 class="card-title">${article.title}</h2>
          <p class="card-description">${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank" class="card-link">Read More</a>
        </div>
      `;
            // appendChild to card
            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p class="error">Failed to load articles. Please try again later.</p>`;
    }
}

// Load articles on page load
loadArticles();
