function make_tablet() {
    MetaMask_check();

    var tablet_factory_instance = get_tablet_factory_instance(document.getElementById("tablet_factory").value);
    var desired_tablet_name = document.getElementById("desired_tablet_name").value
    var tip = 0;
    if (document.getElementById("tip").checked) {
        tip = document.getElementById("tip_value").value * 10^18;
    }
    tablet_factory_instance.create_tablet(desired_tablet_name, {from:web3.eth.accounts[0], to:tablet_factory, value:tip},
        function(error, tx_create_tablet){
            if(!error) {
                document.getElementById("new_tablet_address").innerHTML = "pending table creation";
                document.getElementById("new_tablet_address").className = "pending";
                console.log("Create tablet tx sent, hash: " + tx_create_tablet)
                var tablet_listener = setInterval(
                    function() {
                        tablet_is_created(tx_create_tablet, tablet_listener);                                                        
                    }
                , 10000);                                                
            }
            else {
                console.error(error);
            }
        }
    );
}
