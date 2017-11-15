


function MetaMask_check() {
    if (typeof web3.eth.accounts[0] == 'undefined') {
        document.getElementById("MetaMask_warning").innerHTML = 
        `
        <p><strong>&nbsp;Warning</strong> Install MetaMask Chrome addon and connect to your account.</p>
        `
    }
}