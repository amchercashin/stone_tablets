function make_table() {
    var tablet_factory_instance = get_tablet_factory_instance();
    console.log(tablet_factory_instance);
    var new_tablet_calculated_address;
    var desired_tablet_name = document.getElementById("desired_tablet_name").value
    tablet_factory_instance.create_tablet.call(desired_tablet_name,
        function(error, result){
            if(!error) {                    
                new_tablet_calculated_address = result;
                console.log("new_tablet_calculated_address: " + new_tablet_calculated_address);
                //console.log(tablet_factory_instance);
                tablet_factory_instance.creator_tablets_count.call(web3.eth.accounts[0],
                    function(error, result){
                        if(!error) {
                            var creator_tablets_count = result;
                            console.log("creator_tablets_count: " + creator_tablets_count);
                            tablet_factory_instance.create_tablet(desired_tablet_name, {from:web3.eth.accounts[0], to:tablet_factory, value:"", gas:850000, gasPrice:"4000000000"},
                                function(error, result){
                                    if(!error) {
                                        document.getElementById("new_tablet_address").innerHTML = "pending table creation";
                                        document.getElementById("new_tablet_address").className = "pending";
                                        console.log("Create tablet tx sent, hash: " + result)
                                        var is_created = false;
                                        var tablet_listener = setInterval(
                                            function() {
                                                tablet_is_created(tablet_factory_instance, web3.eth.accounts[0], 
                                                                                new_tablet_calculated_address, 
                                                                                creator_tablets_count, is_created, tablet_listener);                                                        
                                            }
                                        , 10000);                                                
                                    }
                                    else {
                                        console.error(error);
                                    }
                                }
                            );
                        }
                        else {
                            console.error(error);
                        }
                    }    
                );
            }
            else {
                console.error(error);
            }
        }
    );


}