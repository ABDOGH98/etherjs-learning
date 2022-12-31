//SPDX-License-Identifier: MIT
//pragma solidity >=0.8.7 <0.9.0; //more stable
pragma solidity ^0.8.0;

contract SimpleStorage {
    bool hasFavNbr = true;
    uint public favNbr = 123; //unit = 256bit, unit8 = 8bits -> stpe of 8 to 256
    string favNbrStr = "Five";
    int256 x = -3000;
    address myAddr = 0xd9145CCE52D386f254917e481eB44e9943F39138;
    bytes32 faveBytes = "cat";
    struct People {
        uint256 favnum;
        string name;
    }
    People public person = People({favnum: 2, name: "abdo"});
    People[] public peopoles;
    mapping(string => uint256) public nameToFaveNbr;

    function store(uint256 _favoriteNumber) public virtual {
        favNbr = _favoriteNumber;
        favNbr = _favoriteNumber + 1;
    }

    //view -> func dont need gas to run because dont change in blockchaine
    //view
    function retrieve() public view returns (uint256) {
        return favNbr;
    }

    //pure
    function modify() public pure returns (uint256) {
        return 1 + 1;
    }

    //calldata -> temp var that cannot be modifier
    //memory -> temp var that can be modified
    //storage -> pemvat that can be modified
    function addPerson(string memory _name, uint256 _favenum) public {
        peopoles.push(People(_favenum, _name));
        nameToFaveNbr[_name] = _favenum;
    }
    /*
    function giveMe(uint storage _i) public returns(uint){
        return _i;
    }
    function givemei() public returns(uint){
        return _i;
    }*/
}
// 0xd9145CCE52D386f254917e481eB44e9943F39138
