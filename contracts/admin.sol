pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;
contract admin {
  struct Admin {

      string email;
      string password;
  }

  mapping(string => Admin) public list_email_admin;
 // admin[] public admins;
  function AddAdmin(string memory _email,string memory _password) public  returns(bool){
        require((keccak256(abi.encodePacked((list_email_admin[_email].email))) == keccak256(abi.encodePacked(("")))),"erreur");
        //admins.push(admin(_email,_password));
        list_email_admin[_email]=Admin(_email,_password);
        return true;
    }

    function VerifieAdmin(string memory _email,string memory _password) public view returns(bool v){
        if((keccak256(abi.encodePacked((list_email_admin[_email].email))) == keccak256(abi.encodePacked((_email)))) &&
        (keccak256(abi.encodePacked((list_email_admin[_email].password))) == keccak256(abi.encodePacked((_password))))) return (true);
        return (false);
    }
}