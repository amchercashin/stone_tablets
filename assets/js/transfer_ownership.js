function transfer_ownership() {
    MetaMask_check();
    var tablet_address = document.getElementById("settings_tablet").value;
    var tablet_instance = get_tablet_instance(tablet_address);
    tablet_instance.change_owner(document.getElementById("transfer_ownership_address").value, {from:global_active_account, value:""},
        function transfer_ownership_call(error, tx_transfer_ownership) {
            if (!error) {
                document.getElementById("transfer_ownership_result").innerHTML = "transferring";
                document.getElementById("transfer_ownership_result").className = "pending";
                console.log("transfer_ownership tx: " + tx_transfer_ownership);
                var record_listener = setInterval(
                    function() {
                        web3.eth.getTransactionReceipt(tx_transfer_ownership, function(error, receipt) {
                            if(!error) {
                                console.log("receipt: " + receipt);
                                if (receipt) {
                                    if (receipt.status == 1) {
                                        document.getElementById("transfer_ownership_result").innerHTML = "ownership has been transferred!";
                                        document.getElementById("transfer_ownership_result").className = "";
                                    } else {
                                        document.getElementById("transfer_ownership_result").innerHTML = 
                                        "transaction: <a href='https://" + global_active_network + ".etherscan.io/tx/" + 
                                        receipt.transactionHash + "' target='_blank'>" +
                                        receipt.transactionHash + "</a> failed!";
                                        document.getElementById("transfer_ownership_result").className = "tx_error";
                                    }
                                    clearInterval(record_listener);
                                }
                            } else {
                                console.error(error);
                            }
                        })                                                        
                    }
                , 10000);    
            } else {
                console.log(error);
            }
        }
    );
}