// --------------------------------------------------------
// Basismodul Javascript Uebungen
// (c) 2018 Michael Zimmermann
// --------------------------------------------------------

const uebu = {
	auswahl_mischen : false,
};
const NBSPS = "&nbsp;&nbsp;&nbsp;&nbsp;";
var einfachverwendung = false;

function auswahlUebung(elem){
	this.loesungList = [];
	this.fieldList = [];
	this.gruppen = false;

	function chk () {
		ergebnis.versuch();
		for (var i=0; i<this.fieldList.length; i++) {
			var item = this.fieldList[i]; 
			if (item instanceof Array) {
				var gruppe = item;
				for (var j=0; j<gruppe.length; j++) {
					var item = gruppe[j]; 
					if (item.innerHTML == null 
					 || item.innerHTML == ""
					 || item.innerHTML == NBSPS) 
					{
						ergebnis.leer++;
						item.className = CLASS.leer;
					} else if (includes(this.loesungList[i],item.innerHTML.trim())) {
						ergebnis.richtig++;
						item.className = CLASS.richtig;
					} else {
						ergebnis.falsch++;
						item.className = CLASS.falsch;
					}
				}
			} else {
				if (item.innerHTML == null 
				 || item.innerHTML == ""
				 || item.innerHTML == NBSPS) 
				{
					ergebnis.leer++;
					item.className = CLASS.leer;
				} else if (this.loesungList[i] == item.innerHTML.trim()) {
					ergebnis.richtig++;
					item.className = CLASS.richtig;
				} else {
					ergebnis.falsch++;
					item.className = CLASS.falsch;
				}
			}
		}
		ergebnis.show();
	};
	
	// init
	var aufgabentext = document.getElementById("aufgabentext");
	var list = elem.getElementsByTagName("b");
	var listLength = list.length;
//	var elDiv = document.createElement("DIV");

	this.gruppen = elem.classList.contains("gruppen");

	var boundBefore = chk.bind(this);
	insertAfterDiv(elem,chkButton(function () { boundBefore() }));

	// -- init ---
	var temp = [];
	if (this.gruppen) {
		einfachverwendung = true;
		var liList = elem.getElementsByTagName("LI");
		for (var n=0; n<liList.length; n++) {
			var li = liList[n];
			list = li.getElementsByTagName("b");
			var gruppe = [], felder = [];
			for (var i=0, len=list.length; i<len; i++) {
				var b = list[0];// liste wird abgebaut
				var span = createClickSpan(false,NBSPS);
				b.parentNode.replaceChild(span, b);
				gruppe.push(b.innerHTML);
				temp.push(b.innerHTML);
				felder.push(span);
			}
			this.loesungList.push(gruppe);
			this.fieldList.push(felder);
		}
	} else {
		for (var i=0; i<listLength; i++) {
			var b =  list[0];// liste wird abgebaut
			var span = createClickSpan(false,NBSPS);
			this.loesungList.push(b.innerHTML.trim());
			b.parentNode.replaceChild(span, b);
			this.fieldList.push(span);
		}
		temp = this.loesungList.filter(einmalige);
		if (aufgabentext) {
			einfachverwendung = true;
		} else {
			einfachverwendung = temp.length == this.loesungList.length;
		}
	}
	console.log(einfachverwendung)
	//	uebu.auswahl_mischen = auswahl && auswahl.classList.contains("mischen");

	if (aufgabentext) {
		var bList = aufgabentext.getElementsByTagName("b");
		while (bList.length) {
			var b =  bList[0];// liste wird abgebaut
			var span = createClickSpan(true,b.innerHTML);
			b.parentNode.replaceChild(span, b);
		}
	} else {
		auswahl = document.createElement("DIV");
		auswahl.id = "auswahl";
		elem.parentNode.insertBefore(auswahl,elem);

		if (uebu.auswahl_mischen) {
			shuffle(temp);
		} else {
			temp.sort(localeCompare);
		}
		temp.forEach(function(item) {
			auswahl.appendChild(createClickSpan(true,item));
			auswahl.appendChild(document.createTextNode(" "));
		});
	}
}

var aufgedeckt;//dom
var aufgedeckt_ist_auswahl;

var uebungen = document.getElementsByClassName("uebung");
if (uebungen.length>0){
	console.log(uebungen.length);
	for (var i=0; i<uebungen.length; i++) {
		console.log(uebungen[i]);
		var au = new auswahlUebung(uebungen[i]);
	}
} else {
	var au = new auswahlUebung(uebung);
}

var map = new Map();
function mapInsert(aufgedeckt) {
	if (einfachverwendung) {
		aufgedeckt.classList.add("d");
		map.set(event.target,aufgedeckt);
	}
}
function mapRemove(aufgedeckt) {
	if (einfachverwendung) {
		var e = map.get(aufgedeckt);
		//console.log(e);
		if (e) {
			e.classList.remove("d");
			map.delete(aufgedeckt);
		}
	}
}

function zeigen(event, ist_auswahl, str) {
	//console.log(event.target +":"+ ist_auswahl +":"+ str);
	//console.log("currentTarget:"+event.currentTarget);
	if (event.currentTarget.classList.contains("d")) {
		return; // ignore
	}
	if (aufgedeckt == null) {
		aufgedeckt = event.currentTarget;
//		console.log("aufgedeckt.innerHTML:"+aufgedeckt.innerHTML);
//		console.log("aufgedeckt.className:"+aufgedeckt.className);
		if (ist_auswahl) {
			aufgedeckt_ist_auswahl = ist_auswahl;
			aufgedeckt.classList.add(CLASS.zeigen);
		} else {
			mapRemove(aufgedeckt);
			event.currentTarget.innerHTML = NBSPS;
			aufgedeckt = null;
		}
	} else if (aufgedeckt == event.currentTarget) {
		aufgedeckt.classList.remove(CLASS.zeigen);
		aufgedeckt = null;
	} else if (aufgedeckt_ist_auswahl == ist_auswahl) {
		aufgedeckt.classList.toggle(CLASS.zeigen);
		aufgedeckt = event.currentTarget;
		aufgedeckt.classList.toggle(CLASS.zeigen);
	} else {
		if (ist_auswahl) {
//			console.log(event.target.outerHTML);
//			console.log(str);
			aufgedeckt.innerHTML = (str==undefined ? event.target.outerHTML : str);
			aufgedeckt.classList.toggle(CLASS.zeigen);
			aufgedeckt = null;
		} else {
			mapRemove(event.target);
			mapInsert(aufgedeckt);
			event.target.innerHTML = aufgedeckt.innerHTML;
			event.target.classList.remove(CLASS.zeigen);
			aufgedeckt.classList.remove(CLASS.zeigen);
			aufgedeckt = null;
		}
	}
	event.stopPropagation();
}

