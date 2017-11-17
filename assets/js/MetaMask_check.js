function MetaMask_check() {
    if (typeof web3 == 'undefined' || typeof web3.eth.accounts[0] == 'undefined') {
        document.getElementById("MetaMask_warning").innerHTML = 
        `
        <p><strong>&nbsp;Warning</strong> Install MetaMask Chrome addon and connect to your account.</p>
        `
    } else {
        window.web3 = new Web3(web3.currentProvider);
        global_active_account = web3.eth.accounts[0];
    }
}