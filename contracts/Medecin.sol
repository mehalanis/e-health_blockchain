pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;
contract Medecin {
  struct medecin {
      uint id;
      string email;
      string password;
  }
  mapping(uint => string[]) attribut;
  mapping(uint => medecin) public list_id_medecin;
  mapping(string => medecin) public list_email_medecin;
  medecin[] public medecins;
  function AddMedecin(string memory _email,string memory _password) public  returns(bool){
        require((keccak256(abi.encodePacked((list_email_medecin[_email].email))) == keccak256(abi.encodePacked(("")))),"erreur");
        uint id =medecins.push(medecin(0,_email,_password)) -1;
        medecins[id].id=id;
        list_id_medecin[id]=medecins[id];
        list_email_medecin[_email]=medecins[id];
        return true;
    }
    function addAttribut(uint _id,string memory _attribut) public returns(bool){
        attribut[_id].push(_attribut);
        attribut[_id].push("");
        return true;
    }
    function GetAttribut(uint _id) public view returns(string[] memory){
        return attribut[_id];
    }
    function InitAttribut(uint _id) public  returns(bool){
        attribut[_id].length=0;
        return true;
    }

    function VerifieMedecin(string memory _email,string memory _password) public view returns(bool v,uint _id){
        if((keccak256(abi.encodePacked((list_email_medecin[_email].email))) == keccak256(abi.encodePacked((_email)))) &&
        (keccak256(abi.encodePacked((list_email_medecin[_email].password))) == keccak256(abi.encodePacked((_password))))) return (true,list_email_medecin[_email].id);
        return (false,1);
    }
    function GetMedecin(string memory _email) public view returns(uint,string memory){
        return (list_email_medecin[_email].id,list_email_medecin[_email].email);
    }
    function getMedecins() public view returns(string[] memory){
        string[] memory p=new string[](medecins.length+1);
        for(uint i=0;i<medecins.length;i++){
            p[i]=medecins[i].email;
        }
        return p;
    }
  
}