const Token = artifacts.require("Token")
const Exchange = artifacts.require("Exchange")

module.exports = async function(callback) {
    try {
        //fetch accounts from wallet
        const accounts = await web3.eth.getAccounts()
        
        //fetch the deployed token
        const token = await Token.deployed()
        console.log('Token fetched', token.address)

        //fetch the deployed exchange
        const exchange = await Exchange.deployed()
        console.log('Exchange fetched' , exchange.address)

        //give tokens to account[1]
        const sender = accounts [0]
        const receiver = accounts[1]
        let amount = web3.utils.toWei('10000', 'ether')//10,000 tokens

        await token.transfer(reciever, amount, { from: sender })
        console.log(`Transfered ${amount} tokens from ${sender} tp ${reciever}`)

        //set up exchange users
        const user1 = accounts[0]
        const user2 = accounts[1]

        //user 1 deposits ether
        amount = 1
        await exchange.depositEther({from: user1, value: ether(amount)} )
        console.log(`Deposited ${amount} Ether from ${user1}`)

        //User2 Approves TOkens
        amount = 10000
        await token.approve(exchange.address, tokens(amount), {from: user2 })
        console.log(`Approved ${amount} tokens from ${user2}`)

        //user 2 deposits tokens 
        await exchange.depositToken(token.address, tokens(amount), {from: user2})
        console.log(`Deposited ${amount} tokens from ${user2}`)

      /////////////////
      //For canceled orders
      //user 1 makes order for tokens

      let result
      let orderId
      result = await exchange.makeOrder(token.address, tokens(100), ETHER_ADDRESS, ether(0.1), {from: user1 })  
      console.log(`make order from ${user1} `)

      //user1 cancels the order
      orderId = result.logs[0].args.id
      await exchange.cancelOrder(orderId, {from: user1})
      console.log(`Cancelled order from ${user1}`)

      ////////////////
      //Filled Order

      //User 1 makes an order

      result = await exchange.makeOrder(token.address, tokens(100), ETHER_ADDRESS, ether(0.1), {from: user1})
      console.log(`Make order from ${user1}`)

      //user 2 fills order
      orderId = result.logs[0].args.id
      await exchange.fillOrder(orderId, {from: user2})
      console.log(`Filled order from ${user1}`)

      //wait a second

      await wait(1)

      //User 1 makes another order
      result = await exchange.makeOrder(token.address, tokens(50), ETHER_ADDRESS, ether(0.01), {from: user1 })
      consolw,log(`Make order from ${user1}`)

      //user 2 fills another order
      oderId = result.logs[0].args.id
      await exchange.fillOrder(orderId, {from: user2})
      console.log(`Filled order from ${user1}`)

      //wait a second
      await wait(1)
      
      //User 1 
      result = await exchange.makeOrder(token.address, tokens(200), ETHER_ADDRESS, ether(0.15), {from: user1 })
      cinsole.log(`Made order from ${user1}`)

      //user 2 fills final order
      orderId = result.logs[0].args.id
      await exchange.fillOrder(orderId, {from: user2})
      console.log(`Filled order from ${user1}`)

      await wait(1)

      ////////////////
      //Open Orders
      //user 1 makes 10 orders
        for (let i =1; i <= 10; i++) {
            result = await exchange.makeOrder(token.address, tokens(10 * i), ETHER_ADDRESS, ether(0.01), {from: user1})
            console.log(`Made order from ${user1}`)
            //wait a second
            await wait(1)
        }
    //User2 makes 10 Orders
        for (let i = 1; i <= 10; i++) {
            result = await exchange.makeOrder(ETHER_ADDRESS, tokens(0.01), token.address, tokens(10 * i), { from: user2 })
            console.log(`Made order from ${user2}`)
            //wait a second
            await wait(1)
        }
       


    } catch(error) {
        console.log(error)
    }
    callback()
}