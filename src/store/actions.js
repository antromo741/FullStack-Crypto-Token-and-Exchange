
export function web3Loaded(connection) {
    return { 
        type: 'WEB3_LOADED',
        connection
    }
}

export function web3AccountLoaded(account) {
    return {
        type: 'WEB3_Account_LOADED',
        account
    }
}

export function tokenLoaded(contract) {
    return {
        type: 'TOKEN_LOADED',
        contract
    }
}