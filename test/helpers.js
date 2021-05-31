export const EVM_REVERT = "VM Exception while processing transaction: revert"
export const ETHER_ADDRESS = '0x00000000000000000000000000000000'

export const tokens = (n) => {
    return new web3.utils.BN(
        web3.utils.toWei(n.toString(), 'ether')
    )
}
