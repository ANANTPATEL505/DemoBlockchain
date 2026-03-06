const mine_rate=1000;
const initial_difficulty=10;

const GenesisBlock ={
    index :0,
    timestamp :"1",
    data :[],
    prevHash :"0x000",
    hash :"0xgenesis",
    nonce: 0,
    difficulty:initial_difficulty,
};
module.exports = { GenesisBlock,mine_rate };