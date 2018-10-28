const menu = {
	zahlenmauer : {
		de: ["Zahlenmauern Addition","Mathematik-Zahlenmauern-Addition.html"],
		fr: ["Mathèmatique","Mathèmatiques-Pyramides-Addition.html"],
        it: ["Mathematica",""],
        en: ["Mathematics",""]
	},
	logical_buch : [
			["Logical-Buch.html" ,"Wem gehört das Buch?"  ], // de
			["Logical-Livre.html","Libre"                 ], // fr
			["Logica-Libro.html" ,"Chi possiede il libro?"], // it
			["Logical-Book.html" ,"Who owns the Book?"     ]  // en
	],
	logical_pony : [
			["Logical-Drei-Ponys.html"     ,"Drei Ponys"       ], // de
			["Logical-Les-trois-ponys.html","Les trois ponys"  ], // fr
			["Logica-I-tre-pony.html"      ,"I tre pony"       ], // it
			["Logical-Three-ponies.html"    ,"Three ponies"     ]  // en
	],
	logical_zebra : [
			["Logical-Zebrarätsel.html" ,"Zebrarätsel"  ], // de
			["Logical-Énigme-Zèbre.html","Énigme Zèbre" ], // fr
			["Logica-Zebra.html"        ,"Logica Zebra" ], // it
			["Logical-Zebra.html"       ,"Zebra Puzzle - Einstein's Riddle" ]  // en
	]
}

function a(href,str){
	var e = document.createElement("a");
	e.href = href;
	e.appendChild(document.createTextNode(str));
	return e;
}
function li(arr){
	var idx = lang.indexOf(language);
	var li = document.createElement("li");
	li.appendChild(a(arr[idx][0],arr[idx][1]));
	for (var i=0; i<arr.length; i++) {
		if (i!=idx) {
			li.appendChild(document.createTextNode(" "));
			li.appendChild(a("../"+lang[i]+"/"+arr[i][0],lang[i]));
		}
	}
	return li;
}

var h1 = document.getElementById("logical");
var ol = document.createElement("ol");
insertAfter(h1,ol);
ol.appendChild(li(menu.logical_buch));
ol.appendChild(li(menu.logical_pony));
ol.appendChild(li(menu.logical_zebra));
