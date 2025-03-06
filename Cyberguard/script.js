const bgAnimation = document.getElementById('bgAnimation');

const numberOfColorBoxes = 400;

for (let i = 0; i < numberOfColorBoxes; i++) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('colorBox');
    bgAnimation.append(colorBox)
}
document.getElementById('chatIcon').addEventListener('click', function() {
  const chatContainer = document.getElementById('chatContainer');
  chatContainer.style.display = (chatContainer.style.display === 'block') ? 'none' : 'block';
});



function toggleAuthCards(element, cardNames) {
  const section = element.closest('.auth-section'); 
  const wrapper = section.querySelector('.auth-card-wrapper');

  element.classList.add('fade-out');

  setTimeout(() => {
      let cardHTML = '<div class="auth-container" id="auth-container">';

      cardNames.forEach(name => {
          cardHTML += `<div class="auth-card pop-in">${name}</div>`;
      });

      cardHTML += '</div>';
      wrapper.innerHTML = cardHTML;

      // Add event listener to close when clicking outside
      document.addEventListener("click", (event) => closeAuthCards(event, section, cardNames), { once: true });
  }, 500);
}

function closeAuthCards(event, section, cardNames) {
  const authContainer = section.querySelector("#auth-container");

  if (!authContainer.contains(event.target)) {
      section.querySelector(".auth-card-wrapper").innerHTML = `
          <div class="auth-card pop-in main-card" 
              onclick="toggleAuthCards(this, ${JSON.stringify(cardNames)})">
              Core Security Features
          </div>
      `;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("newsPopup");
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.querySelector(".close");
  const refreshBtn = document.getElementById("refreshNews");
  const newsContainer = document.getElementById("newsContainer");

  const API_KEY = "25d41a220978408eb22dafba84dc4a74";  // Replace with your API key

  function getApiUrl() {
      // Add a random word or timestamp to the query to force new results
      const randomQuery = ["hacking", "ransomware", "data breach", "dark web", "cyber attack"];
      const randomWord = randomQuery[Math.floor(Math.random() * randomQuery.length)];
      return `https://newsapi.org/v2/everything?q=cybercrime+${randomWord}&pageSize=10&apiKey=${API_KEY}&timestamp=${new Date().getTime()}`;
  }

  async function fetchNews() {
      newsContainer.innerHTML = "<p>Loading...</p>"; // Show loading state
      try {
          const response = await fetch(getApiUrl(), { cache: "no-store" }); // Ensure cache bypass
          const data = await response.json();

          if (data.articles.length > 0) {
              newsContainer.innerHTML = data.articles
                  .slice(0, 10)
                  .map(article => `
                      <div class="news-article">
                          ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News Image" class="news-image">` : ""}
                          <h3 class="news-title"><a href="${article.url}" target="_blank">${article.title}</a></h3>
                          <p>${article.description || "No description available"}</p>
                      </div>
                  `)
                  .join("");
          } else {
              newsContainer.innerHTML = "<p>No cybercrime news found.</p>";
          }
      } catch (error) {
          newsContainer.innerHTML = "<p>Error fetching news.</p>";
          console.error(error);
      }
  }

  openBtn.addEventListener("click", () => {
      popup.style.display = "block";
      fetchNews();
  });

  closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
  });

  refreshBtn.addEventListener("click", () => {
      fetchNews();
  });

  window.addEventListener("click", (event) => {
      if (event.target !== popup && event.target !== openBtn && !popup.contains(event.target)) {
          popup.style.display = "none";
      }
  });
});
