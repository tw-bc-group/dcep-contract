const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();
const rmbFactory = artifacts.require("RMB");
let that = {};

const web3 = require("web3");
const {TWENTY, TEN, CIRCULATION, ONE_HUNDRED} = require("./Constant");


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
            it('should mint rmb successful by minter', async function () {
                await that.rmb.mint(accounts.customerAddressBob, TEN);
                const amount = await that.rmb.balanceOf(accounts.customerAddressBob, TEN);
                amount.toNumber().should.be.equal(CIRCULATION);
            });

            // it('should batch mint rmb successful by minter', async function () {
            //     await that.rmb.mintBatch(accounts.customerAddressAlice, [TWENTY, ONE_HUNDRED]);
            //     const amount = await that.rmb.balanceOf(accounts.customerAddressAlice, TEN);
            //     amount.toNumber().should.be.equal(0);
            //     const amounts = await that.rmb.balanceOfBatch([accounts.customerAddressAlice, accounts.customerAddressAlice], [TWENTY, ONE_HUNDRED]);
            //     amounts[0].toNumber().should.be.equal(CIRCULATION);
            //     amounts[1].toNumber().should.be.equal(CIRCULATION);
            // });
        });

        describe('#transfer()', () => {
            it('should transfer rmb success', async function () {
                await that.rmb.mint(accounts.cbAddress, TEN);
                await that.rmb.safeTransferFrom(accounts.cbAddress, accounts.customerAddressAlice, TEN);
                const amount = await that.rmb.balanceOf(accounts.cbAddress, TEN);
                amount.toNumber().should.be.equal(CIRCULATION - 1);
                const amountTo = await that.rmb.balanceOf(accounts.customerAddressAlice, TEN);
                amountTo.toNumber().should.be.equal(1);
            })
        })

    });
});

