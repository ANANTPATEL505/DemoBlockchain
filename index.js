const express =require('express');
const Blockchain =require('./blockchain');
const bodyParser = require('body-parser');
const PubSub = require('./pubsub');
const request = require('request');

const app=express();
const blockchain=new Blockchain();
const pubsub=new PubSub({blockchain});

const DEFAULT_PORT=3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

setTimeout(() => pubsub.broadcastchain(), 1000);

app.use(bodyParser.json());

app.get('/api/blocks',(req,res)=>{
    
    res.json(blockchain.chain)

})

app.post('/api/mine',(req,res)=>{

    const{data}=req.body;
    blockchain.addBlock({data});
    pubsub.broadcastchain();
    res.redirect('/api/blocks');
})

const sync=()=>{
    request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},(error,response,body)=>{
        if(!error && response.statusCode===200){
            const rootchain = JSON.parse(body);
            console.log("Replace chain on sync with",rootchain);
            blockchain.replacechain(rootchain)
        }
    })
}

let PEER_PORT;

if(process.env.GENERATE_PEER_PORT === "true"){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000);
}

const port = PEER_PORT || DEFAULT_PORT;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
    sync();
});