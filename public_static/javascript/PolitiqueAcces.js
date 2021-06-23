var table = [{ id: 0, value: "patient", FG: -1, FD: -1 ,toString: function(){
    if((this.FG==-1)&&(this.FD==-1)) return this.value
    else return "("+table[this.FG].toString()+" "+ this.value +" "+table[this.FD].toString()+")"
}}];
var cpt=0;
function creerNoeud(val,FG,FD){
    return {
        "id":cpt,
        "value":val,
        "FG":FG,
        "FD":FD,
        toString: function(){
            if((this.FG==-1)&&(this.FD==-1)) return this.value
            else return "("+table[this.FG].toString()+" "+ this.value +" "+table[this.FD].toString()+")"
        }
    }
}
function insertIndex(index,val,op){
    if((table[index].value!="or")&&(table[index].value!="and")){
        var old_value=table[index].value;
        table[index].value=op;
        cpt++;
        table[index].FG=cpt;
        table[cpt]=creerNoeud(old_value,-1,-1); 
        cpt++;
        table[index].FD=cpt;
        table[cpt]=creerNoeud(val,-1,-1);        
       
    }
}
function initEtat(){
    $("#etat").empty();
    for(var i=0;i<=cpt;i++){
        if((table[i].FD==-1)&&(table[i].FG==-1)) $("#etat").append("<option value="+i+">"+table[i].value+"</option>")
    }
    $("#politique").val(table[0].toString())
    console.log(table[0].toString())

}
$(document).on("click",'#add',function(){
    insertIndex($( "#etat" ).val(),$( "#attribut" ).val(),$( "#op" ).val())
    initEtat();
})
$(function(){
    initEtat()
})

