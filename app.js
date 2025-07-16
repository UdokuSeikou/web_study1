const fs = require('fs');
const { prompt } = require('./mymodule');
const { error } = require('console');

let data = [];
let fname = 'message.json';
let flg = true;

async function main() {
    let opt = {encoding:'utf8'}
    let bf = fs.readFileSync(fname, opt);
    data = JSON.parse(bf.toString('utf8'));

    while (flg) {
        let cmd = await prompt('cmd(a/d/f/q)');
        switch (cmd.toString()){
            case 'a':
                await add();
                break;
            case 'd':
                await del();
                break;
            case 'f':
                await find();
                break;
            case 'q':
                await quit();
                break;
            default:
                console.log('None Command');
        }
    }
}

//メッセージの追加
async function add() {
    let bf = await prompt('type message: ');
    let msg = bf.toString('urf8');
    let item = {
        date : new Date(),
        message : msg
    }
    data.unshift(item);
    console.log('message added.');
}

//メッセージの削除
async function del() {
    for (let key in data){
        console.log( key + ':' + data[key].message);
    }
    let bf = await prompt('type number: ');
    let num = +bf.toString();
    console.log('item: ' + data[num].message);
    bf = await prompt('delete it? (y/n): ');
    if (bf.toString() == 'y'){
        data.splice(num, 1);
    }
}

//メッセージの検索
async function find() {
    let bf = await prompt('find: ');
    let find = bf.toString('utf8');
    for (let i in data){
        if (data[i].message.index0f(find) > -1){
            console.log( i + ':' + date[i].message);
        }
    }
}

//終了
async function quit() {
    flg = false;
    let opt = {encoding:'utf8'}
    fs.writeFile ( fname, JSON.stringify(data, '', 2), opt, (err) => {
        if (err){
            console.error(error.message);
            return;
        }
        console.log('quit now!')
    })
}

main();