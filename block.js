const { GenesisBlock, mine_rate } = require('./conf');
const cryptohash = require('./cryptohash');
const hextobinary = require("hex-to-binary");

class Block{
    constructor({index, timestamp, data, prevHash, hash, nonce, difficulty}) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static Genesis() {
        return new this(GenesisBlock);
    }

    static mineblock({prevBlock, data}) {
        let hash,timestamp;
        let nonce=0;
        const prevHash = prevBlock.hash;
        let {difficulty}=prevBlock;
        const index = prevBlock.index + 1;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty=Block.adjust({originalBlock:prevBlock,timestamp})
            hash=cryptohash(timestamp,prevHash,data,nonce,difficulty);
        }while(hextobinary(hash).substring(0,difficulty) !== "0".repeat(difficulty));

        return new this({
            index,
            timestamp,
            prevHash,
            data,
            hash,
            nonce,
            difficulty,
        })
        
    }

    static adjust({originalBlock,timestamp}){
        const{difficulty}=originalBlock;
        if(difficulty <1 )return difficulty=1;
        const difference = timestamp-originalBlock.timestamp;
        if(difference > mine_rate) return difficulty-1;
        return difficulty+1;
    }
}

//const result =Block.mineblock({prevBlock:block1,data:"data2"});
//console.log(result);

module.exports=Block;