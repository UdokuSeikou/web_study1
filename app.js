const { prompt } = require('./mymodule');

const url = 'https://jsonplaceholder.typicode.com/todos/';

async function main() {
    const num = await prompt('number: ');
    fetch(url + num)
    .then(resp => resp.json())
    .then(json =>{
        console.log('ID: ' + json.id);
        console.log('User ID: ' + json.userId);
        console.log('Title: ' + json.title);
        console.log('Completed: ' + json.completed);
    })
}

main();