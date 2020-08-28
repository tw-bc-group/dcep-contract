const RMB = artifacts.require("RMB");

module.exports = async (deployer, network, accounts) => {
    console.log(`Using network: ${network}`);
    console.log(`Using accounts`, accounts);
    await deployer.deploy(RMB);
    console.log(`Deployment of RMB contracts completed`);
};
