const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
menuToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    navMenu.classList.toggle('active');
  }
});

const animeGrid = document.getElementById('animeGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const pageNumbers = document.getElementById('pageNumbers');

const itemsPerPage = 20;
let currentPage = 1;
let filteredList = animeList.filter(anime => anime.type.includes("แตกใน"));

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
  pageNumbers.innerHTML = '';
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const maxPages = 8;

  const createButton = (i) => {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) {
      btn.classList.add('active');
      btn.disabled = true;
    }
    btn.addEventListener('click', () => {
      currentPage = i;
      renderPage(currentPage);
      window.scrollTo(0, 0);
    });
    pageNumbers.appendChild(btn);
  };

  const createEllipsis = () => {
    const dot = document.createElement('span');
    dot.textContent = '...';
    pageNumbers.appendChild(dot);
  };

  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) createButton(i);
  } else {
    createButton(1);
    let start = Math.max(2, currentPage - 3);
    let end = Math.min(totalPages - 1, currentPage + 4);
    if (end - start + 1 > maxPages) end = start + maxPages - 1;
    if (start > 2) createEllipsis();
    for (let i = start; i <= end; i++) createButton(i);
    if (end < totalPages - 1) createEllipsis();
    createButton(totalPages);
  }
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
    window.scrollTo(0, 0);
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
    window.scrollTo(0, 0);
  }
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  currentPage = 1;
  filteredList = query === ''
    ? animeList
    : animeList.filter(anime => anime.title.toLowerCase().includes(query));
  renderPage(currentPage);
});

renderPage(currentPage);
