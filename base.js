// --------------------------------------------------------
// Basismodul Javascript Uebungen
// (c) 2018 Michael Zimmermann
// --------------------------------------------------------
const Texte = {
 chk :	{de:"Prüfen"
	,fr:"Tester"
	,it:"Controllare"
	,en:"Check"}
 ,
 math :	{de:"Mathematik"
	,fr:"Mathématique"
	,it:"Mathematica"
	,en:"Mathematics"}
 ,
 next :	{de:"weiter"
	,fr:"plus avant"
	,it:"avanti"
	,en:"next"}
 ,
 neu	:{de:"Neu"
	,fr:"Neuf"
	,it:"Nuovo"
	,en:"New"}
 ,
 newTsk:{de:"Neue Aufgabe"
	,fr:"Neuf"
	,it:"Nuovo Questio"
	,en:"New Task"}
 ,
 bravo: {de:"Bravo"
	,fr:"Excellent"
	,it:"Eccellente"
	,en:"Excellent"}
 ,
 shffl: {de:"Mischen"
	,fr:"Battre les cartes"
	,it:"Fare il mazzo"
	,en:"Shuffle"}
 ,
 Resultat: {de:"Resultat"
	,fr:"résultat"
	,it:"risultato"
	,en:"Score"}
 ,
 richtig: {de:"richtig"
	,fr:"correct"
	,it:"corretamente"
	,en:"correct"}
 ,
 falsch: {de:"falsch"
	,fr:"erroné"
	,it:"impropriamente"
	,en:"wrong"}
 ,
 leer:	{de:"leer"
	,fr:"vide"
	,it:"vacante"
	,en:"empty"}
 ,
 farben:{de:["rot","grün","blau"]
	,fr:["rouge","vert","bleu"]
	,it:["rosso","verde","azurro"]
	,en:["red","green","blue"]}
 ,
 get : function get (key){
	try {
		return this[key][language];
	}
	catch(err) {
		return err;
	}
 }
};

const namen = ["Andrea","Bob","Cindy","Dominique","Egon","Florin","Gabriel","Hugo"
			,"Isa","Jule","Kim","Leo","Marlin","Nathan","Oskar","Peter"
			,"Quentin","Robin","Sascha","Toni","Ursula","Veronica"
			,"Wilfried","Xaver","Yael","Zoe"
			];

//const farben = Texte.get("farben"); // ["rot","grün","blau"];

const faktor = ["nicht","einmal","doppelt","dreimal","viermal","fünfmal"];

// -- end  text --

const UNICODE = {richtig:" &#x2714;",falsch:" &#x274C;",waereRichtig:" &#x2713;",leer:" "}
const CLASS = {
	richtig:"richtig"
	,falsch:"falsch"
	,leer:"leer"
	,waereRichtig:"waereRichtig"
	,zeigen:"zeigen"
	,verdeckt:"verdeckt"
	,antwort:"antwort"
}

const bildArray = "Ente Fischli Giraffe Hund Kaninchen Katze Kuh Löwe Maus Schaf Tech Elefant".split(" ");

// lang
const lang = ["de","fr","it","en"];
var language = document.documentElement.lang; // navigator.language.substring(0,2);

// home link
function aNode(href,name){
	var a = document.createElement("a");
	a.href = href;
	a.innerHTML = name;
	return a;
};

var ersterKindknoten = document.body.firstChild;
var header = document.createElement("header");
var div = document.createElement("div");
var nav = document.createElement("nav");
header.appendChild(div);
div.appendChild(nav);


const menulist = [
	[
		["Mathematik-Zahlenmauern-Addition.html"	],
		["Mathématiques-Pyramides-Addition.html"	],
		["Mathematica-La-piramide-dell'-Addizione.html"	],
		["Mathematics-Number-Pyramid-Addition.html"	]
	],
	[
		["Logical-Buch.html" 	], // de
		["Logical-Livre.html"	], // fr
		["Logica-Libro.html"	], // it
		["Logical-Book.html"	]  // en
	],
	[
		["Logical-Drei-Ponys.html"	], // de
		["Logical-Les-trois-ponys.html"	], // fr
		["Logica-I-tre-pony.html"	], // it
		["Logical-Three-ponies.html"	]  // en
	],
	[
		["Logical-Zebrarätsel.html"	], // de
		["Logical-Énigme-Zèbre.html"	], // fr
		["Logica-Zebra.html"	], // it
		["Logical-Zebra.html"	]  // en
	]
];

