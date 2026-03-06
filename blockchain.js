const Block = require('./block');
const cryptohash = require('./cryptohash');

class Blockchain {
    constructor() {
        this.chain = [Block.Genesis()];


    }

    addBlock({ data }) {
        const newBlock = Block.mineblock({
            prevBlock: this.chain[this.chain.length - 1],
            data,
        })
        this.chain.push(newBlock);
    }

    replacechain(chain){
        if(chain.length<=this.chain.length){
            console.error("incoming chain is not longer")
            return;
        }
        if(!Blockchain.isValid(chain)){
            console.error("incoming chain is not valid")
            return;
        }
        this.chain=chain;
    }

    static isValid(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.Genesis()) ) 
        return false;

        for(let i=1; i<chain.length; i++){
            const {timestamp, prevHash, hash, data, nonce, difficulty} = chain[i];
            const realLastHash =chain[i-1].hash;
            const lastDifficulty=chain[i-1].difficulty;

            if(prevHash !== realLastHash) return false;

            const validateHash = cryptohash(timestamp,prevHash,data,nonce,difficulty);
            if (hash !== validateHash) return false;
            if(Math.abs(lastDifficulty - difficulty) > 1)return false;
        }
        return true;
    }
}

// const blockchain=new Blockchain();
// blockchain.addBlock({data:"block1"});

// console.log(blockchain);
//const result = Blockchain.isValid(blockchain.chain);
//console.log(result);

module.exports=Blockchain;