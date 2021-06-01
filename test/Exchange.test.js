import web3 from "web3"
import { tokens, EVM_REVERT, ETHER_ADDRESS, ether } from "./helpers"

const Token  = artifacts.require('./Token')
const Exchange = artifacts.require('./Exchange')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Exchange', ([deployer, feeAccount, user1]) => {
    let token
    let exchange
    const feePercent = 10

    beforeEach(async () => {
        //deploy token
        token = await Token.new()
        
        
        //transfer token to user 1
       token.transfer(user1, tokens(100), { from: deployer })

        //deploy exchange
         exchange = await Exchange.new(feeAccount, feePercent)
    })

    describe('deployment', () => {
        it('tracks the fee account', async () => {
            const result = await exchange.feeAccount()
            result.should.equal(feeAccount)
        })
        it('tracks the fee percent', async () => {
            const result = await exchange.feePercent()
            result.toString().should.equal(feePercent.toString())
        })
    })
    
    describe('fallback', () => {
        it('reverts when Ether is sent', async () => {
            await exchange.sendTransaction({ value: 1, from: user1}).should.be.rejectedWith(EVM_REVERT)
        })
    })

    describe('depositing Ether', async () => {
        let result
        let amount
        beforeEach( async () => {
            amount = ether(1)
            result = await exchange.depositEther({ from: user1, value: amount})
        })

        it('tracks the Ether deposit', async () => {
            const balance = await exchange.tokens(ETHER_ADDRESS, user1)
            balance.toString().should.equal(amount.toString())
        })
        //make helper for duplication its in many tests
        it('emits a Deposit event', () => {
            const log = result.logs[0]
            log.event.should.eq('Deposit')
            const event = log.args
            event.token.toString().should.equal(ETHER_ADDRESS, 'token address is correct')
            event.user.should.equal(user1, 'user address is correct')
            event.amount.toString().should.equal(amount.toString(), 'amount is correct')
            event.balance.toString().should.equal(amount.toString(), 'balance is correct')
        })
    })

    describe('withdrawing Ether', async () => {
        let result
        let amount

        beforeEach(async () => {
            amount = ether(1)
            await exchange.depositEther({ from: user1, value: amount })
        })

        describe('success', () => {
            beforeEach(async () => {
                //Withdraw
                result = await exchange.withdrawEther(ether(1), { from: user1 })
            })
        
            it('withdraws Ether funds', async () => {
                const balance = await exchange.tokens(ETHER_ADDRESS, user1)
                balance.toString().should.equal('0')
            })

            it('emits a "Withdraw" event', async () => {
                const log = result.logs[0]
                log.event.should.eq('Withdraw')
                const event = log.args
                event.token.should.equal(ETHER_ADDRESS)
                event.user.should.equal(user1)
                event.amount.toString().should.equal(ether(1).toString())
                event.balance.toString().should.equal('0')

            })
        })

        describe('failure', async () => {
            it('rejects withdraws for isufficient balances', async () => {
                await exchange.withdrawEther(ether(100), { from : user1 }).should.be.rejectedWith(EVM_REVERT)
            })
        })
        



    })

    describe('depositing tokens', () => { 
        let result
        let amount

    
        
        describe('success', () => {
            beforeEach(async () => {
                amount = tokens(10)
                await token.approve(exchange.address, amount, { from: user1 })
                result = await exchange.depositToken(token.address, amount, { from: user1 })
            })
            
            it('tracks the token deposit', async () => {
                let balance
                balance = await token.balanceOf(exchange.address)
                balance.toString().should.equal(amount.toString())
                // check tokens on exchange
                balance = await exchange.tokens(token.address, user1)
                balance.toString().should.equal(amount.toString())
            })

            it('emits a Deposit event', () => {
                const log = result.logs[0]
                log.event.should.eq('Deposit')
                const event = log.args
                event.token.toString().should.equal(token.address, 'token address is correct')
                event.user.should.equal(user1, 'user address is correct')
                event.amount.toString().should.equal(amount.toString(), 'amount is correct')
                event.balance.toString().should.equal(amount.toString(), 'balance is correct')
            })
        })

        describe('failure', () => {


            it('fails when no tokens are approved', async () => {

                it('rejects Ether deposits', async () => {
                    await exchange.depositToken(ETHER_ADDRESS, tokens(10), { from: user1 }).should.be.rejectedWith(EVM_REVERT)
                })

                //Dont approve tokens before depositing
                await exchange.depositToken(token.address, tokens(10), {from: user1 }).should.be.rejectedWith(EVM_REVERT)

            })
        })
    })

    describe('withdrawing Tokens', async () => {
        let result
        let amount

       

        describe('success', () => {
            beforeEach(async () => {
                //Deposit tokens
                amount = tokens(10)
                await token.approve(exchange.address, amount, { from: user1 })
                await exchange.depositToken(token.addres, amount, { from: user1 })

                //Withdraw tokens
                result = await exchange.withdrawToken(token.address, amount, { from: user1 })
            })

            it('withdraws token funds', async () => {
                const balance = await exchange.tokens(token.address, user1)
                balance.toString().should.equal('0')
            })

            it('emits a "Withdraw" event', async () => {
                const log = result.logs[0]
                log.event.should.eq('Withdraw')
                const event = log.args
                event.token.should.equal(token.adress)
                event.user.should.equal(user1)
                event.amount.toString().should.equal(amount.toString())
                event.balance.toString().should.equal('0')

            })
        })

        describe('failure', async () => {
            it('rejects withdraws for isufficient balances', async () => {
                await exchange.withdrawToken(tokens(10), { from: user1 }).souhld.be.rejectedWith(EVM_REVERT)
            })
        })




    })
})