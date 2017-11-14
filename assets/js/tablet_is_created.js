function tablet_is_created(tablet_factory_instance, creator, tablet_address, tablet_n, is_created, tablet_listener) {
    tablet_factory_instance.tablets.call(creator, tablet_n, function(error, result) {
        if(!error) {
            console.log("tablet_address: " + tablet_address + "/n" + "result: " + result[1]);
            is_created = tablet_address == result[1];
            if (is_created) {
                document.getElementById("new_tablet_address").innerHTML = tablet_address;
                document.getElementById("new_tablet_address").className = "";
                clearInterval(tablet_listener);
            }
        } else {
            console.error(error);
        }
    })
}