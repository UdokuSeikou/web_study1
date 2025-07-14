const { prompt } = require('./mymodule');

async function main() {
    const name = await prompt('あなたの名前は？');
    console.log(`こんにちは、${name}さん！`);
}

main()