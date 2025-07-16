const { error } = require('console');
const fs = require('fs');
 
async function main() {
    fs.readFile('./data.txt', (err, data) =>{
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('data.textの中身: ');
        console.log(data.toString())
    })
}

main();