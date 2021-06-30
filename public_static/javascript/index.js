$(document).ready(function () {
	$("#sidenav-main").load("../include/sidenav.html");
	$("#sidenav-main_medecin").load("../include/sidenav_medecin.html");
  $("#navbar").load("../include/navbar.html");
  $("#footer").load("../include/footer.html");
})
/*
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
*/