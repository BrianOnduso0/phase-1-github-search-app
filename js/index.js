document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('github-form')
    const userList = document.getElementById('user-list')
    const reposList = document.getElementById('repos-list')

    form.addEventListener('submit', function (event) {
        event.preventDefault()
        const searchInput = document.getElementById('search').value;
        searchUsers(searchInput)
    });

    async function searchUsers(query) {
        const url = `https://api.github.com/search/users?q=${query}`
        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (!response.ok) {
                throw new Error('The System has Failed to fetch users')
            }
            const data = await response.json();
            displayUsers(data.items)
        } catch (error) {
            console.error('The System is experiencing an Error searching for users:', error)
        }
    }

    async function getUserRepos(username) {
        const url = `https://api.github.com/users/${username}/repos`
        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (!response.ok) {
                throw new Error('The System has Failed to fetch user repositories')
            }
            const data = await response.json()
            displayRepos(data)
        } catch (error) {
            console.error('The System has an Error fetching user repositories:', error)
        }
    }

    function displayUsers(users) {
        userList.innerHTML = ''
        users.forEach(user => {
            const listItem = document.createElement('li')
            listItem.textContent = user.login
            listItem.addEventListener('click', function () {
                getUserRepos(user.login)
            })
            userList.appendChild(listItem)
        })
    }

    function displayRepos(repos) {
        reposList.innerHTML = ''
        repos.forEach(repo => {
            const listItem = document.createElement('li')
            listItem.textContent = repo.name
            reposList.appendChild(listItem)
        })
    }
})
