
var map;
var gmarkers = [];
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var myOptions = {
    zoom: 12,
    center: new google.maps.LatLng(40.748492, -73.985496),
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

/*========================================================*/
/*               GET LOCATIONS                           */
/*========================================================*/

$(document).ready(function () {
		
        map = new google.maps.Map(document.getElementById("map"), myOptions);
        
        var input = document.getElementById("txtAddress");
        var autocomplete = new google.maps.places.Autocomplete(input);

		});	

$("#btnSearch").click(function(){

	gmarkers = [];
	
    var current = $("#txtAddress").val();
    $("#txtAddress1").val(current);

    $("#locations").html('');

    //Convert Address Into LatLng and Retrieve Address Near by
	convertAddressToLatLng($("#txtAddress").val());
	show("5star");
	show("4star");
	show("3star");
	});

function convertAddressToLatLng(address){
	 	var geocoder = new google.maps.Geocoder();
		
		geocoder.geocode({ 'address': address }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				//Empty div before re-populating
				$("#locations").html('');
			    searchStores(results[0].geometry.location);
			} else {
			 	$("#locations").html(getEmbedHTMLLoc('No HVC Hotels Found','',''));
			}
		});
	}
	
function searchStores(location){
		var latlng = new google.maps.LatLng(location.lat(),location.lng());
	    var myOptions = {
	    	zoom: 12,
	        center: latlng,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    
	    map = new google.maps.Map(document.getElementById("map"), myOptions);	
		
		//Marker at the address typed in
		var image = 'images/townhouse.png'
        var marker = new google.maps.Marker({
                position: latlng,
                map: map,
				icon: image
        });		
		
		//hard coded the radius to 10 miles, if you get the value from a field if required
		var parameters = 'lat='+ location.lat() + '&lng=' + location.lng() + '&radius=10';  
	
		$.ajax({  
			type: "POST",  
			dataType: 'json',
			url: "store_locator.php",  
			data: parameters,  
			success: function(msg) {  

				displayStores(msg);

			},
			error:function (xhr, ajaxOptions, thrownError){
            	alert(thrownError);
            }    
		});  
	}
	
function displayStores(result){
		if (result.length > 0){
			for (i=0;i<result.length;i++){
				//Append Store Address on Sidebar
				var name = result[i].name;
				var address = result[i].address;
				var distance = result[i].distance;
				var category = result[i].category;

				var html = getEmbedHTMLLoc(i+1,name,address,distance);
				$("#locations").append(html);
				//place a marker
				var image = 'images/number_' + parseInt(i+1) + '.png';
				var latlng = new google.maps.LatLng(result[i].lat,result[i].lng);
				
				var marker = new google.maps.Marker({
					position: latlng,
					map: map,
					name: name,
					address: address,
					distance: distance,
					icon: image,
				});

					
				marker.mycategory = category;                                 
		        gmarkers.push(marker);


				var msg = 'Location : ' + result[i].name + '<br/> ';
				msg += 'Address : ' + result[i].address + '<br/> ';
				msg += '<button onclick="getDirections(' + "'" + address + "'" + ')">Get Directions</button>';
            	
            	attachMessage(marker, msg);

			}
		} else {
			$("#locations").html("<p style='padding: 10px; font-size: 16px font-family: Times' >No HVC Hotel Found!</p>");
		}
	}

function attachMessage(marker, msg) {
		var infowindow = new google.maps.InfoWindow({
			content: msg,
			size: new google.maps.Size(200, 200)
		});
		//Add event listener to marker
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);

		});
	}
//prepares content to be displayed on the side-bar	
function getEmbedHTMLLoc(seqno,name,address,distance) {
		var	strhtml = '<div class="rows">';
		strhtml  =  strhtml + '<img src="images/number_' + seqno + '.png" border="0" width="35" height="35" style="padding-right:10px;" /><label style="font-family:Open Sans Condensed; font-size: 12px">' + name + '</label><br/>'
		strhtml  =  strhtml + '<span style="font-family:Open Sans Condensed; font-size: 14px;">' + address + '<span><br/>'
		strhtml  =  strhtml + '<span> Distance : ' + parseFloat(distance).toFixed(2) + ' miles<span>' + ' ' +'<button onclick="getDirections(' + "'" + address + "'" + ')">Get Directions</button> <br/>'
		strhtml  =  strhtml + '</div><div class="separator"></div>';
		
		return strhtml;
	}

