pragma solidity ^0.4.16;

import "./tablet.sol";

contract tablet_factory {
    
    address private tablet_factory_owner;
    
    address[] public creators;
    mapping(address => address[]) public tablets;
    
    
    function tablet_factory() public {
        tablet_factory_owner = msg.sender;
    }

    function create_tablet() public payable returns (address) {
        if (!is_creator(msg.sender)) creators.push(msg.sender);
        address new_tablet_address = new tablet(msg.sender);
        tablets[msg.sender].push(new_tablet_address);
        return new_tablet_address;
    }
    
    function withdraw(uint amount) external {
        require(msg.sender == tablet_factory_owner);
        msg.sender.transfer(amount);
    }
    
    
    function is_creator(address creator_address) public constant returns(bool) {
        return tablets[creator_address].length > 0;
    }
    
    function creator_tablets_count(address creator_address) public constant returns(uint) {
        return tablets[creator_address].length;
    }
    
    function creators_count() public constant returns(uint) {
        return creators.length;
    }
    
}