var arr = decodeURI(location.pathname).split('/');
var page = arr[arr.length-1];
var uriLang = arr[arr.length-2];
var mmm;
var found = false;
console.log("current page:"+page);
console.log("uriLang:"+uriLang);
for (var n=0; n<menulist.length && !found; n++){
	mmm = menulist[n];
	for (var i=0; i<mmm.length && !found; i++) {
		console.log(mmm[i][0]);
		if (mmm[i][0]==page) {
			found = true;
			console.log("found");
		}
	}
}
if(!found){
	mmm = [["index.html"],["index.html"],["index.html"],["index.html"]];
}

function menuNode(lng,href,name){
	var span = document.createElement("span");
	var node;
	if (lng==uriLang) {
		node = document.createTextNode(name);
		span.classList.add("richtig");
	} else {
		if (lng==""){
			node = aNode(href,name);
		} else  {
			node = aNode("../"+lng+"/"+href,name);
		}
	}
	span.appendChild(node);
	nav.appendChild(span);
};

menuNode(""  ,"index.html","jai.ch");
menuNode("de",mmm[0][0],"deutsch");
menuNode("fr",mmm[1][0],"français");
menuNode("it",mmm[2][0],"italiano");
menuNode("en",mmm[3][0],"english");


if (ersterKindknoten == undefined) {
	document.body.appendChild(header);	
} else {
	document.body.insertBefore(header,ersterKindknoten);	
}

// allgemein
var uebung = document.getElementById("uebung");
var elScore = document.createElement("div");
if (uebung) {
	uebung.appendChild(elScore);
}
/*
// <div><button type="button" onclick="functionPruefen()">Prüfen!</button><b id="score"></b></div>
var elDiv = document.createElement("DIV");
var elButton = document.createElement("BUTTON");
var elScore = document.createElement("SPAN");
var elImg = document.createElement("IMG");
elImg.src = "Bilder\\Schaf.png";
elImg.style.width = "100%";
document.body.appendChild(elDiv);
document.body.appendChild(elImg);
elDiv.appendChild(elButton);
elDiv.appendChild(elScore);
elButton.type = "button";
elScore.id = "score";
elButton.innerHTML = "Prüfen!";
elButton.onclick = function () { functionPruefen(); }
*/

// common ++

// mische array 
// implements the Fisher-Yates shuffle to randomly sort an array.
function shuffle(arr) {
	var k, t, len;
	len = arr.length;
	if (len < 2) {
		return;
	}
	while (len) {
		k = Math.floor(Math.random() * len--);
		t = arr[k];
		while (k < len) {
			arr[k] = arr[++k];
		}
		arr[k] = t;
	}
	return arr;
}
// return ist muster in der liste enthalten
function includes(liste,muster) {
	return liste.indexOf(muster) >= 0;
}
// return array aus n * werte 0..length-1 und mische
function generiereZufallsliste(length,p2) {
	var arr = [], n = p2 ? p2 : 1;
	for (var i=0; i<length; i++) {
		for (var j=0; j<n; j++) {
			arr.push(i);
		}
	}
	return shuffle(arr);;
}

function removeAllChildren(n) {
	while (n.hasChildNodes()) {
		n.removeChild(n.lastChild);
	}
}

function subSet(muster,n){
	var zufallsListe = generiereZufallsliste(muster.length,1);
	var arr = [];
	while (arr.length<n) {
		arr.push(muster[zufallsListe.pop()]);
	}
	return arr;
}

// array filter
function einmalige (elem, index, self) { // @todo item or elem
	return index == self.indexOf(elem);
}

// sum of array elelemts
function sumListe(arr) {
	var n = 0;
	arr.forEach(function (item, i) { n += item; });
	return n;
}

// array compare
function numCompare (a, b) { 
	return a - b;
}

function localeCompare(a, b) { 
	return a.localeCompare(b);
}

// array push unique
function arrayPush(arr,elem) {
	if (arr.indexOf(elem) >= 0) {
		return false;
	}
	arr.push(elem);
	return true;
}

