const APIURL = "https://api.github.com/users/";

const main  = document.getElementById('main')
const form  = document.getElementById('form')
const search  = document.getElementById('search')

async function getUser(username) {
	try {
		const {data} = await axios(APIURL + username)
		createUserCard(data)
		getRepos(username)

	}catch(err){
		if(err.response.status === 404){

			createErrorCard('No profile with this username')
		}

	}
		
}

async function getRepos(username){
	try {
		const {data} = await axios(APIURL + username + '/repos?sort=created')
		addReposToCard(data)

	}catch(err){
		

			createErrorCard('Problem fetching repos')
		}

	}



function createUserCard(user){
	const cardHtml = ` <div class="card">
	<div>
		<img src="${user.avatar_url}" alt='Avatar of ${user.name}' class="avatar">
	</div>
	<div class="user-info">
		<h2>${user.name}</h2>
		<p>${user.bio}</p>
		<ul>
			<li>${user.followers} <span> Folllowers</span></li>
			<li>${user.following} <span> Following</span></li>
			<li>${user.public_repos}<span> Repos</span></li>
		</ul>
<div id="repo">

</div>
	</div>
</div>`
main.innerHTML= cardHtml

}
function createErrorCard(msg){
	const cardHTML = `
	<div class='card'>
<h1>${msg}</h1>
	</div>
	`
	main.innerHTML = cardHTML

}

function addReposToCard(repos){
	const reposElement = document.getElementById('repo')
	repos
	.slice(0,14)
	.forEach(repo => {
		const repoEl = document.createElement('a')
		repoEl.classList.add('repo')
		repoEl.href = repo.html_url
		// repoEl.target = '_blank'
		repoEl.innerText = repo.name
		reposElement.appendChild(repoEl)
	})
}

form.addEventListener('submit', (e)=>{
	e.preventDefault()

	const user = search.value

	if(user){
		getUser(user)
		search.value= ''
	}
})
