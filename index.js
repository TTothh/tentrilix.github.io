$(document).ready(function() {
	$("#" + new Date().getDay()).trigger("click");
});

var time = ["17:00 - 18:00", "18:30 - 19:30", "20:00 - 21:00", "22:00 - 23:00", "00:00 - 01:00", "16:30 - 17:30", "18:00 - 19:00", "19:30 - 20:30", "21:00 - 22:00", "23:00 - 00:00", "01:00 - 02:00", "15:00 - 15:45", "16:00 - 16:45", "17:00 - 17:45", "18:00 - 18:45", "19:00 - 19:45", "20:00 - 20:45", "21:00 - 22:00", "23:00 - 00:00", "01:00 - 02:00", "13:00 - 13:40", "14:00 - 14:40", "15:00 - 15:40", "16:00 - 16:40", "17:20 - 18:00", "18:50 - 19:30", "20:20 - 21:00", "22:00 - 23:00", "00:00 - 01:00"];
var szinpadok = ["Hammerworld", "Barba", "Arena", "Sator"];

var kedd = ["IDEAS", "TALES OF EVENING", "METAL CHURCH", "GLORYHAMMER", "RHAPSODY", "PURGEN", "BOOZE&GLORY", "PROSECTURA", "THE CASUALTIES", "THE EXPLOITED", "PICSA", "AGE OF AGONY", "ARCHAIC", "INFEST", "KILL WITH HATE", "GUTTED", "NERVOSA", "DYING FETUS", "VADER", "ANGERSEED", "BESZAVAZÁS", "LOVECROSE", "ÉHENKÓRÁSZOK", "ANGELSEED", "ODPISANI", "NEMECSEK", "COUNTER CLOCKWISE", "MACSKANADRÁG", "FEGYELMEZŐ RÉSZLEG"];
var szerda = ["KYLFINGAR", "NIBURTA", "DALRIADA", "FINNTROLL", "ELUVEITIE", "NOVA PROSPECT", "DOROTHY", "LEANDER KILLS", "DEPRESSZIÓ", "ROAD", "AWS", "HATVAN CITY HC", "DIRTY DAWN", "TISZTÁN A CÉL FELÉ", "LIBERAL YOUTH", "SOCIAL FREE FACE", "SIBERIAN MEET GRINDER", "RISE OF THE NORTHSTAR", "TERROR", "DON GATTO", "BESZAVAZÁS", "RUMPROOF", "ISATHA", "LEECHER", "BORDERS OF BYZANTIUM", "TIANSEN", "PHRENIA", "BURNOUT", "NEW FRIEND REQUEST"];
var csutortok = ["AGREGATOR", "NEVERGREEN", "WOLFHEART", "INSOMNIUM", "PARADISE LOST", "ALCOHOL", "COOL HEAD CLAN", "JUNKIES", "KALAPÁCS", "OSSIAN", "ZORALL", "AHRIMAN", "ANDARTAR", "PERIHELION", "SEAR BLISS", "BORNHOLM", "CARACH ANGREN", "MGLA", "MARDUK", "CHRISTIAN EPIDEMIC", "BESZAVAZÁS", "DREAMGRAVE", "REASON", "DOOMAS", "ECHONALD", "REBEL", "VESZTEGZÁR", "STRESS", "DYING WISH"];
var pentek = ["MAGOR", "BLOODY ROOTS", "MOBY DICK", "JINJER", "SOULFLY", "PHOENIX RT", "AURORA", "OMEN", "RÓMEÓ VÉRZIK", "POKOLGÉP", "AKELA", "JACK", "WEDDING AT THE SLAUGHTERHOUSE", "KRAMPÜS", "PAEDIATRICIAN", "FOSTARTÁLY", "GUTALAX", "VENOM INC", "NAPALM DEATH", "RÓZSASZÍN PITTBULL", "BESZAVAZÁS", "SAMAS", "ROOM OF THE MAD ROBOTS", "RED SWAMP", "STONE DIRT", "SHAPAT TERROR", "CADAVERES", "WALL OF SLEEP", "INVADER"];
var szombat = ["ØRDØG", "WATCH MY DYING", "APEY AND THE PEA", "BÖMBERS", "PHIL ANSELMO & THE ILLEGALS", "BLUES COMPANY", "P.BOX", "RUDÁN JOE BAND", "MOBILMÁNIA + VIKIDÁL", "LORD", "PADDY AND THE RATS", "FAMINE HILL", "HARMED", "STUBBORN", "OMEGA DIATRIBE", "INSANE", "OUR HOLLOW, OUR HOME", "ABORTED", "BURY TOMORROW", "THE SOUTHERN ORACLE", "BESZAVAZÁS", "SNIFFYCTION", "LOST CONTINENT", "TRILLION", "DIVIDED", "DYSTOPIA", "CONTINUUM", "PAIR O' DICE", "ROTOR"];

function nulladik() {
	$("#days").css("display", "none");
	$("#zero").css("display", "initial");
	$("#zero").addClass("fading");
}

function nap(melyik) {
	$("#days").css("display" ,"inline-table");
	$("#zero").removeClass("fading");
	$("#zero").css("display" ,"none");
	
	clear();
	generate(melyik);
}

function generate(day) {
	var szinpad = szinpadok[0];
	var j = 0;
	
	var min = 780;
	var kezdet = 0;
	var veg = 0;
	
	var koncert = 0;
	var szunet = 0;
	
	for(i = 0; i < time.length; ++i) {
		kezdet = calc(time[i])[0];
		veg = calc(time[i])[1];
		
		if(i == 0) {
			szunet = calc(time[i])[0] - min;
		} else {
			szunet = calc(time[i])[0] - calc(time[i - 1])[1];
		}
		
		if(szunet < 0) {
			szunet = 24*60 - calc(time[i - 1])[1];
		} else if(szunet > 4*60) {
			szunet = calc(time[i])[0] - min;
			++j;
			szinpad = szinpadok[j];
		}
		
		if(veg - kezdet > 0) {
			koncert = veg - kezdet;
		} else {
			koncert = 24*60 - kezdet;
		}
		place(szunet, koncert, szinpad, i, day);
	}
}

function calc(which) {
	var ido = which.split(" - ");
	var kezdet = (parseInt(ido[0].split(":")[0]) * 60) + (parseInt(ido[0].split(":")[1]));
	var veg = (parseInt(ido[1].split(":")[0]) * 60) + (parseInt(ido[1].split(":")[1]));
	
	return [kezdet, veg];
}

function place(sz, k, szinpad, i, day) {
	if(sz > 0) {
		$("[value=" + szinpad + "]").append("<div id='sz" + i + "' style='height: calc(100%/780*" + sz + ");'></div>");
	}
	$("[value=" + szinpad + "]").append("<div id='k" + i + "' style='height: calc(100%/780*" + k + ");'></div>");
	
	$("#k" + i).html(time[i] + "<br>" + day[i]);
}

function clear() {
	for(i = 0; i < szinpadok.length; ++i) {
		$("[value=" + szinpadok[i] + "]").empty();
	}
}
