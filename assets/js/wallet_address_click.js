function wallet_address_click(address) {
    document.getElementById("tablet_link").click();
    document.getElementById("tablet").value = address.innerHTML;
    document.getElementById("settings_tablet").value = address.innerHTML;
}