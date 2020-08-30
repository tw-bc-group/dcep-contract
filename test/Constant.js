const {
  constants,
  BN,           // Big Number support
} = require('@openzeppelin/test-helpers');
const web3 = require("web3");

const ONE_HUNDRED = web3.utils.fromAscii("CB_100_0001");
const FIFTY = web3.utils.fromAscii("CB_50_0001");
const TWENTY = web3.utils.fromAscii("CB_20_0001");
const TEN = web3.utils.fromAscii("CB_10_0001");
const FIVE = web3.utils.fromAscii("CB_5_0001");
const ONE = web3.utils.fromAscii("CB_1_0001");
const FIVE_JIAO = web3.utils.fromAscii("CB_05_0001");
const ONE_JIAO = web3.utils.fromAscii("CB_01_0001");

const CIRCULATION = 1;
module.exports = {
  CIRCULATION,
  ONE_HUNDRED,
  FIFTY,
  TWENTY,
  TEN,
  FIVE,
  ONE,
  FIVE_JIAO,
  ONE_JIAO
};
