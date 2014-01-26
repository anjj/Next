<?php
    session_start();
    if (isset($_SESSION['seid']) && $_SESSION['seid'] =="DustaBurika"){
 		
 	} else {
 		header("Location: /log.html");
 	}
?>

<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.0/jquery.mobile-1.4.0.min.css" />
        <link rel="stylesheet" href="css/styles.css" />
        <link rel="shortcut icon" type="image/png" href=css/img/next_icon.png" />
        <title>Next</title>
    </head>
    <body>

        

        <!-- HOME -->
        <div data-role="page" id="home">
                <!--HEADER-->
                <div data-role="header" data-theme="b">
                    <a href="#manager" class="ui-btn-left" data-dismisable="true" data-icon="bars">Menu</a>
                    <h2>NEXT</h2>
                </div>

                <!--LEFT PANEL-->
                <div data-role="panel" id="manager" data-display="overlay" class="ui-reponsive" data-theme="b">
                    <ul data-role="listview" id="managerList">
                        <li data-role="list-divider"><h2>MENU</h2></li>
				        <li><a onclick="window.location = 'index.php';">Home</a></li>
                        <li><a onclick="window.location = 'newSerie.php';">Añadir Series</a>
                    </ul>
                </div><!-- /panel -->
        
                <!--CONTENT-->
                <div class="content">
                <div class="legend">
		            <ul>
                        <li class="itemListA">Imagen</li>
				        <li class="itemListB">Nombre</li>
				        <li class="itemListA">Capitulos</li>
				        <li class="itemListA">Actual</li>
			        </ul>
		        </div>
                <!--TABLE DATA-->
                
                <ul class="dataUL" data-filter="true" id="series-table"></ul>
            </div><!--EndOfContent-->
        </div><!--END OF HOME-->

        <!-- DETAIL SERIE-->
        <div data-role="page" id="detailSerie">
                <!--HEADER-->
                <div data-role="header" data-theme="b">
                    <a href="#manager" class="ui-btn-left" data-dismisable="true" data-icon="bars">Menu</a>
                    <h2 id="Dtitle">NEXT</h2>
                </div>
                <!--LEFT PANEL-->
                <div data-role="panel" id="manager" data-display="overlay" class="ui-reponsive" data-theme="b">
                    <ul data-role="listview" id="managerList">
                        <li data-role="list-divider"><h2>MENU</h2></li>
				        <li><a onclick="window.location = '#home';">Home</a></li>
                        <li><a onclick="window.location = 'newSerie.php';">Añadir Series</a>
                    </ul>
                </div><!-- /panel -->

                <div class="content" id="Dcontent">
  
                </div>

             <!-- POP UP DETAIL -->
                <div class="poper">
                <div data-role="popup" id="popupParis" data-overlay-theme="b" data-corners="false">
                    <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
               
                        <input type="text" id="CapNameEditor" placeholder="Nombre del Capitulo">
                        <fieldset class="ui-grid-a">
                          <div onclick="viewedEpisode();" id="buttonLeft" class="ui-block-a"><button id="viewButton" type="submit" data-theme="a">VISTO</button></div>
                          <div onclick="editEpisode();" id="buttonRight" class="ui-block-b"><button type="submit" data-theme="a">EDITAR</button></div>
                        </fieldset>
                
                </div>

        </div>

        </div>
        

        <div id="loader" class="loader"></div>

        <!--Javascript-->
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="js/bulbasaur.js"></script>
        <script src="http://code.jquery.com/mobile/1.4.0/jquery.mobile-1.4.0.min.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    </body>
</html>
