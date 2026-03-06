# Node.js Blockchain with Redis Pub/Sub

A simple **peer-to-peer blockchain network** built with **Node.js, Express, and Redis Pub/Sub**.
This project demonstrates how multiple blockchain nodes can **synchronize chains and broadcast updates** across the network.

---

# Features

* Basic **Blockchain implementation**
* **Proof-of-work mining**
* **Chain validation**
* **Peer-to-peer synchronization**
* **Redis Pub/Sub communication**
* REST API for interacting with blockchain
* Multi-node network simulation

---

# Project Structure

```
.
├── avgtime.js
├── block.js
├── blockchain.js
├── conf.js
├── cryptohash.js
├── index.js
├── pubsub.js
├── package.json
```

### File Description

| File            | Purpose                          |
| --------------- | -------------------------------- |
| `index.js`      | Main server entry point          |
| `block.js`      | Block structure and mining logic |
| `blockchain.js` | Blockchain class and validation  |
| `cryptohash.js` | SHA256 hashing utility           |
| `conf.js`       | Blockchain configuration         |
| `pubsub.js`     | Redis Pub/Sub communication      |
| `avgtime.js`    | Block mining time testing        |

---

# Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/blockchain-nodejs.git
```

Go into the project folder:

```bash
cd blockchain-nodejs
```

Install dependencies:

```bash
npm install
```

---

# Requirements

You must install:

* Node.js
* Redis

Start Redis server:

```bash
redis-server
```

---

# Running the Project

Start the main node:

```bash
node index.js
```

Server runs on:

```
http://localhost:3000
```

---

# Running Multiple Peers

To simulate a decentralized network run:

```bash
npm run dev-peer
```

This generates a **random peer port** and connects to the main node.

Example:

```
Peer node → localhost:3456
Peer node → localhost:3789
```

---

# API Endpoints

### Get Blockchain

```
GET /api/blocks
```

Returns the full blockchain.

Example:

```json
[
  {
    "timestamp": 123456,
    "data": "Genesis Block"
  }
]
```

---

### Mine a Block

```
POST /api/mine
```

Request body:

```json
{
  "data": "hello blockchain"
}
```

This will:

1. Mine a new block
2. Add it to the chain
3. Broadcast it to peers

---

# Blockchain Rules

The blockchain enforces:

* Chain must start with **Genesis Block**
* Hash must be valid
* Previous hash must match
* Difficulty adjustment allowed only by **±1**

Validation occurs in:

```
blockchain.js
```

---

# Pub/Sub Communication

The network uses **Redis channels**.

Channels:

```
TEST
BLOCKCHAIN
```

When a block is mined:

1. Node publishes the chain
2. Other nodes receive update
3. Chains are validated
4. Longer valid chain replaces current one

---

# Example Workflow

Start Redis:

```
redis-server
```

Start root node:

```
node index.js
```

Start peers:

```
npm run dev-peer
```

Mine block:

```
POST http://localhost:3000/api/mine
```

Peers automatically update.

---

# Dependencies

Main libraries used:

* Express
* Redis
* Body-parser
* Request
* Cross-env
* Nodemon

---

# Educational Purpose

This project is built to understand:

* Blockchain fundamentals
* Peer-to-peer networks
* Distributed systems
* Proof-of-work mining
* Pub/Sub messaging

---

# Future Improvements

* Wallet system
* Transactions
* Digital signatures
* Mining rewards
* P2P networking (WebSockets)
* Smart contracts

---

# Author

Anant Patel

---

# License

ISC
