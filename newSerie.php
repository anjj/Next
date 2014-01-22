<?php
    session_start();
    if (isset($_SESSION['seid']) && $_SESSION['seid'] =="DustaBurika"){
 		
 	} else {
 		header("Location: /log.html");
 	}
?>

<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.0/jquery.mobile-1.4.0.min.css" />
        <link rel="stylesheet" href="css/styles.css" />
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="http://code.jquery.com/mobile/1.4.0/jquery.mobile-1.4.0.min.js"></script>
        <script src="js/bulbasaur.js"></script>
        <title>Add</title>
    </head>
    <body>
         <div data-role="header" data-theme="b">
            <h2>NEXT - Add Serie</h2>
        </div>

        <!--Content--> 

        <div data-role="fieldcontain" class="value">
			    <label for="name">Nombre serie</label>
			    <input class="inputS" type="text" name="name" id="name" data-mini="true" placeholder="Nombre serie" value="">
		</div>

         <div data-role="fieldcontain" class="value">
			    <label for="caps">Numero Capitulos</label>
			    <input class="inputS" type="number" name="caps" id="caps" data-mini="true" placeholder="Capitulos de la serie" value="">
		</div>

        <div data-role="fieldcontain" class="value">
			    <label for="capsA">Capitulo Actual</label>
			    <input class="inputS" type="number" name="capsA" id="capsA" data-mini="true" placeholder="Capitulo Actual" value="">
		</div>

         <div data-role="fieldcontain" class="value">
			    <label for="descr">Descripción</label>
			    <input class="inputS" type="text" name="descr" id="descr" data-mini="true" placeholder="Capitulos de la serie" value="">
		</div>



        <div data-role="fieldcontain" class="value">
            <label for="Imagen">Imagen</label>
            <input class="inputS" type="text" name="Imagen" id="Imagen" data-mini="true" placeholder="Url imagen" value="">
        </div>


        <a data-role="button" class="value" data-theme="b" onclick="submitValues()">Añadir</a>
    </body>
</html>
