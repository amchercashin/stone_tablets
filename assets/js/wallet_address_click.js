function wallet_address_click(address) {
    console.log(address.innerHTML);
    document.getElementById("tablet").value = address.innerHTML;
}