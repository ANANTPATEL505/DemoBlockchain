const redis = require('redis');

const channels = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
}

class PubSub {
    constructor({ blockchain }) {
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();
        this.blockchain = blockchain;

        this.connect();
    }

    async connect() {
        await this.publisher.connect();
        await this.subscriber.connect();

        await this.subscriber.subscribe(channels.TEST, (message) => {
            this.handleMessage(channels.TEST, message);
        });

        await this.subscriber.subscribe(channels.BLOCKCHAIN, (message) => {
            this.handleMessage(channels.BLOCKCHAIN, message);
        });
    }

    handleMessage(channel, message) {
        console.log(`Message received → Channel: ${channel}, Message: ${message}`);

        const parsemessage = JSON.parse(message);
        if (channel === channels.BLOCKCHAIN) {
            this.blockchain.replacechain(parsemessage);
        }
    }

    publish({ channel, message }) {
        this.publisher.publish(channel, message);
    }

    broadcastchain() {
        this.publish({
            channel: channels.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain),
        })
    }
}

// const checkPubSub = new PubSub();

// setTimeout(() => {
//     checkPubSub.publisher.publish(channels.TEST, 'hello');
// }, 1000);

module.exports = PubSub;