//shows all markers of a particular category, and ensures the checkbox is checked
function show(category) {
		for (var i=0; i<gmarkers.length; i++) {
		  if (gmarkers[i].mycategory == category) {
		    gmarkers[i].setVisible(true);
		  }
		}
		//check the checkbox ==
		document.getElementById(category).checked = true;
	}

//hides all markers of a particular category, and ensures the checkbox is cleared
function hide(category) {
		for (var i=0; i<gmarkers.length; i++) {
		  if (gmarkers[i].mycategory == category) {
		    gmarkers[i].setVisible(false);
		  }
		}
		//clear the checkbox 
		document.getElementById(category).checked = false;
	}

//rebuilds the sidebar to match the markers currently displayed
function makeSidebar() {

	for (var i=0; i<gmarkers.length; i++) {
	  if (gmarkers[i].getVisible()) {
	    var html = getEmbedHTMLLoc(i+1,gmarkers[i].name,gmarkers[i].address,gmarkers[i].distance);
		$("#locations").append(html);
	   }
	 }
   }
//fires when checkboxes are clicked
function boxclick(box,category) {
	console.log(box);
	console.log(category);
		if (box.checked) {	  
		  show(category);
		} else {
		  hide(category);
		}
		$("#locations").html('');
		 makeSidebar(); 
	}

function getDirections(address){

		var current = $("#txtAddress").val();

		map = new google.maps.Map(document.getElementById("map"), myOptions);

		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);

		$("#txtAddress1").val(current);
        $("#txtAddress2").val(address);
     
		calcRoute(current, address);

    }

/*========================================================*/
/*               GET DIRECTIONS                           */
/*========================================================*/

$("#btnGetDirections").click(function(){

    map = new google.maps.Map(document.getElementById("map"), myOptions);

	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);

	$("#directions").html('');

	calcRoute($("#txtAddress1").val(),$("#txtAddress2").val());

});			 

function calcRoute(start,end) {
	  var request = {
		origin:start,
		destination:end,
		travelMode: google.maps.TravelMode.DRIVING,
		provideRouteAlternatives : false
	  };
	  directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		  directionsDisplay.setDirections(result);
		  displayDirections(result);
		}
	  });
	}
  	
function displayDirections(result){
		var html = '<div style="margin:5px;padding:5px;background-color:#EBF2FC;border-left: 1px solid #EBEFF9;border-right: 1px solid #EBEFF9;text-align:right;">';
			html = html + '<span><strong>' + $.trim(result.routes[0].legs[0].distance.text.replace(/"/g,'')) + ', ' + $.trim(result.routes[0].legs[0].duration.text.replace(/"/g,'')) + '</strong></span></div>';
		$("#directions").html(html);
		
		//Display Steps
		var steps  = result.routes[0].legs[0].steps;
		for(i=0; i<steps.length; i++) {
			var instructions = JSON.stringify(steps[i].instructions);
			var distance = JSON.stringify(steps[i].distance.text);
			var time = JSON.stringify(steps[i].duration.text);
			$("#directions").append(getEmbedHTML(i+1,instructions,distance,time));
		}
	}
		
function getEmbedHTML(seqno,instructions,distance,duration) {
		var	strhtml = '<div class="rows">';
		strhtml  =  strhtml + '<span>' + seqno + '</span>&nbsp;' + $.trim(instructions.replace(/"/g,'')) + '<br/>'
		strhtml  =  strhtml + '<div style="text-align:right;"><span>' + $.trim(distance.replace(/"/g,'')) + ' <span></div>'
		strhtml  =  strhtml + '</div><div class="separator"></div>';
		
		return strhtml;
	}
