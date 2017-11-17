function tablet_is_created(tx_create_tablet, tablet_listener) {
    web3.eth.getTransactionReceipt(tx_create_tablet, function(error, receipt) {
        if(!error) {
            console.log("receipt: " + receipt);
            if (receipt) {
                if (receipt.status == 1) {
                    document.getElementById("new_tablet_address").innerHTML = receipt.logs[0].address;
                    document.getElementById("new_tablet_address").className = "wallet_link";
                } else {
                    document.getElementById("new_tablet_address").innerHTML = 
                    "transaction: <a href='https://etherscan.io/tx/" + receipt.transactionHash + "'>" +
                    receipt.transactionHash + "</a> failed!";
                    document.getElementById("new_tablet_address").className = "tx_error";
                }
                clearInterval(tablet_listener);
            }
        } else {
            console.error(error);
        }
    })
}