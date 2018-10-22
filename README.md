# edu-games
Browser-based education pages and games for Desktop and Smartphones. Primary school level.

## To run this project
* [GitHub demo](https://www-jai-ch.github.io/edu-games/)
* Download project (green button) and unzip project into an empty directory. Run `index.html` in any HTML-browser with javascript enabled. No internet connection or external library required.

## What can I change?
There is a sub-directory for each language.
Edit the html files to improve the task description. For example Logical-Drei-Ponys.html in the de dub-directoy.

In the below snippet the text between the ```<h1>``` and ```</h1>``` marker is editable, without affecting the layount and behavour of the page. The same applies for the ```<p>``` and ```<li>``` tags.

``` ruby
<h1>Logical - Logikraetsel - Drei Ponys</h1>
<p>Logical fuer Schueler. Wie heisst das schwarze Pony?</p>
```

## How It Works
The text makred as ```<b>braun</b>``` will be replaced at startup into a clickage elements (```id="aufgabentext"```) and placeholders (```class="uebung"```). 

``` ruby
<ol id="aufgabentext">
<li>Das Pony rechts hat <b>braun</b>e Augen.</li>
<li>Das Pony mit den <b>blau</b>en Augen hat einen <b>rot</b>en Sattel.</li>
...
</ol>

<div class="uebung">
<table>
...
<tr>
<th>Augenfarbe</th><td><b>blau</b></td><td><b>grün</b></td><td><b>braun</b></td>
</tr>
</table>
</div>
```

## What Will I Learn?
HTML, CSS, and JavaScript.

## Hints

## See a demo
* [GitHub demo](https://www-jai-ch.github.io/edu-games/)
* [Number Race Game](http://www.jai.ch/de/Spiele%20Zahlenrennen.html)
