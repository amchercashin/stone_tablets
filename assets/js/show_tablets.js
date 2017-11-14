function show_tablets() {
    var creator_address = web3.eth.accounts[0];
    var tablet_factory_instance = get_tablet_factory_instance();
     console.log(tablet_factory_instance);
    tablet_factory_instance.creator_tablets_count.call(creator_address,
        function(error, tablets_count){
            if (!error) {
                var my_tablets_table_html = 
                `
                <table id="tablets_table">
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>                        
                `
                console.log("tablets_count "+tablets_count)
                var t;
                var retrieved_tables_count;
                for (t = 0; t < tablets_count; t++) {
                    (function (t) {
                        console.log(t);
                        tablet_factory_instance.tablets.call(creator_address, t, function(error, tablet) {
                            if (!error) {
                                console.log(tablet);
                                var new_tablet_html = `
                                <tr>
                                    <td>` + eval(t + 1) + `</td>
                                    <td>` + web3.toAscii(tablet[0]) + `</td>
                                    <td class="wallet_link">` + tablet[1] + `</td>
                                </tr>
                                `
                                my_tablets_table_html = my_tablets_table_html + new_tablet_html;
                                document.getElementById("my_tablets").innerHTML = my_tablets_table_html + " </table>";
                                retrieved_tables_count = retrieved_tables_count + 1;
                                if (retrieved_tables_count == tablets_count) {
                                    console.log("calling sort");
                                    sort_table(document.getElementById("tablets_table"));
                                }
                            }
                            else {
                                console.log(error);
                            }
                        });
                    })(t);                           
                }                        
            } else {
                console.error(error);
            }
        }
    );
}