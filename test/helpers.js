const tokens = (n) => {
    return new Web3.utils.isBN(
        Web3.utils.toWei(n.toString(), 'ether')
    )
}
export default tokens