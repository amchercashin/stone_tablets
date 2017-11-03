pragma solidity ^0.4.16;

import "./tablet.sol";

contract tablet_factory {
    
    address private tablet_factory_owner;
    bytes32 public factory_namehash;
    
    
    address[] public creators;
    mapping(address => address[]) public tablets;
    
    abstract_registry registry;
    //abstract_resolver resolver;
    
    event new_tablet_created(address indexed tablet_creator, address tablet_address, uint indexed block_number, uint indexed block_time, uint creators_count);
    
    function tablet_factory() public {
        tablet_factory_owner = msg.sender;
    }
    
    function set_registry(abstract_registry registry_address) public {
        require(msg.sender == tablet_factory_owner);
        registry = registry_address;
    }
    
    function set_factory_name_owner(bytes32 namehash, address owner) public {
        require(msg.sender == tablet_factory_owner);
        registry.setOwner(namehash, owner);
    }
    
    function set_resolver_for_name(bytes32 namehash) public {
        require(msg.sender == tablet_factory_owner);
        address resolver = registry.resolver(namehash);
    }
    
    /*
    function change_resolver_address(address resolver_address) public {
        require(msg.sender == tablet_factory_owner);
        resolver = public_resolver(resolver_address);
    }
    */
    function is_creator(address creator_address) public constant returns(bool) {
        return tablets[creator_address].length > 0;
    }
    
    function creators_count() public constant returns(uint) {
        return creators.length;
    }

    function create_tablet(bytes32 namehash) public payable returns (address) {
        if (!is_creator(msg.sender)) creators.push(msg.sender);
        address new_tablet_address = new tablet(msg.sender);
        registry.setSubnodeOwner(factory_namehash, namehash, new_tablet_address);
        tablets[msg.sender].push(new_tablet_address);
        new_tablet_created(msg.sender, new_tablet_address, block.number, block.timestamp, creators_count());
        return new_tablet_address;
    }
    
    function withdraw(uint amount) external returns (bool) {
        require(msg.sender == tablet_factory_owner);
        msg.sender.transfer(amount);
        return true;
    }
    
}

contract abstract_registry {
    function owner(bytes32 node) constant returns(address);
    function resolver(bytes32 node) constant returns(address);
    function ttl(bytes32 node) constant returns(uint64);
    function setOwner(bytes32 node, address owner);
    function setSubnodeOwner(bytes32 node, bytes32 label, address owner);
    function setResolver(bytes32 node, address resolver);
    function setTTL(bytes32 node, uint64 ttl);
}

contract abstract_resolver {
    function PublicResolver(address ensAddr);
    function supportsInterface(bytes4 interfaceID) constant returns (bool);
    function addr(bytes32 node) constant returns (address ret);
    function setAddr(bytes32 node, address addr);
    function hash(bytes32 node) constant returns (bytes32 ret);
    function setHash(bytes32 node, bytes32 hash);
}