function arrRandElem(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

// random image
function imgHTML() {
	return '<img src="..\\Bilder\\'+bildArray[Math.floor(Math.random()*bildArray.length)] +'.png" />';
}
function imgEule() {
	return '<img src="..\\Bilder\\Eule.png" />';
}
// insert new node y after node x
function insertAfter(x,y) {
	x.parentNode.insertBefore(y, x.nextSibling);
}
function insertAfterDiv(x,y) {
	var div = document.createElement("p");
	div.appendChild(y);
	x.parentNode.insertBefore(div, x.nextSibling);
}

// return span element
function creClickSpan(innerHTML,callback) {
	var span = document.createElement("SPAN");
	span.innerHTML = innerHTML;
	span.addEventListener('click', callback );
	return span;
}

function createClickSpan(auswahl,str) {
	return creClickSpan(str, function (event) { zeigen(event,auswahl,str); });
}

function genButton(textKey,callback){
	var b = document.createElement("button");
	b.type = "button";
	b.innerHTML = Texte.get(textKey);
	b.onclick = callback;
	return b;
}
// check button
function chkButton(callback){
	return genButton("chk",callback);
}
// new button
function newButton(callback){
	return genButton("newTsk",callback);
}

// replace 
function logiRepl(str,arr,prefix){
	var result = str;
//	console.log(result);
	arr.forEach(function(item,i) {
		var reg = new RegExp(prefix+i, 'g')
		result = result.replace(reg,item);
	});
//	console.log(result);
	return result;
};

// common --

var ergebnis = new ergebnisClass();

var myModal = {
	 modal : document.createElement("DIV")
	,modalContent : document.createElement("DIV")
	,span : document.createElement("SPAN")
	,modalText : document.createElement("P")
	,init : function() {
		document.body.appendChild(this.modal);
		this.modal.className = "modal";
		this.modalContent.className = "modal-content";
		this.modal.appendChild(this.modalContent);
		this.span.className = "close";
		this.span.innerHTML = "&times;"
		this.modalContent.appendChild(this.span);
		this.modalContent.appendChild(this.modalText);
	}
	,eventListener : function() {
//		console.log("close");
		myModal.undisplay();
	}
	,windowEventListener : function(event) {
//		console.log("window.onclick"+event);
		if (event.target == myModal.modal) {
			myModal.undisplay();
		}
	}
	,display : function(str) {
//		console.log("display"+str);
		this.modalText.innerHTML = str;
		this.modal.style.display = "block";
		// When the user clicks on <span> (x), close the modal
		this.span.addEventListener( 'click', this.eventListener);
		window.addEventListener( 'click', this.windowEventListener);
	}
	,undisplay : function() {
		this.modal.style.display = "none";
		//@todo: remove event listener
		this.span.removeEventListener( 'click', this.eventListener);
		window.removeEventListener('click' , this.windowEventListener);
	}
	,block : function() {
		return this.modal.style.display == "block";
	}
}
myModal.init();//@todo constructor??

function ergebnisClass() {
	this.anzahlVersuche = 0;
	this.richtig = 0;
	this.falsch = 0;
	this.leer = 0;
	this.ui = elScore;
	if (this.ui != null) {
		this.ui.innerHTML = '';
	}

	this.versuch = function () {
		this.richtig = 0;
		this.falsch = 0;
		this.leer = 0;
		this.anzahlVersuche++;
	}
	this.punkt = function (clazz) {
		if (clazz == CLASS.richtig) {
			this.richtig++;
		} else if (clazz == CLASS.falsch) {
			this.falsch++;
		} else if (clazz == CLASS.leer) {
			this.leer++;
		}
	}
	
	this.show = function() {
		var str = "<b>"+Texte.get("Resultat") +" " +this.richtig + " : " + this.falsch + "</b>";
		if (this.ui != null) {
			this.ui.innerHTML = str;
		}
		if (this.falsch + this.leer == 0) {
			str = "<h1>" + Texte.get("bravo") + '</h1>' + imgHTML() + '<br/>';
		}

		str += "<br/>"+this.richtig + " " + Texte.get("richtig") 
			 + "<br/>"+this.falsch + " " + Texte.get("falsch") 
			 + "<br/>"+this.leer + " " + Texte.get("leer") 
			;
		myModal.display(str);
	}
}
