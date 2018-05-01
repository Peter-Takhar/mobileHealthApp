var map;
var mapLL;
var mapLLs;
var mapOptions;
var lat;
var lng;
var jsonPharma;
var jsonStudentArr;
var xmlfitdef;


$(document).on("pagebeforeshow", "#mainpage", function(){
	console.log("in pagebefore show");
	
	$.ajax({
		type: "POST",
		url: "XML01-fitnessdefinitions.xml",
		dataType: "xml",
		success:function(data){
			buildFitDef(data);
		},
	});
	
	$.getJSON("groupinfo.json",function(json){
					buildHeaderFooters(json);
			});
	
	$.getJSON("pfizer.json", function(json){
		buildPharmPage(json);
	});
		
});

function buildHeaderFooters(json){
	jsonStudentArr = json.Students.info;
    var start = json.Students.info;
	
	//builds popups of members
	for (var x=0; x < start.length; x++) {
		$("#member" + x + " .ui-content").html("<div class='info'>" +
								  "<div class='ui-grid-a'>" +
								  "<div class='ui-block-a'>" +
								  "<img src='" + start[x].studentPicture + 
												"' alt='image' height='150' width='120'>" + "</div>" +
												 "<div class='ui-block-b'>" +
												"<p><strong>Name:</strong> " + start[x].Student + "</p>" +
												"<p><strong>Login:</strong> " + start[x].login + "</p>" +
												"<p><strong>Program:</strong> " + start[x].studentNumber + "</p>" +
										"</div>" +
										"</div>" +				
										"</div>");

	}
	
	//build navbars for all pages

	$("div[data-role='footer']").each(function(){
		$(this).html("<nav data-role='navbar'><ul></ul></nav>");
		for (var x=0; x < start.length; x++) {

			$(this).find("ul").append(
										"<li><a href='#member" + x + "' class='ui-btn ui-icon-'" + start[x].icon +
										" data-rel='dialog' data-transition='pop'>"+start[x].Student + 
										"</a></li>");
		}
		
		$(this).navbar();
	});
	
	$("div[data-role='footer']").each(function(){
		if ($(this).find("nav[data-role='navbar']").length){
			$(this).navbar("destroy");
			$(this).navbar();
		}
	});
}
function buildFitDef(xml){
	console.log("in buildFitDef");
	
	
	var n = 0;
	if ($(".ui-block-a #fitdeflistviewa li").length == 0){
		$(xml).find("label-group").each(function(){
			if (n%2 == 0){
				$(".ui-block-a #fitdeflistviewa").append(
								"<li><a href='#fitdef" + n + "'>" + $(this).find("label").text() + "</a></li>"
									);
			} else {
				$(".ui-block-b #fitdeflistviewb").append(
								"<li><a href='#fitdef" + n + "'>" + $(this).find("label").text() + "</a></li>" 
									);
			}
		
			var newpage = 
				"<div data-role='page' id='fitdef" + n +"'>" +
					"<header data-role='header'>" +
						"<h1 class='ui-title'>Halton Health Central</h1>" +
					"</header>" +
					"<section class='ui-content' role='main'>" +
						"<div class='ui-grid-a'>" +
							"<div class='ui-block-a'>" +
								"<h1 class='fitdefh1'>" + $(this).find("label").text() + "</h1>" +
								"<p>" + $(this).find("characterization").text() + "</p>" +
		
							"</div>" +
							"<div class='ui-block-b' style='text-align:center;'>" +
								"<img class='fitdefpic' src='" + $(this).find("symbol").text() + "'>" +
								"<a href='" + $(this).attr("reference-url") + "'>" + 
									$(this).attr("reference") + "</a>" +
								"<a href='#fitdefpage' class='ui-btn'>Back to Fitness Definitions</a>" +
							"</div>" +
						"</div>" +
					"</section>" +
					"<div data-role='footer'></div>" +
				"</div>";
					
			if ($("#fitdef" + n).length == 0){
					$("#fitdefpage").after(newpage);
			}	
		
			n++;
		});
		
	$(".ui-block-a #fitdeflistviewa").listview();
	$(".ui-block-b #fitdeflistviewb").listview();
	}
	

	
	
	
	
}

