const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission
  const query = searchInput.value;
  if (query) {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${query}`);
      const data = await response.json();
      displayUsers(data.items);
    } catch (error) {
      console.error(error);
    }
  }
});

function displayRepos(username, repos) {
    const reposDiv = document.createElement('div');
    reposDiv.innerHTML = `
      <h2>Repositories for ${username}</h2>
      <ul>
        ${repos.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('')}
      </ul>
    `;
    searchResults.appendChild(reposDiv);
  }
  

function displayUsers(users) {
  searchResults.innerHTML = ''; // Clear previous search results
  users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}" width="50">
      <a href="${user.html_url}" target="_blank">${user.login}</a>
    `;
    searchResults.appendChild(userDiv);
    userDiv.addEventListener('click', async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${user.login}/repos`);
        const repos = await response.json();
        displayRepos(user.login, repos);
      } catch (error) {
        console.error(error);
      }
    });
  });
}

function displayRepos(username, repos) {
  // Display repositories for the selected user
}
