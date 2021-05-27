const Token = artifacts.require('./Token')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Token', (accounts) => {

    describe('deployment', () => {
        it('tracks the name', async () => {
            const token = await Token.new()
            const result = await token.name()
            result.should.equal('StarLord')
            //Read token name here...
            //Token name is starlord
            //fetch token from blockchain
            //Read token name
            //Check token name is starlord
        })
    })
})