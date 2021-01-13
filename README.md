# Get started

1. Clone the repo and cd into it `git clone https://github.com/symfoni/hardhat-react-boilerplate.git MyProject && cd MyProject`
2. Install deps with yarn `yarn` or npm `npm install`
3. Start hardhat `npx hardhat node --watch`

![](https://media.giphy.com/media/9l6z9MzXfHX9gKzbvU/giphy.gif)

```text
It runs up a Hardhat node, compile contracts, generates typescript interfaces, creates React context and instantiates your contract instances and factories with frontend provider.
```

4. Open up a new terminal
5. `cd frontend`
6. Install deps with yarn `yarn` or npm `npm install`
7. Start React app with yarn `yarn start` or npm `npm start`

The frontend should start up at http://localhost:3000/.

Because of this default hardhat.config.ts it will first try to connect with an injected provider like Metamask (web3modal package does this).

If nothing found it will try to connect with your hardhat node. On localhost and hardhat nodes it will inject your mnemonic into the frontend so you have a "browser wallet" that can both call and send transactions. NB! Dont ever put a mnemonic with actual value here. We will limit this feature going forward so its more explicit.

```ts
const config: HardhatUserConfig = {
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },
};
```

The default mnemonic currently used by hardhat is `test test test test test test test test test test test junk`

# FAQ

## Metamask

Ensure you are useing RPC to http://localhost:8545.

You may also need to set the chainID to 1337 if you are useing Hardhat blockchain development node.

## Invalid nonce.

```bash
eth_sendRawTransaction
  Invalid nonce. Expected X but got X.
```

Reset your account in Metamask.

# We ❤️ these **Ethereum** projects:

- [Hardhat 👷](https://hardhat.org/)
- [Hardhat-deploy 🤘](https://hardhat.org/plugins/hardhat-deploy.html)
- [Typechain 🔌](https://github.com/ethereum-ts/Typechain#readme)
- [hardhat-typechain 🧙‍♀️](https://hardhat.org/plugins/hardhat-typechain.html)
- [ethers.js v5 ⺦](https://github.com/ethers-io/ethers.js#readme)
- [web3modal 💸](https://github.com/Web3Modal/web3modal#web3modal)
- [ts-morph 🏊‍♂️](https://github.com/dsherret/ts-morph)
- [@symfoni/hardhat-react 🎻(our own)](https://github.com/symfoni/buidler-plugins)
