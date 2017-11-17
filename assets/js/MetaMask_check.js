function MetaMask_check() {
    web3.eth.getAccounts(function (error, acc) {
        if (typeof acc == 'undefined') {
            document.getElementById("MetaMask_warning").innerHTML = 
            `
            <p><strong>&nbsp;Warning</strong> Install MetaMask Chrome addon and connect to your account.</p>
            `
        }

        if (typeof acc == global_active_account) {
            global_active_account = acc;
        }
    });
}