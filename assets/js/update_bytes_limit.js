function update_bytes_limit() {
    var bytes_limit = Number(2048 - (new Blob([document.getElementById("record_to_add").value])).size);
    if (bytes_limit < 0) {
        bytes_limit = `<font color="red">` + bytes_limit + `</font>`;
    }
    return document.getElementById("bytes_limit").innerHTML = bytes_limit;
}