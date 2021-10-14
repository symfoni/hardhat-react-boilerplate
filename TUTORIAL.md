### We ❤️ these **Ethereum** projects:

- [Buidler](https://buidler.dev/) with the Deploy plugin 👷
- [Typechain 🔌](https://github.com/ethereum-ts/Typechain#readme)
- [ethers.js v5](https://github.com/ethers-io/ethers.js#readme)
- [web3modal](https://github.com/Web3Modal/web3modal#web3modal)

😩 Deployment and testing could be sooo tedious before. With these tools, we get Ethereum-projects which are easy to develop, manage, and maintain.

🤔 It's still kind of tedious, though. We have to find where every contract is deployed and connect them to the correct Typescript class before exporting it.

🤩 What if we wired all of this together and automatically generated the Typescript files, completely instantialized based on your smart contracts? What if all of these tools worked together in harmony?

### Enter our submission to the EthOnline 2020 hackathon!

# 🎻 Symfoni

> The tooling aggregator that makes your development process purr 😻

We wish to improve the output of Buidler(, and include Textile). You, as a developer, drop in your solidity code, and we generate a React app with:

- pluggable react context with contract loading
- web3modal
- ethers v5
- typed interfaces (!)
- (storage context with easy access to Textile)

> 🙈 Didn't get the time to include Textile (yet)

![](https://ethglobal.s3.amazonaws.com/rec9bgGRjbJFSIGFF/MicrosoftTeams-image.png)

### Team

[🇳🇴 Robin Pedersen](https://github.com/RobertoSnap), [🇳🇴 Jon Ramvi](https://github.com/ramvi/) and [ 🇩🇪 Hendrik Bilges](https://github.com/elektronaut0815)

## Getting started with Symfoni

This tutorial will get you up and running with the Greeter contract from the Buidler sample project. When you've done this once, you should have a feel for how to make your Đapps easily.

### OS Support

- MacOS
- Linux
- _The project has only been tested on MacOS and Linux. It should, in theory, work on Windows too. Don't hesitate to reach out if you experience problems._

## ⚙️ Setup new project

- Create an empty directory for the project, enter and initialize it:

`mkdir mySymfoniProject && cd mySymfoniProject && npm init -y`

- Use Buidler to create a project:

`npx @nomiclabs/buidler`

- If you want to test Symfoni, select the `Create a sample project`. This will give you a sample smart contract to play with. **Note that you must choose this if you wish to follow this tutorial all the way through.**

- If you do have project files to include, choose `Create an empty buidler.config.js` and copy/paste those solidity files into /contracts folder.

- Add Chai for testing in the dev environment:

`npm add --save-dev chai @types/node @types/mocha @types/chai`

- Create a deploy folder in the root:

`mkdir deploy`

- And [create a deployment file for each of your smart contracts](https://buidler.dev/plugins/buidler-deploy.html#deploy-scripts). If you chose to make a sample project in the first step, we have created a simple deploy script that you can use:

```bash
echo 'import {
  BuidlerRuntimeEnvironment,
  DeployFunction,
} from "@nomiclabs/buidler/types";

const func: DeployFunction = async function(bre: BuidlerRuntimeEnvironment) {
  const { deploy } = bre.deployments;
  const { deployer } = await bre.getNamedAccounts();
  await deploy("Greeter", {
    from: deployer,
    args: ["Let us play a Symfoni 🎻"],
  });
};
export default func;' > deploy/Greeter.ts
```

### Now let's add the Symfoni magic ✨

- Up until now, this is all just a regular Buidler project. Now run this command to add our packages, including dependencies:

```bash
npm add @nomiclabs/buidler @symfoni/buidler-react @symfoni/buidler-typechain @typechain/ethers-v5 buidler-deploy@next buidler-ethers-v5 ethers ts-generator ts-node typechain typescript
```

> If asked what version of buidler-deploy to install, choose 0.6.0-beta.35

- Convert the project to a Buidler Typescript project by overwriting Buidler with the Symfoni configuration files:

```bash
rm buidler.config.js
cp node_modules/@symfoni/buidler-react/defaults/buidler.config.default.ts buidler.config.ts
cp node_modules/@symfoni/buidler-react/defaults/tsconfig.default.json tsconfig.json
```

## 🎨 Let's create the front-end

### Metamask

Let's start by setting up Metamask with our test network and wallet. First, we need to give ourself some test-eth.

- Open the Buidler config file `buidler.config.ts` and add the test network beneath the solc version. The complete file should look like this:

```typescript=
import { BuidlerConfig, usePlugin } from "@nomiclabs/buidler/config";

usePlugin("buidler-ethers-v5");
usePlugin("buidler-deploy");
usePlugin("@symfoni/buidler-typechain");
usePlugin("@symfoni/buidler-react");

const config: BuidlerConfig = {
  solc: {
    version: "0.6.8",
  },
  networks: {
    buidlerevm: {
      accounts: [
        {
          balance: "0x1B1AE4D6E2EF500000", //5000
          privateKey:
            "0x50228cca6dd3264c74713855801d16e63a2b0e42e86fa374562316a629d03a30",
        },
      ],
    },
  },
};

export default config;
```

- In [Metamask](https://metamask.io/), use the test wallet mnemonic phrase:

```
shrug antique orange tragic direct drop abstract ring carry price anchor train
```

- Still in Metamask, change the network to `Localhost 8545`

### Generate the React app:

- Use "Create react app" to generate a Typescript app

`npx create-react-app frontend --template typescript`

- Now run the "back-end" by executing `npx buidler node --watch --reset`. This will

  - start a development chain
  - compile and deploy the contracts
  - generate the type interfaces for the contracts, and
  - generate a React context

- Next, open a new terminal window and go into the front-end folder:

`cd frontend/`

- Here we need to add some dependencies:

> Note that the "Create React app" comes with an old version of Typescript, which is not compatible with Typechain, so let's also ensure Typescript is fixed at v3.9.7. Please note that v4 does not work.

`npm add web3modal ethers typescript@^3.9.7`

- Do a npm install:

`npm i`

- Serve the generated front-end application:

`npm run start`

> A browser should start with the default "Create react app" webpage.

- Now, let's add the Buidler context to the front-end. Open `/frontend/src/App.tsx` in your preferred code editor.

- Add the React context generated by Symfoni to the imports on the top of the file. If you're using the Sample Project, it should be under `import './App.css';`

```typescript
import { BuidlerContext } from "./buidler/BuidlerContext";
```

- Wrap your app in this context to have it available to use in any children: `<BuidlerContext></BuidlerContext>`. In the Sample project, it should look like this:

```typescript=
<header className="App-header">
  <BuidlerContext>…</BuidlerContext>
</header>
```

- Please accept the connection request in the Metamask pop-up

- Let's now create a component that consumes a smart contract and gives us some results. From the Buidler sample project, we have a smart contract called `Greeter.sol`. Open up a third terminal window, create a directory for components, and create a `tsx` file for the view of the smart contract:

`mkdir src/components && touch src/components/Greeter.tsx`

- Open the file in your favorite editor and copy & paste:

```typescript=
import React, { useContext, useEffect, useState } from "react";
import { GreeterContext } from "./../buidler/BuidlerContext";

interface Props {}

export const Greeter: React.FC<Props> = () => {
  const greeter = useContext(GreeterContext);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const doAsync = async () => {
      if (greeter.instance) {
        console.log("Greeter is deployed at ", greeter.instance.address);
        setMessage(await greeter.instance.greet());
      }
    };
    doAsync();
  }, [greeter]);
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};
```

Or write this yourself and experience typed smart-contracts
![](https://media.giphy.com/media/w5KyWv8CCcfaB6vM1B/giphy.gif)

Note that the Greeter context both provides you with

- a contract which contains all your functions, events and info, and
- a factory where you can let users quickly deploy new contract instances from the front-end.

Let's import and display this component in our app, which leaves our `App.tsx` like this:

```typescript=
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BuidlerContext } from "./buidler/BuidlerContext";
import { Greeter } from './components/Greeter'; // ADD THIS LINE

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <BuidlerContext>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
          <Greeter></Greeter>  <!-- ADD THIS LINE -->
        </BuidlerContext>
      </header>
    </div>
  );
}

export default App;
```

> The buidler context will now ask `web3modal` for an injected provider. If it finds a provider, you should see the Greeting from the smart contract in the browser and the address the contract is deployed at in the console.

[📚 You can see a full working example of the Greeter sample here.](https://github.com/symfoni/buidler-react-boilerplate)

**Thanks for completing our tutorial! 🥳**

We hope you can use this to write Ethereum applications more efficiently 📈 . If you have any feedback, good or bad, please don't hesitate to ping us at [@\_robertosnap](https://twitter.com/_robertosnap/)🐦 or with an Issue here on Github.

# Tutorial 2: Create an ERC20 token with Symfoni

This tutorial aims to create a view where the user can create new ERC20 tokens using a web app and how easy it is to do with Symfoni 🎻.

- In your third terminal window from the tutorial above, go back to the project root directory

`cd ..`

- We can use the ERC20 code from OpenZeppelin. Install the OpenZeppelin codebase:

`npm i --save @openzeppelin/contracts`

- Now, we create our own ERC20, which inherits its code from OpenZeppelin. Our ERC20 token takes the following inputs
  - Name of the new token
  - Symbol, i.e., a shorthand for the token name, and
  - Amount; the number of tokens to mint and return to the token creator

```bash
echo '//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 amount
    ) public ERC20(name, symbol) {
        _mint(msg.sender, amount);
    }
}' > contracts/Token.sol
```

> Note that since the user will deploy the new tokens, we do not need Buidler to deploy anything. Hence we don't need a `deploy/Token.ts` file, like we did with the greeter.

- Restart Buidler to have Symfoni generate the typed React context for the contract. In your first terminal window, from the tutorial above, hit `Ctrl+c`, `arrow up`, and hit `enter`.

- Let's create a simple view for creating new tokens with only a text field and a submit button. In this component, we import
  - our TokenContext where we will use its factory to deploy it
  - the signer context to get access to the user's wallet

```bash
echo '
import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { SignerContext, TokenContext } from "./../buidler/BuidlerContext";
interface Props { }

export const MyToken: React.FC<Props> = () => {
    const token = useContext(TokenContext)
    const [signer] = useContext(SignerContext)
    const [inputName, setInputName] = useState("");


    const deployToken = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!token.factory) throw Error("Could not get token factory")
        if (!signer) throw Error("Could not get signer")
        const symbol = inputName.substr(0, 3).toUpperCase();
        const amount = ethers.utils.parseEther("5000")
        const myAddress = await signer.getAddress()

        const myToken = await token.factory.deploy(inputName, symbol, amount)
        await myToken.deployed()

        const currentBalance = await myToken.balanceOf(myAddress)
        console.log("My current balance is ", ethers.utils.formatEther(currentBalance))
    }
    return (
        <div>
            <input onChange={(e) => setInputName(e.target.value)}></input>
            <button onClick={(e) => deployToken(e)}>Create token</button>
        </div>
    )
}' > frontend/src/components/MyToken.tsx
```

- Import and display the MyToken component in `App.tsx`:

```typescript
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BuidlerContext } from "./buidler/BuidlerContext";
import { Greeter } from './components/Greeter';
import { MyToken } from './components/MyToken'; // ADD THIS LINE

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BuidlerContext>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Greeter></Greeter>
          <MyToken></MyToken>  <!-- ADD THIS LINE -->
        </BuidlerContext>
      </header>
    </div>
  );
}

export default App;
```

### What am I seeing? 👀

In `frontend/src/components/MyToken.tsx` the smart contract is available like any regular typed object:

![](https://i.imgur.com/HIceyBc.gif)

We check our balance through the myToken.balanceOf() function. We see that the return value is a BigNumber, so before outputting it to console, we format it with ethers utils.

Let's name our contract and deploy it. Our wallet provider should pop up with confirmations to deploy and transfer this new token.

![](https://i.imgur.com/Ne7DMQx.gif)

It couldn't be easier!

Thanks again for completing our two tutorials and checking out our submission to the EthOnline 2020 hackathon!

[🙌 You can see a full working example of the ERC20 project here.](https://github.com/symfoni/buidler-react-boilerplate/tree/bonus-erc20)

# Troubleshooting

- Some problem?
  - Try running `npm cache verify` and start again from the top

# Where to go from here

- Use Symfoni for your smart contracts, and start developing zero-friction Ethereum applications 🚀
