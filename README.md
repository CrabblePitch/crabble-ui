# Crabble UI
Crabble is a NFT lending/borrowing platform for NFTs with any sort of utility. This repository
contains the client side code for Crabble platform. 

## Use Cases
For a high level overview of the end-to-end flow please see [Use Cases document.](./useCases.md) 

## Setup && Run
### Install `agoric-sdk`
Although client code does not depend on most of the core sdk features of `agoric-sdk` it's better to stay consistent
with backend code(meaning smart-contracts) which is built on the `mainnet-1b` version of the sdk.
```shell
git clone https://github.com/anilhelvaci/agoric-sdk.git
cd agoric-sdk
git checkout crabble-test
yarn install
yarn build
yarn link-cli ~/bin/agoric
agoric --version
```

If `agoric --version` works, then execute below command.
````shell
cd agoric-sdk/packages/cosmic-swingset
make
````

Run `agd --help` to see if the `make` command succeeded.

### Create Test Accounts (One Time)
We need some test accounts (public and private keys with certain names) to mimic the user when we're developing
the client side. It's important that you make sure the account names are `gov1` and `gov2` as we'll depend on 
these accounts to exist in a future step.
````shell
agd keys add gov1 --keyring-backend=test
agd keys add gov2 --keyring-backend=test
````

Save the mnemonics to somewhere persistent.

### Start Agoric Blockchain
For our development environment we need to start a local Agoric blockchain. Run below script for that.
````shell
cd agoric-sdk/packages/agoric-cli/test
./scripts/start-local-chain.sh
````

Wait until yoe see `block 17 commit` in the log window that should pop up when you run `start-local-chain.sh`

### Install and Run Agoric Wallet
Agoric has its own wallet web app for packaging and sending transactions to Agoric blockchain. You should start
a local version of the wallet app before starting your dapp development. 

```shell
git clone -b crabble-ui https://github.com/anilhelvaci/wallet-app.git
cd wallet-app && yarn install
cd wallet && yarn start
```

Open `http://localhost:3000/wallet` in the browser **you've Keplr extension installed**. 

### Add `Agoric localhost` to Keplr
Follow the steps below;
* Open `http://localhost:3000/wallet` in the browser you've Keplr extension installed.
* Accept terms etc. and close any dialog that might open
* Go to `Settings` in the top right corner
* Choose `Localhost` from the dropdown in the opened dialog
* Click `Connect` 

  <img width="60%" alt="Screen Shot 2023-01-23 at 11 57 16 AM" src="https://user-images.githubusercontent.com/8848650/214137346-b42942db-3b93-413a-991e-c77e2a30d6f1.png">  

Once you go thorough above steps a Keplr windows should open asking you to approve the `Agoric localhost` chain.
Approve the local Agoric blockchain. You might see the wallet app complaining about some stuff, for now don't let it
bother you. We'll get back to that later.

### Import `gov1` and `gov2` to Keplr
Follow the steps below;
* Open Keplr browser extension
* Click profile icon in the top right corner
* Click `Add Wallet`
* Choose `Import an existing wallet`
* Choose `Use recovery phrase or private key`
* Select `24 Words`
* Paste one of the mnemonics you saved from the earlier step and click `Import`
* Make sure `Agoric localhost` is selected in the visible chains

Remaining steps are not our concern, just complete the process.

### Provision the Smart Wallet
Remember me telling you the wallet app might complain some stuff. Well that 'some stuff' is actually the wallet app
telling you that you haven't provisioned(created) a `smart-wallet` yet. Don't worry the wallet app creates one for 
you if you want it to. To provision a smart-wallet you must have 10 BLDs in your account which we happen to have
because `start-local-chain.sh` sends some funds to `gov1` and `gov2` during the boot process. It also should provision
smart-wallets for gov1 and gov2, but I've encountered some problems in that step that's why I said the wallet app 
'might' complain about smart-wallet. Just click `Create` if you see the below dialog.

<img alt="Provision Smart Wallet" src="./img.png" width="60%">

### Start Crabble UI
Finally, we can now run our actual project to start working on.
```shell
git clone https://github.com/CrabblePitch/crabble-ui.git
cd crabble-ui
yarn install
yarn dev
```

## Deploy Crabble Protocol
### Start Ag-Solo
`ag-solo` is an off-chain agent that can interact with Agoric blockchain. We need an `ag-solo`
to deploy our smart contracts. Open a terminal and run below command:

````shell
cd agoric-sdk/packages/cosmic-swingset
make SOLO_COINS='13000000ubld,12345000000uist,1122000000ibc/toyusdc' scenario2-run-clientd
````

In another terminal;
```shell
cd agoric-sdk/packages/cosmic-swingset
agoric open --no-browser --repl
```

Copy&paste the link to you browser.

### Install `crabbleProtocol`
Open another terminal and execute below commands;

```shell
git clone -b ui-prep https://github.com/CrabblePitch/crabbleProtocol.git
cd crabbleProtocol/source-code 
agoric install
```

### Deploy Crabble Smart Contract
In order to deploy our Crabble Protocol we need to execute a `core-eval` which is piece of
software the Agoric community votes on whether or not it should execute. We have prepared 
a Makefile to make things easier. In order for the Makefile to work properly you need to change
a variable at the top of the file called `SDK_ROOT`. For example;

````shell
SDK_ROOT = $(shell cd ../../agoric-master >/dev/null && pwd) ## Your sdk path here
````

You need to replace `../../agoric-master` with you own agoric-sdk path. Remember you'll 
execute make commands from `crabbleProtocol/source_code`, so if you plan to use a relative path
to your agoric-sdk, remember to use a path relative to `crabbleProtocol/source_code`.

Open one more terminal;

```shell
# Do not forget to update your 'SDK_ROOT'
cd crabbleProtocol/source_code
make deploy-from-scratch
```

Once `make deploy-from-scratch` exits, in 1 minute you should see a `crabble` property in your 
`ag-solo`'s `home` object.  
