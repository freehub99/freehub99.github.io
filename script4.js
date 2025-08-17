const animeGrid = document.getElementById('animeGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');

const itemsPerPage = 20;
let currentPage = 1;

// ✅ โหลดมาเฉพาะหมวด "ลักหลับ"
let filteredList = animeList.filter(anime => anime.type.includes("ลักหลับ"));

function renderPage(page) {
  animeGrid.innerHTML = '';
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredList.slice(start, end);

  noResults.style.display = pageItems.length === 0 ? 'block' : 'none';

  pageItems.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `
      <a href="${anime.link}" rel="noopener noreferrer">
        <img src="${anime.img}" alt="${anime.title}" />
        <div class="anime-info">
          <div class="anime-title">${anime.title}</div>
          <div class="anime-ep">${anime.type}</div>
        </div>
      </a>
    `;
    animeGrid.appendChild(card);
  });

  prevBtn.disabled = (page === 1);
  nextBtn.disabled = (page === Math.ceil(filteredList.length / itemsPerPage));
  renderPageNumbers();
}

function renderPageNumbers() {
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  pageNumbers.textContent = `หน้าที่ ${currentPage} / ${totalPages}`;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < Math.ceil(filteredList.length / itemsPerPage)) {
    currentPage++;
    renderPage(currentPage);
  }
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  currentPage = 1;
  filteredList = query === ''
    ? animeList.filter(anime => anime.type.includes("ลักหลับ"))
    : animeList.filter(anime =>
        anime.type.includes("ลักหลับ") &&
        (anime.title.toLowerCase().includes(query) ||
         anime.type.toLowerCase().includes(query))
      );
  renderPage(currentPage);
});

// เริ่มต้น render
renderPage(currentPage);
