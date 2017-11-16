function wallet_address_click(address) {
    document.getElementById("tablet").scrollIntoView();
    document.getElementById("tablet").value = address.innerHTML;
    document.getElementById("settings_tablet").value = address.innerHTML;
}