function buildPharmPage(json){
	jsonPharma = json.Pharmaceutical;

	var products = json.Pharmaceutical.products;
	
	var grids = ['a','b','c','d'];

	for (var i = 0; i < products.length; i++){
		$("#prod .ui-block-" + grids[i]).html("<a href='#prod" + i + "popup' class='ui-btn'" +
							" data-rel='dialog' data-transition='pop'>" +
						products[i].name + "</a>");

						
		var popuptemplate = "<div data-role='page' id='prod" + i + "popup'>" +
							"<header data-role='header'>" +
								"<h1>" + products[i].name + "</h1>" +
							"</header>" +
							"<div class='ui-content' role='main'>" +
								"<p><strong>Drug Name(s): </strong>" + products[i].drugs + "</p>" +
								"<p><strong>Usage: </strong>" + products[i].desc + "</p>" +
								"<p><strong>Administration of Medicine: </strong>" + products[i].administered + "</p>" +
								"<p><strong>Contraindication#1: </strong>" + products[i].contraindication1 + "</p>" +
								"<p><strong>Contraindication#2: </strong>" + products[i].contraindication2 + "</p>" +
								"<p><a href='#pharmapage' data-rel='back' class='" +
							"ui-btn ui-icon-back ui-btn-icon-top'>Back to home page" +
							"</a></p>"  +
							"</div></div>";		
							
		if ($("#prod" + i + "popup").length == 0){
			$("#pharmapage").after(popuptemplate);
		}				
	
	}
	

		var popupabouttemplate = "<div data-role='page' id='popupabout'>" +
							"<header data-role='header'>" +
								"<h1>About Us -" + json.Pharmaceutical.company + "</h1>" +
							"</header>" +
							"<div class='ui-content' role='main'>" +
								"<p>About: " + json.Pharmaceutical.about + "</p>" +
								"<p>URL: " + json.Pharmaceutical.url + "</p>" +
								"<p>Phone Number: " + json.Pharmaceutical.phone + "</p>" +
								"<p><a href='#pharmapage' data-rel='back' class='" +
							"ui-btn ui-icon-back ui-btn-icon-top'>Back to home page" +
							"</a></p>"  +
							"</div></div>";	
		if ($("#popupabout").length == 0){
			$("#pharmapage").after(popupabouttemplate);	
		}
		
	
}




$(document).on("pageshow", "#pharmamappage", function() {
	console.log(jsonPharma);
	$("#pharmamappage header h1").html("Map - " + jsonPharma.company);
	$("div#map").html("");
	lat = jsonPharma.lat;
	lng = jsonPharma.lng;
	
	mapLL = new google.maps.LatLng(lat, lng);
	
	mapOptions = {
			center : mapLL, 
			zoom : 8,
			mapTypeId : google.maps.MapTypeId.HYBRID
		};
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	var locPharma = new google.maps.Marker ({
				map: map,
				icon:"pushpin.gif",
				animation: google.maps.Animation.DROP, 	
				position: mapLL
	});
	
	var info = new google.maps.InfoWindow({
			content: jsonPharma.company + "<br>" +
 					 jsonPharma.phone
			
	});
		
	google.maps.event.addListener(locPharma, "click", function(){
			info.open(map, locPharma);
	});
	
	mapLLs = new google.maps.LatLng(43.468486, -79.700134);
	
	var locGroup = new google.maps.Marker ({
				map: map,
				icon:"pushpin.gif",
				animation: google.maps.Animation.DROP, 	
				position: mapLLs
	});
	
	
	var infoGroup = new google.maps.InfoWindow({
			content: "Group Members: " + jsonStudentArr[0].Student + "<br>" +
						jsonStudentArr[1].Student + "<br>" +
						jsonStudentArr[2].Student + "<br>" +
						jsonStudentArr[3].Student + "<br>"
			
	});
		
	google.maps.event.addListener(locGroup, "click", function(){
			infoGroup.open(map, locGroup);
	});
});


    
 

