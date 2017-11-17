function MetaMask_check() {
    if (typeof web3.eth.accounts[0] == 'undefined') {
        document.getElementById("MetaMask_warning").innerHTML = 
        `
        <p><strong>&nbsp;Warning</strong> Install MetaMask Chrome/Firefox addon and connect to your account.</p>
        `
    } else {
        window.web3 = new Web3(web3.currentProvider);
        global_active_account = web3.eth.accounts[0];
        web3.version.getNetwork((err, netId) => {
            switch (netId) {
                case "1":
                console.log('This is mainnet');
                global_active_network = "";
                break
                case "2":
                console.log('This is the deprecated Morden test network.')
                global_active_network = "deprecated Morden test network";
                break
                case "3":
                console.log('This is the ropsten test network.')
                global_active_network = "ropsten";
                break
                case "42":
                console.log('This is the ropsten test network.')
                global_active_network = "kovan";
                break
                case "4":
                console.log('This is the ropsten test network.')
                global_active_network = "rinkeby";
                break
                default:
                console.log('This is an unknown network.')
            }
        })
    }
}