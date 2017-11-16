function get_owner() {
    MetaMask_check();
    var tablet_address = document.getElementById("settings_tablet").value;
    var tablet_instance = get_tablet_instance(tablet_address);
    tablet_instance.tablet_owner.call(function owner_getter(error, owner) {
            if (!error) {
                document.getElementById("tablet_owner").innerHTML = owner;
            } else {
                console.log(error);
            }
        }
    );
}