
function MetaMask_load() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        //console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        //window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        document.getElementById("MetaMask_warning").innerHTML = 
        `
        <p><strong>Warning</strong> Install MetaMask Chrome addon and connect to your account.</p>
        `
    }      
}

function MetaMask_check() {
    if (typeof web3.eth.accounts[0] == 'undefined') {
        document.getElementById("MetaMask_warning").innerHTML = 
        `
        <p><strong>&nbsp;Warning</strong> Install MetaMask Chrome addon and connect to your account.</p>
        `
    }
}