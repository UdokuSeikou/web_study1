const { prompt } = require('./mymodule');
 
const url = 'https://jsonplaceholder.typicode.com/todos/';

const data = {
    id: 201,
    userid: 1001,
    title: null,
    completed: false
};

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: null
};


async function main() {
    const title = await prompt('title: ');
    data.title = title;
    options.body = JSON.stringify(data);

    const resp = await fetch(url, options);
    if (resp.status == 201){
        console.log('登録しました');
        const json = await resp.json();
        console.log(json);
    } else {
        console.log('登録に失敗しました');
        console.log('status: ' + resp.status)
    }
}

main();