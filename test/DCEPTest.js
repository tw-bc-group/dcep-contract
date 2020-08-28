const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();
const rmbFactory = artifacts.require("RMB");
let that = {};

const {TWENTY} = require("./Constant");


contract("rmb", async addresses => {
    let accounts = {
        cbAddress: addresses[0], // center bank
        mbAddress: addresses[1], // merchant bank
        customerAddressAlice: addresses[1],
        customerAddressBob: addresses[2],
    };

    describe('#initialize()', () => {
        beforeEach(async () => {
            that.rmb = await rmbFactory.new();
            assert.equal(web3.utils.isAddress(that.rmb.address), true);
        });

        describe('#mint()', () => {
            it('should mint rmb success', async function () {
                const amount = await that.rmb.balanceOf(accounts.cbAddress, TWENTY);
                amount.toNumber().should.be.equal(1);
            })
        })

        describe('#transfer()', () => {
            it('should transfer rmb success', async function () {
                await that.rmb.safeTransferFrom(accounts.cbAddress, accounts.customerAddressAlice, TWENTY ,1 ,"0x");
                const amount = await that.rmb.balanceOf(accounts.cbAddress, TWENTY);
                amount.toNumber().should.be.equal(0);
                const amountTo = await that.rmb.balanceOf(accounts.customerAddressAlice, TWENTY);
                amountTo.toNumber().should.be.equal(1);
            })
        })

    });
});

