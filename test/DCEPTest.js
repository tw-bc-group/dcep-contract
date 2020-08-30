const {TWENTY, TEN, CIRCULATION, ONE_HUNDRED} = require("./Constant");
const rmbFactory = artifacts.require("RMB");
const {
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();
let that = {};
const web3 = require("web3");


contract("rmb", async addresses => {
    let accounts = {
        cbAddress: addresses[1], // center bank
        mbAddress: addresses[2], // merchant bank
        customerAddressAlice: addresses[3],
        customerAddressBob: addresses[4],
    };

    describe('#initialize()', () => {
        beforeEach(async () => {
            that.rmb = await rmbFactory.new({from: accounts.cbAddress});
            assert.equal(web3.utils.isAddress(that.rmb.address), true);
        });

        describe('#mint()', () => {
            it('should mint rmb successful by minter', async function () {
                await that.rmb.mint(accounts.customerAddressBob, TEN, {from: accounts.cbAddress});
                const amount = await that.rmb.balanceOf(accounts.customerAddressBob, TEN);
                amount.toNumber().should.be.equal(CIRCULATION);
            });

            it('should not mint rmb successful without permission', async function () {
                await expectRevert(
                    that.rmb.mint(accounts.customerAddressBob, TEN, {from: accounts.customerAddressBob}), "RMB: must have minter role to mint"
                );
            });

            it('should not mint rmb successful with same id', async function () {
                await that.rmb.mint(accounts.customerAddressBob, TEN, {from: accounts.cbAddress});

                await expectRevert(
                    that.rmb.mint(accounts.customerAddressBob, TEN, {from: accounts.cbAddress}), "RMB: id is duplicated"
                );
            });

            it('should batch mint rmb successful by minter', async function () {
                await that.rmb.mintBatch(accounts.customerAddressAlice, [TWENTY, ONE_HUNDRED], {from: accounts.cbAddress});
                const amount = await that.rmb.balanceOf(accounts.customerAddressAlice, TEN);
                amount.toNumber().should.be.equal(0);
                const amounts = await that.rmb.balanceOfBatch([accounts.customerAddressAlice, accounts.customerAddressAlice], [TWENTY, ONE_HUNDRED]);
                amounts[0].toNumber().should.be.equal(CIRCULATION);
                amounts[1].toNumber().should.be.equal(CIRCULATION);
            });

            it('should not batch mint rmb successful without permission', async function () {
                await expectRevert(
                    that.rmb.mintBatch(accounts.customerAddressAlice, [TWENTY, ONE_HUNDRED], {from: accounts.customerAddressBob}),
                    "RMB: must have minter role to mint"
                );
            });

            it('should not mint rmb successful with same id', async function () {
                await that.rmb.mint(accounts.customerAddressBob, TEN, {from: accounts.cbAddress});

                await expectRevert(
                    that.rmb.mintBatch(accounts.customerAddressAlice, [TEN, ONE_HUNDRED], {from: accounts.cbAddress}), "RMB: id is duplicated"
                );
            });
        });

        describe('#transfer()', () => {
            it('should transfer rmb success', async function () {
                await that.rmb.mint(accounts.cbAddress, TEN, {from: accounts.cbAddress});
                await that.rmb.safeTransferFrom(accounts.cbAddress, accounts.customerAddressAlice, TEN, {from: accounts.cbAddress});
                const amount = await that.rmb.balanceOf(accounts.cbAddress, TEN);
                amount.toNumber().should.be.equal(CIRCULATION - 1);
                const amountTo = await that.rmb.balanceOf(accounts.customerAddressAlice, TEN);
                amountTo.toNumber().should.be.equal(1);
            });

            it('should not transfer rmb success without', async function () {
                await expectRevert(
                    that.rmb.safeTransferFrom(accounts.cbAddress, accounts.customerAddressAlice, TEN, {from: accounts.cbAddress}),
                    "ERC1155: insufficient balance for transfer"
                );
            });

            it('should batch transfer rmb success', async function () {
                await that.rmb.mintBatch(accounts.cbAddress, [TWENTY, ONE_HUNDRED], {from: accounts.cbAddress});
                await that.rmb.safeBatchTransferFrom(accounts.cbAddress, accounts.customerAddressAlice, [TWENTY, ONE_HUNDRED], {from: accounts.cbAddress});
                const amounts = await that.rmb.balanceOfBatch([accounts.customerAddressAlice, accounts.customerAddressAlice], [TWENTY, ONE_HUNDRED]);
                amounts[0].toNumber().should.be.equal(CIRCULATION);
                amounts[1].toNumber().should.be.equal(CIRCULATION);
            })

            it('should not batch transfer rmb success without', async function () {
                await expectRevert(
                    that.rmb.safeBatchTransferFrom(accounts.cbAddress, accounts.customerAddressAlice, [TWENTY, ONE_HUNDRED], {from: accounts.cbAddress}),
                    "ERC1155: insufficient balance for transfer"
                );
            });
        })

    });
});

