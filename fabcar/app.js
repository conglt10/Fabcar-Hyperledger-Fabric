const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client')));

const { FileSystemWallet, Gateway } = require('fabric-network');

const ccpPath = path.resolve(__dirname, '..', 'first-network', 'connection-org1.json');

app.get('/api/queryallcars', cors(), async function(req, res) {
  try {
    const walletPath = path.join(process.cwd(), './javascript/wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('user2');
    if (!userExists) {
      console.log('An identity for the user "user2" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: 'user2',
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');

    const contract = network.getContract('fabcar');

    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    const result = await contract.evaluateTransaction('queryAllCars');
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res.status(200).json({ response: result.toString() });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});

app.get('/api/query/:car_index', cors(), async function(req, res) {
  try {
    const walletPath = path.join(process.cwd(), './javascript/wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    const userExists = await wallet.exists('user2');
    if (!userExists) {
      console.log('An identity for the user "user2" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: 'user2',
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('fabcar');
    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    const result = await contract.evaluateTransaction('queryCar', req.params.car_index);
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res.status(200).json({ response: result.toString() });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});

app.post('/api/addcar/', cors(), async function(req, res) {
  try {
    const walletPath = path.join(process.cwd(), './javascript/wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    const userExists = await wallet.exists('user2');
    if (!userExists) {
      console.log('An identity for the user "user2" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      return;
    }
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: 'user2',
      discovery: { enabled: true, asLocalhost: true }
    });
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('fabcar');
    // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
    // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
    await contract.submitTransaction(
      'createCar',
      req.body.carid,
      req.body.make,
      req.body.model,
      req.body.colour,
      req.body.owner
    );
    console.log('Transaction has been submitted');
    res.send('Transaction has been submitted');
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
});

app.put('/api/changeowner/:car_index', cors(), async function(req, res) {
  try {
    const walletPath = path.join(process.cwd(), './javascript/wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    const userExists = await wallet.exists('user2');
    if (!userExists) {
      console.log('An identity for the user "user2" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      return;
    }
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: 'user2',
      discovery: { enabled: true, asLocalhost: true }
    });
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('fabcar');
    // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
    // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
    await contract.submitTransaction('changeCarOwner', req.params.car_index, req.body.owner);
    console.log('Transaction has been submitted');
    res.send('Transaction has been submitted');
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
});

const port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log('Live on port: ' + port);
});
