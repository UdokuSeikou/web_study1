const fs = require('fs');
const { prompt } = require('./mymodule');
 
async function main() {
    const msg = await prompt('please type: ');
    try {
        fs.writeFileSync('./data.txt', msg);
        console.log('save data.txt to write: ');
        console.log(msg);
    } catch (e) {
        console.error(e.message);
    }
}

main();