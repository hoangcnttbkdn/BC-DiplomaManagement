const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const org1UserId = 'appUserthanh';

const walletPath = path.join(__dirname, '..', '..', 'wallet');
const ccpPath = path.resolve(
  __dirname,
  '..',
  '..',
  'connection-profile',
  'connection-profile.json'
);
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

const connectBC = async () => {
  try {
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: false },
    });

    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    return { network, contract };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectBC };
