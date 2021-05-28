import { tokens } from "./helpers"

const Token = artifacts.require('./Token')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Token', ([deployer, reciever]) => {
    const name = "Romulon Token"
    const symbol = "ROM"
    const decimals = "18"
    const totalSupply = tokens(1000000).toString
    let token 


    beforeEach(async () => {
        token = await Token.new()
    })

    describe('deployment', () => {
        it('tracks the name', async () => {
            const result = await token.name()
            result.should.equal(name)
            //Read token name here...
            //Token name is Romulon
            //fetch token from blockchain
            //Read token name
            //Check token name is Romulon
        })

        it('tracks the symbol', async () => {
            const result = await token.symbol()
            result.should.equal(symbol)
        })

        it('tracks the decimals', async () => {
            const result = await token.decimals()
            result.toString().should.equal(decimals)
       })

        it('tracks the total supply', async () => {
            const result = await token.totalSupply()
            result.toString().should.equal(totalSupply.toString())
        })

        it('tracks the total supply to the deployer', async () => {
            const result = await token.balanceOf(deployer)
            result.toString().should.equal(totalSupply.toString())
        })
    })

    describe('sending tokens', () => {

        let result
        let amount

        describe('success', () => {
            beforeEach(async () => {
                amount = tokens(100)
                result = await token.transfer(receiver, amount, { from: deployer })
            })

        it('transfers token balnces', async () => {
            let balanceOf
            //Before transfer
            balanceOf = await token.balanceOf(deployer)
            balanceOf.toString().should.equal(tokens(999900).toString())
            balanceOf = await token.balanceOf(reciever)
           balanceOf.toString().should.equal(tokens(100).toString())
        }) 

        it('emits a Transfer event', () => {
            const log = result.logs[0]
            log.event.should.eq('Transfer')
            const event = log.args
            event.from.toString().should.equal(deployer, 'from is correct')
            event.to.should.equal(receiver, 'to is correct')
            event.value.toString().should.equal(amount.toString(), 'value is correct')
        })
   
        //After transfer
            
        })
    })
})