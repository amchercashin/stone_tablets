function wallet_address_click(address) {
    document.getElementById("tablet").scrollIntoView();
    document.getElementById("tablet").value = address.innerHTML;
}