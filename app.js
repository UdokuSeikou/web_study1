const fs = require('fs');
const { prompt } = require('./mymodule');
const { error } = require('console');
 
async function main() {
    const msg = await prompt('please type: ');
    fs.writeFile('./data.txt', msg, (err) =>{
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('save data.txt to write:');
        console.log(msg);
    });
}

main();