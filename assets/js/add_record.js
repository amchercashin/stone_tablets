function add_record() {
    if (Number(2048 - (new Blob([document.getElementById("record_to_add").value])).size) >= 0) {
        var tablet_address = document.getElementById("tablet").value;
        var tablet_instance = get_tablet_instance(tablet_address);
        tablet_instance.add_record(document.getElementById("record_to_add").value, {from:web3.eth.accounts[0], to:tablet_factory, value:""},
            function add_record(error, record_tx) {
                if (!error) {
                    console.log(record_tx);
                } else {
                    console.log(error);
                }
            }
        );
    } else {
        return false;
    }
}