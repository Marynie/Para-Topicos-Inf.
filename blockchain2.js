const SHA256 = require("crypto-js/sha256");
var http = require('http');

var dt = new Date();
var timestamp = dt.toString();
var var1
var var2 = new Array();
var i = 0;

function onRequest(req, res){
    res.writeHead(200, {"Content-Type": "text/plain"});
    for(var j = 0; j < var2.length; j++){
        res.write("Mining block...\n");
        res.write(var2[j]);
        res.write("\n");
    }
    res.write(var1);
    res.end;
}

http.createServer(onRequest).listen(8888);

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        ).toString();
    }

    mineBlock(difficulty) {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
            ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        var2[i] = "Block mined: " + this.hash;
        console.log("Block mined: " + this.hash);
        i += 1;
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
        this.difficulty = 4;
    }

    createGenesis() {
        return new Block(0, "01/01/2018", "Genesis block", "0");
    }

    latestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    checkValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let enlightChain = new Blockchain();

console.log("Mining block...");
enlightChain.addBlock(new Block(1, timestamp, "This is block 1"));
console.log("Mining block...");
enlightChain.addBlock(new Block(2, timestamp, "This is block 2"));
console.log("Mining block...");
enlightChain.addBlock(new Block(3, timestamp, "This is block 3"));
console.log("Mining block...");
enlightChain.addBlock(new Block(4, timestamp, "This is block 4"));
console.log("Mining block...");
enlightChain.addBlock(new Block(5, timestamp, "This is block 5"));

var1 = JSON.stringify(enlightChain, null, 4);
//console.log("Is blockchain valid?" + enlightChain.checkValid().toString());