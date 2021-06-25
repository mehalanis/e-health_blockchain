pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract DossierMedicale {
    struct Dossier {
        uint id;
        uint patient_id;
        /*  string email_medecin;*/
        string hash_file;
        string policy;
    }

    mapping(uint /* user_id */ => Dossier[] ) public list_dossier_user;

    function setUserDossier(uint _patient_id,string memory _hash_file,string memory _policy) public  returns(bool){
     uint id= list_dossier_user[_patient_id].push(Dossier(0,_patient_id,_hash_file,_policy)) -1; 
     list_dossier_user[_patient_id][id].id=id;
     return true;     
    }
    function setHashFile(uint _patient_id,uint _dossier_id,string memory _hash_file) public  returns(bool){
     list_dossier_user[_patient_id][_dossier_id].hash_file=_hash_file;
     return true;     
    }
    function GetUserDossier(uint _patient_id,uint _dossier_id) public view returns(uint ,string memory ,string memory ){
      return (list_dossier_user[_patient_id][_dossier_id].id,list_dossier_user[_patient_id][_dossier_id].hash_file,list_dossier_user[_patient_id][_dossier_id].policy);     
    }
    function GetAllDossier(uint _patinet_id) public view returns(string[] memory,uint[] memory){
      string[] memory hash_=new string[](list_dossier_user[_patinet_id].length+1);
       uint[] memory id_=new uint[](list_dossier_user[_patinet_id].length+1);
      for(uint  i=0;i<list_dossier_user[_patinet_id].length;i++){
        id_[i]=list_dossier_user[_patinet_id][i].id;
        hash_[i]=list_dossier_user[_patinet_id][i].hash_file;
      }
      return (hash_,id_);
    }
  

}