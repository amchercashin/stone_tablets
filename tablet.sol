pragma solidity ^0.4.16;
contract tablet {
    
    bytes32 public this_tablet_name;
    address public tablet_owner;
    
    string[] public records;
    
    mapping(address => bool) public scribes;
    address[] public scribes_hisory;
    
    event new_tablet_created(address indexed tablet_creator, bytes32 tablet_name, address tablet_address);
    event new_record(address indexed tablet_address, address indexed scribe, uint record_nubmer);
    
    function tablet(bytes32 tablet_name, address tablet_creator) public {
        if (tablet_creator == 0) {tablet_creator = msg.sender;}
        tablet_owner = tablet_creator;
        this_tablet_name = tablet_name;
        scribes[tablet_owner] = true;
        scribes_hisory.push(tablet_owner);
        new_tablet_created(tablet_creator, tablet_name, this);
    }

    function add_scribe(address scribe) public {
        require(tablet_owner == msg.sender);
        scribes[scribe] = true;
        scribes_hisory.push(scribe);
    }
    
    function remove_scribe(address scribe) public {
        require(tablet_owner == msg.sender);
        scribes[scribe] = false;
    }
    
    function change_owner(address new_owner) public {
        require(tablet_owner == msg.sender);
        tablet_owner = new_owner;
    }
        
    function add_record(string record) public {
        require(scribes[msg.sender]);
        // require(bytes(record).length <= 2048); Lets decide this on the client side, limit could be higher later
        new_record(this, msg.sender, records.push(record));
    }
    
    function tablet_length() public constant returns (uint256) {
        return records.length;
    }
    
    function scribes_hisory_length() public constant returns (uint256) {
        return scribes_hisory.length;
    }
}
