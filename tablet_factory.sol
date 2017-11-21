pragma solidity ^0.4.16;

import "./tablet.sol";

contract tablet_factory {
    
    address private tablet_factory_owner;
    
    address[] public creators;
    
    struct tablet_struct {
        bytes32 tablet_name;
        address tablet_address;
    }
    
    mapping(address => tablet_struct[]) public tablets;
    
    
    function tablet_factory() public {
        tablet_factory_owner = msg.sender;
    }

    function create_tablet(bytes32 new_tablet_name) public payable returns (address) {
        if (!is_creator(msg.sender)) {creators.push(msg.sender);}
        address new_tablet_address = new tablet(new_tablet_name, msg.sender);
        tablets[msg.sender].push(tablet_struct(new_tablet_name, new_tablet_address));
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
