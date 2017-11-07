pragma solidity ^0.4.16;

import "./tablet.sol";

contract tablet_factory {
    
    address private tablet_factory_owner;
    
    address[] public creators;
    mapping(address => address[]) public tablets;
    
    event new_tablet_created(address indexed tablet_creator, address tablet_address, uint creators_count);
    
    function tablet_factory() public {
        tablet_factory_owner = msg.sender;
    }

    function is_creator(address creator_address) public constant returns(bool) {
        return tablets[creator_address].length > 0;
    }
    
    function creators_count() public constant returns(uint) {
        return creators.length;
    }

    function create_tablet() public payable returns (address) {
        if (!is_creator(msg.sender)) creators.push(msg.sender);
        address new_tablet_address = new tablet(msg.sender);
        tablets[msg.sender].push(new_tablet_address);
        new_tablet_created(msg.sender, new_tablet_address, creators_count());
        return new_tablet_address;
    }
    
    function withdraw(uint amount) external {
        require(msg.sender == tablet_factory_owner);
        msg.sender.transfer(amount);
    }
    
}
