const Token = artifacts.require('./Token')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Token', ([deployer, reciever]) => {
    const name = "Romulon Token"
    const symbol = "ROM"
    const decimals = "18"
    const totalSupply = "1000000000000000000000000"
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
            result.toString().should.equal(totalSupply)
        })

        it('tracks the total supply to the deployer', async () => {
            const result = await token.balanceOf(deployer)
            result.toString().should.equal(totalSupply)
        })
    })

    describe('sending tokens', () => {
        it('transfers token balnces', async () => {
            let balanceOf
            //Before transfer
            balanceOf = await token.balanceOf(deployer)
            console.log("deployer balance before transfer", balanceOf.toString())
            balanceOf = await token.balanceOf(reciever)
            console.log("reciever balance before transfer", balanceOf.toString())
            
            //Transfer
            await token.transfer(reciever, '100000000000000000000', { from: deployer })

            //After transfer
            
        })
    })
})