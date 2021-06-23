Hello Welcome To the Romulon Token Exchange

This Dapp currently has the capabilities to make transactions on the Kovan Test Network.

Note that this is still in development and changes will be added overtime.

If you would like help building you own crypto exchange please dont hesitate to message me.

Sharing knowledge is what makes us stronger!



Instructions on how to use this dapp

Also refer to the setup video as well for further clarification

Things you will need to have if you want to use the kovan test network for development purposes:

The Metamask wallet chrome extension to connect to the exchange.

Two wallets containing Kovan eth which I will describe below how to get in a moment.

You must take the two wallets private key’s and and add them to a .env file.

You will need an Infura API key as well and add that to the env file, if you look in the truffle config file you will notice how the privatekeys and infura_api_key functions work with the metamask wallet



Things you will need to work on a local blockchain and run tests

The Metamask wallet chrome extension to connect to the exchange.

A ganache workspace, you can quickstart and it will connect, be sure to go to settings, go to chain and set your hardfork to Petersburg so the account value is displayed properly on metamask.

You can take the first two wallets containing 100 ETH each and import them into metamask. Go to metamask, go to settings, go to import account, copy paste the private key by going to Ganache and clicking the key symbol to the far right to display the private key.

You must take the two wallets private key’s and and add them to a .env file.

You will need an Infura API key as well and add that to the env file, if you look in the truffle config file you will notice how the privatekeys and infura_api_key functions work with the metamask wallet


-Run npm install and install all the dependencies 

-Start up the local server with npm start

-To use a private network on metamask go to settings go to networks, add private network, the URl we use is from Ganache and looks like this HTTP://127.0.0.1:7545
-Now any tests we run and transactions we make will be saved on Ganache


NOTE: I use windows terminal with ubuntu for my command line


-cd into the project directory and we are going to start running some truffle commands

-If we are on thePrivate network, using Ganache we are going to go to the command line and type this:


truffle migrate


-This will run our contracts on the private network connected to Ganache.
-Now the exchange will show some information, but if we want to have some orders to give the exchange some data we can run:


truffle exec scripts/seed-exchange.js 


-This will make some transactions and a few orders that we can fill with the connected account.

Now you are set up to make transactions on the private network connected to Ganache.

____________________________________________________________________________
____________________________________________________________________________



-If we are on the Kovan test network, got to this website https://gitter.im/kovan-testnet/faucet#
And post your account address on there, and you will get sent Kovan ETH; be careful you can only request once a day, but it will give you enough Kovan ETH to run the seeded data.

-We are going to go to the command line and type this:


truffle migrate --network kovan


-This will run our contracts on the kovan test network
-Now the exchange will show some data but if we want to have some orders to give the exchange some data we can run:


truffle exec scripts/seed-exchange.js --network kovan


-This will make some transactions and a few orders that we can fill with the connected account, all the transactions will also be available on etherscan.

Now you are set up to make transactions on the Kovan Test network



