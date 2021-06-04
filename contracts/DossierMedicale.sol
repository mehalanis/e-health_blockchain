pragma solidity ^0.5.16;
contract DossierMedicale {
    struct Dossier {
        uint id;
        uint patient_id;
      /*  string email_medecin;*/
        string Text;
    }
    
    mapping(uint /* user_id */ => Dossier ) public list_dossier_user;
    Dossier[] public dossier;
    function setUserDossier(uint _patient_id,string memory _Text) public  returns(bool){
     uint id= dossier.push(Dossier(0,_patient_id,_Text)) -1; 
     dossier[id].id=id;
     list_dossier_user[id]=dossier[id];
     return true;     
    }
    function GetUserDossier(uint _patient_id) public view returns(string memory text){
      return list_dossier_user[_patient_id].Text;     
    }
    

}