function show_records() {
    var tablet_address = document.getElementById("tablet").value;
    var tablet_instance = get_tablet_instance(tablet_address);
    console.log(tablet_instance);
    tablet_instance.tablet_length.call(function call_records_count(error, records_count) {
        if (!error) {
            var records_table_html = 
                `
                <table id="records_table">
                    <tr>
                        <th class="row-1 row-ID">№</th>
                        <th class="row-2 row-text>Record</th>
                    </tr>                        
                `
                console.log("records_count " + records_count)

                var r;
                var retrieved_records_count = 0;
                for (r = 0; r < records_count; r++) {
                    (function (r) {
                        console.log(r);
                        tablet_instance.records.call(r, function call_records(error, record) {
                            if (!error) {
                                console.log(record);
                                var new_record_html = `
                                <tr>
                                    <td>` + eval(r + 1) + `</td>
                                    <td>` + record + `</td>
                                </tr>
                                `
                                records_table_html = records_table_html + new_record_html;
                                document.getElementById("my_records").innerHTML = records_table_html + " </table>";
                                retrieved_records_count = retrieved_records_count + 1;
                                if (retrieved_records_count == records_count) {
                                    console.log("calling sort");
                                    sort_table(document.getElementById("records_table"));
                                }
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