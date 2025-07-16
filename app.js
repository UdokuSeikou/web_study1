const fs = require('fs');
 
async function main() {
    try {
        const data = fs.readFileSync('./data.txt');
        console.log('data.txtの内容: ');
        console.log(data.toString());
    } catch (err){
        console.error(err.message);
    }
}

main();