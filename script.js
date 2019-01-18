const button = document.querySelector('button');
const subInput = document.querySelector('input');
const result = document.querySelector('#result');

function renderList(json) {
    const posts = json.data.children;
    return `<ol> 
        ${posts.map(post => `<li>${post.data.title} <a href=${post.data.url} target='_blank'>Link</a> 
        <p>${post.data.selftext}</p></li>`).join('')}
    </ol>`;
}

async function fetchTopReddit(category) {
    const URL = `https://www.reddit.com/r/${category}/top/.json?limit=10`;
    try {
        const fetctResult = await fetch(new Request(URL, { method: 'GET', cache: 'reload' }));
        const response = await fetctResult;
        if(response.ok) {
            const jsonData =await response.json();
            result.innerHTML = renderList(jsonData);
        }else{
            result.innerHTML = `Response.status: ${reponse.status}`;
        }
    } catch (error) {
        result.innerHTML = error;
    }
}
button.addEventListener('click', () => {
    fetchTopReddit(subInput.value);
});