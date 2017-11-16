function get_scribes() {
    MetaMask_check();
    document.getElementById("scribes").innerHTML = "";
    var tablet_address = document.getElementById("settings_tablet").value;
    var tablet_instance = get_tablet_instance(tablet_address);

    tablet_instance.scribes_hisory_length.call(function call_scribes_hisory_count(error, scribes_count) {
        if (!error) {
            var scribes_table_html = 
                `
                <table id="scribes_table">
                    <tr>
                        <th class="row-1 row-ID">№</th>
                        <th class="row-2 row-text">Scribe</th>
                    </tr>                        
                `
            console.log("Scribe_history_count " + scribes_count)

            var r;
            var retrieved_scribes_count = 0;
            for (r = 0; r < scribes_count; r++) {
                (function (r) {
                    console.log(r);
                    tablet_instance.scribes_hisory.call(r, function call_scribes(error, scribe) {
                        if (!error) {
                            tablet_instance.scribes.call(scribe, function check_scribe(error, is_scribe) {
                                console.log(scribe);
                                if (is_scribe) {
                                    var new_scribe_html = `
                                    <tr>
                                        <td>` + eval(r + 1) + `</td>
                                        <td>` + scribe + `</td>
                                    </tr>
                                    `
                                    scribes_table_html = scribes_table_html + new_scribe_html;
                                    document.getElementById("scribes").innerHTML = scribes_table_html + " </table>";
                                    retrieved_scribes_count = retrieved_scribes_count + 1;
                                    if (retrieved_scribes_count == scribes_count) {
                                        console.log("calling sort");
                                        sort_table(document.getElementById("scribes_table"));
                                    }

                                } else {
                                    scribes_count = scribes_count - 1;
                                    if (retrieved_scribes_count == scribes_count) {
                                        console.log("calling sort");
                                        sort_table(document.getElementById("scribes_table"));
                                    }
                                }

                            })
                        }
                        else {
                            console.log(error);
                        }
                    });
                })(r);
            }
        } else {
            console.log(error);
        }
    }
    );
}