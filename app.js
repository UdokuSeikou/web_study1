const readline = require('readline');

const read = readline.createInterface({
        input:process.stdin,
        output:process.stdout
});

read.question('type any words: ', (answer) => {
    read.write('you typed:' + answer);
    read.close();
});