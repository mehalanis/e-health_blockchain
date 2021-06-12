pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;
import "./DossierMedicale.sol";
contract UserSystem {
    struct User {
        uint id;
        /*string nom;
        string prenom;
        string adresse;
        string telephone;*/
        string email;
        string password;
    }
    mapping(uint => string[]) attribut;
    mapping(uint => User) public listAddresse;
    mapping(string => User) public list_email_user;
    User[] public users;
    function setUser(/*string memory _nom,string memory _prenom,string memory _adresse,string memory _telephone,*/string memory _email,string memory _password) public  returns(bool){
        require((keccak256(abi.encodePacked((list_email_user[_email].email))) == keccak256(abi.encodePacked(("")))),"erreur");
        uint id =users.push(User(0,_email,_password)) -1;
        users[id].id=id;
        listAddresse[id]=users[id];
        list_email_user[_email]=users[id];
        return true;
    }
    function addAttrubut(uint _id,string memory _attribut) public returns(bool){
        attribut[_id].push(_attribut);
        attribut[_id].push("");
        return true;
    }

    function GetUser(uint _id) public view returns(uint id,string memory email,string memory password){
        return (listAddresse[_id].id,listAddresse[_id].email,listAddresse[_id].password);
    }
    function GetAttrubut(uint _id) public view returns(string[] memory){
        return attribut[_id];
    }
    function VerifieUser(string memory _email,string memory _password) public view returns(bool v,uint _id){
        if((keccak256(abi.encodePacked((list_email_user[_email].email))) == keccak256(abi.encodePacked((_email)))) &&
        (keccak256(abi.encodePacked((list_email_user[_email].password))) == keccak256(abi.encodePacked((_password))))) return (true,list_email_user[_email].id);
        return (false,1);
    }
/*
    function getUsers() public view returns(string[] memory){
        string[] memory p=new string[](users.length+1);
        for(uint i=0;i<users.length;i++){
            p[i]=users[i].email;
        }
        return p;
    }*/

}