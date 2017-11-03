pragma solidity ^0.4.16;
contract tablet {

    string[] public records;
    address public tablet_owner;
    mapping(address => bool) public scribes;
    
    event new_record(address indexed tablet_address, address indexed scribe, uint block_number, uint indexed block_time, uint record_nubmer);
    
    function tablet(address tablet_creator) public {
        tablet_owner = tablet_creator;
        scribes[tablet_owner] = true;
    }

    function add_scribe(address scribe) public {
        require(tablet_owner == msg.sender);
        scribes[scribe] = true;
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
        require(bytes(record).length <= 2048);
        new_record(this, msg.sender, block.number, block.timestamp, records.push(record));
    }
    
    function tablet_length () public constant returns (uint256) {
        return records.length;
    }
    /*
    function get_record(uint256 from_position) public constant returns (string) {
        require(records.length > 0);
        require(from_position <= records.length);
        return records[from_position-1];
    }
    */
    /*
    function get_3 (uint256 i) public constant returns (string, string, string) {
        require(records.length > 0);
        require(i <= records.length);
        return (records[i-1], records[i-2], records[i-3]);

    }
    */
    /*
    function get_all() private constant returns (string[]) {
        return records;
    }
    */
    
    /*
    function get_all2() public constant returns (byte[2048][]) {
        return records;
    }
    */
    
    /*
    function get_256_or_less (uint256 from_position) public constant returns (string[256]) {
        uint256 len = records.length;
        require(len > 0);
        require(from_position <= records.length);
        string[256] memory records_256;
        for (uint256 i = len; i > 0; i--) {
            uint8 j;
            records_256[j] = records[i-1];
            j = j + 1;
        }
        return records_256;
    }
    */
    
    // delete later because of event with this info

    
    //function record_bytes_length (uint256 i) public constant returns (uint256) {
    //return bytes(records[i-1]).length;
    //}
}
