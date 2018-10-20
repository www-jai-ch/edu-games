// --------------------------------------------------------
// Mathemodul Javascript Uebungen
// (c) 2018 Michael Zimmermann
// --------------------------------------------------------
const math = {
	newText : Texte.get("newTsk"),
	anzahlAufgaben : 7,
	zufallszahlListe : [],
	seek : function (n) {zahlenraum=n;this.zufallszahlListe=[];}
};
// zufallszahl
var zahlenraum = 20;
var decExp = 1;

//const anzahlAufgaben = 7; // const
//var aufgabe = -1;

const loesungListe = []; //internal model
//var t1 = document.getElementById("t1"); // redeclaration in memory


// nächste zufallszahl aus der liste
function zufallszahl() {
	if (math.zufallszahlListe.length==0) {
		math.zufallszahlListe = generiereZufallsliste(zahlenraum+1,1);//including 0 and top
	}
	return math.zufallszahlListe.pop(); // / decExp;
}

// zufallszahl class: zahlen zwischen zr1 und zr2 gemischt
// used in Kettenrechnungen
function zz(z1,z2) {
	this.z1 = z1;
	this.z2 = z2;
	this.zufallszahlListe = [];
	this.pop = function () {
		if (this.zufallszahlListe.length==0) {
			this.zufallszahlListe = generiereZufallsliste(this.z2-this.z1,1);
		}
		return this.zufallszahlListe.pop() + this.z1;
	}
}

function ctd(ce) {
	var td = document.createElement("td");
	td.appendChild(ce);
	return td;
}

function ctdt(s1) {
	return ctd(document.createTextNode(s1));
}

function bruch(z,n){
//	return '<div class="fraction"><span class="fup">'+z+'</span><span class="bar">/</span><span class="fdn">'+n+'</span></div>';
	return '<div class="fraction"><span class="fup">'+z+'</span><span class="fdn">'+n+'</span></div>';
}

// check:  HTMLelement, answer, correct answer
function check(val, a, b) {
	if (a) {
		if (b) {
			val.className = CLASS.richtig;
			ergebnis.richtig++;
			return true;
		} else {
			val.className = CLASS.falsch;
			ergebnis.falsch++;
		}
	} else {
		val.className = CLASS.leer;
		ergebnis.leer++;
	}
	return false;
}

function elementClass(i_value,nenner) {
	this.val = i_value;
	this.nenner = nenner;
	this.visible = false;
	this.solvable = false;
	this.ui = null;
	
	this.solved = function(){return (this.solvable || this.visible);};
	
	this.chk = function(){
		if (this.ui == null || this.ui == undefined) return;
		var className = CLASS.leer;
		var kc = UNICODE.leer;
		if (typeof this.val === "boolean" && this.ui.value){
//			console.log(this.ui.checked+"="+this.val);
			if (this.ui.checked == this.val) {
				className = CLASS.richtig;
				kc = UNICODE.richtig;
				ergebnis.richtig++;
			} else {
				className = CLASS.falsch;
				kc = UNICODE.falsch;
				ergebnis.falsch++;
			}
		} else if ( this.nenner ) {
			className = "";
//			console.log(this.ui);
			var list = this.ui.getElementsByTagName("input");
//			console.log(list);
			var val = list[0], nen = list[1];
			check(val, val.value, val.value == this.val);
			check(nen, nen.value, nen.value == this.nenner);
			kc = (val.className == CLASS.richtig ? UNICODE.richtig : UNICODE.falsch); // @todo incomplete
		} else if (this.ui.value){
			if (this.ui.value == this.val || Number(this.ui.value.replace(',','.')) == this.val) {
//				this.ui.value = this.ui.value.replace(',','.');
				className = CLASS.richtig;
				kc = UNICODE.richtig;
				ergebnis.richtig++;
			} else {
				className = CLASS.falsch;
				kc = UNICODE.falsch;
				ergebnis.falsch++;
			}
		} else {
			ergebnis.leer++;
		}
		this.ui.className = className;
		return kc;
	}
}

function resultat(v,nenner) { return new elementClass(v,nenner); }

function initAufgabe(genAufgabeFunction,buttons) {
//zufallszahlListe = bildeZufallszahlListe(zahlenraum+1,1);
	var model = [];
	for (var y = 0; y < math.anzahlAufgaben; y++) {
		var a;
		do { a = genAufgabeFunction(y); } while (a[0]==false);
		a.splice(0,1);
		model.push(a);
	}
	init(model,true,(buttons==undefined?true:buttons));
}

function chk(m) {
	ergebnis.versuch();
	for (var y=0; y<m.length; y++) {
		var row = m[y];
		var korrekturfeld = row[row.length-1];
		korrekturfeld.innerHTML = "";
		for (var x=0; x+1<row.length; x++) {
			var kc = row[x].chk();
//			korrekturfeld.innerHTML += kc;
		}
	}
	ergebnis.show();
}

const HTML01 = '<option></option><option value="1">Richtig</option><option value="0">Falsch</option>';
function init(model, generic, buttons) {
	ergebnis = new ergebnisClass();
//	var m = [];//loesung
//	loesungListe.push(m);

	// buttons and actions
	var div = document.createElement("div");
	div.className = "uebung";
	var t1 = document.createElement("table");
	t1.className = "math";
	div.appendChild(t1);
	if (buttons==undefined?true:buttons) {
		var div2 = document.createElement("div");
		div.appendChild(div2);
		if (generic) {
			div2.appendChild(newButton(function () { location.reload(); }));
		}
		var b = chkButton();
		b.onclick = function () { chk(loesungListe); };
		div2.appendChild(b);
	}
	document.body.appendChild(div);

	for (var y=0; y<model.length; y++) {
		var row = model[y];
		var tr = document.createElement("tr");
		t1.appendChild(tr);
		if (row == undefined) {
//			console.log("leer");
			continue;
		}
		var m = [];
		for (var c=0; c<row.length; c++) {
			var e = row[c];
			if (e instanceof elementClass) {
				e.ui = document.createElement("input");
				if (typeof e.val === "boolean") {
					e.ui.type = 'checkbox';
//					e.ui = document.createElement("select");
//					e.ui.innerHTML = HTML01;
//					console.log(e.ui.innerHTML)
				} else if ( e.nenner ) {
					e.ui = document.createElement("div");
					e.ui.innerHTML = bruch("<input>","<input>");
				}
				m.push(e);
				tr.appendChild(ctd(e.ui));
			} else if (e instanceof HTMLElement) {
				tr.appendChild(ctd(e));
			} else {
				var td = document.createElement("td");
				tr.appendChild(td);
				td.innerHTML = e.toLocaleString(navigator.language); //@todo
			}
		}
		var korrekturfeld = ctdt("");
		m.push(korrekturfeld);
		tr.appendChild(korrekturfeld);
		loesungListe.push(m);
	}
}

function dekorieren() {
	var bruchList = document.getElementsByClassName("bruch");
	for (var i=0; i<bruchList.length; i++) {
		var item = bruchList[i].innerHTML.split('|');
		if (item.length==2) {
			bruchList[i].innerHTML = bruch(item[0],item[1]);
		}
	}
}

