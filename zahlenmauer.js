// (c) 2014 .. 2018 Michael Zimmermann
// --------------------------------------------------------

// <div>
// <button type="button" onclick="init_zm()">Neue Aufgabe</button>
// <button type="button" onclick="chk_zm()" >Prüfen</button>
// <input id='myGB' onchange="setGB(this.value)" type="range" name="points" min="3" max="12" value="5">
// </div>
// <div id="uebung"><table id="zm"></table></div>

// const div = document.createElement("div");
// div.appendChild(newButton(init_zm));
// div.appendChild(chkButton(chk_zm));
// const inpGB = document.createElement("input");
// inpGB.type = "range";
// inpGB.min = 3;
// inpGB.max = 12;
// inpGB.onchange = function() {setGB(this.value);};
// div.appendChild(inpGB);
//document.body.appendChild(div);


var GB = 3;
zahlenraum = 10;
var modusFrei = false;

//const zahlen = ["null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf"];
//let m = new Array(GB);
//var easy=false;

// function setGB(val) {
	// GB = Math.min(val,12);
	// GB = Math.max(GB,3);
	// init_zm();
// }
function ctde() {
	var td = document.createElement("td");
	td.className = "zm_empty";
	return td;
}
function unsolved(m) {
	var ue = new Array(0);
	for (y = GB-1; y >= 0; y--) {
		for (x = 0; x <= y; x++) {
			var me = m[y][x];
			if (!me.solved()) {
				ue.push(me);
			}
		}
	}
	return ue;
}
//    aaa
//  bbb ccc
function solve(m) {
	for (y = GB-2; y >= 0; y--) {
		for (x = 0; x <= y; x++) {
			var a = m[y][x];
			var b = m[y + 1][x];
			var c = m[y + 1][x + 1];
			if (
			     (a.solved() && b.solved()) 
			  || (a.solved() && c.solved()) 
			  || (b.solved() && c.solved()) 
			) {
			  a.solvable = true;
			  b.solvable = true;
			  c.solvable = true;
			}
		}
	}
}

//y 0         0x0
//y 1       1x0 xxx 
//y 2     2x0 xxx xxx 
//y 3   3x0 xxx xxx xxx
//y 4 4x0 4x1 4x2 4x3 4x4
// x   0   1   2   3   4
function init_zm(gb,oper) {
//	h1.innerHTML = "Zahlenmauer mit "+zahlen[GB]+" Grundbausteinen";
	GB = gb;

	modusFrei = oper==' ';

	var div = document.createElement("div");
	const zm = document.createElement("table");
	div.appendChild(zm);
	div.className = "uebung";
	document.body.appendChild(div);

//	inpGB.value = GB;
	var m = new Array(GB);
	var easy = true; //!easy;
	// calc model
	for (y = GB-1; y >= 0 ; y--) {
		m[y] = new Array(y);
		for (x = 0; x <= y; x++) {
			var me = new elementClass(-1);
			m[y][x] = me;
			if (modusFrei){
				me.val = null;
				me.visible = false;
			} else {
				if (y == GB-1) {
					me.val = zufallszahl();
				} else {
					me.val = m[y + 1][x].val + m[y + 1][x + 1].val;
				}
				if (oper=='-') {//minus
					me.visible = x == 0;
				} else {
					me.visible = y == GB-1 && easy;
				}
			}
		}
	}
	// for (var n=0 ; n<GB*GB ; n++) {
		// solve(m);
		// var us = unsolved(m);
		// if (us.length===0) {
			// break;
		// } else {
			// us[Math.floor(Math.random() * us.length)].visible=true;
		// }
	// }
	removeAllChildren(zm);
	
	var tr = document.createElement("tr");
	tr.className = "zm_ruler";
	for (var x=0; x<2*GB; x++) {
		tr.appendChild(ctde());
	}
	zm.appendChild(tr);

	for (var y = 0; y < GB; y++) {
		var tr = document.createElement("tr");
		var x = 0;
		var xm = 0;
		for (; x<(GB-y-1); x++) {
			tr.appendChild(ctde());
		}
		for (; x<(2*GB-(GB-y-1)); x+=2) {
//			var s = "Fr" + y + "" + Math.floor(x/2);
//			console.log("x:"+x+" s:"+s);
			var me = m[y][xm];
			var td;
			if (me.visible) {
				td = ctdt(me.val);
			} else {
				me.ui = document.createElement("input");
				me.ui.value = '';
				td = ctd(me.ui);
			}
			xm++;
			td.colSpan = 2;
			tr.appendChild(td);
		}
		for (; x<2*GB; x++) {
			tr.appendChild(ctde());
		}
		zm.appendChild(tr);
	}
	div = document.createElement("div");
	div.appendChild(chkButton(function() {chk_zm(m);}));
	document.body.appendChild(div);
}

function chk_zm(m) {
	ergebnis.versuch();
	if (modusFrei) {
		for (var y = m.length-1; y >= 0 ; y--) {
			for (var x = 0; x < m[y].length; x++) {
				var item = m[y][x];
				if (item.ui.value) {
					item.val = Number(item.ui.value);
				} 
				if (y < m.length-1) {
					if (m[y + 1][x].val && m[y + 1][x + 1].val) {
						item.val = m[y + 1][x].val + m[y + 1][x + 1].val;
					}
				}
				
			}
		}
	}
	for (y in m) {
		for (x in m[y]) {
//			console.log(y+":"+ x +"=>"+m[y][x].val)
			m[y][x].chk();
		}
	}
	ergebnis.show();
}
