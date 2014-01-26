var idSerie = 0;
var Tepisode;
var indexE = 0;
var loader;
var EpisodeStatus;

MapSeries = [];
Episodes = [];


/*ADD Serie*/
function submitValues(){
    var name = $( "#name").val();
    var capitulos = $( "#caps").val();
    var capituloA = $("#capsA").val();
    var descripcion = $( "#descr").val();
    var imagen = $( "#Imagen").val();
    var parametres = { name: name, cap: capitulos, descr: descripcion, img: imagen, capA: capituloA};
    var dataS = jQuery.param(parametres);


    $.ajax({
		type: 'POST',
		url: 'ws/InS.php',
		data: dataS,
		success: Correct,
		error: ErrorMessage
	});

    function Correct(){
	    window.location = 'index.php';
    }

    function ErrorMessage(Error){
	    alert('ERROR:  al add la serie');
    }
}

/*GET Series*/
function getS(){
    
    $.ajax({
		type: 'GET',
		url: 'ws/getS.php',
		dataType: 'json',
		success: insetSerie,
		error: function(error) {alert('ERROR:  ' + error.message)}
	});

	function insetSerie(data) {
	    series = data;
	    MapSeries = data;
	    $.each(series, function (index, serie) {
	        $('#series-table').append('<li><a onClick="detail(' + serie.id +')"><div class="dataUL-itemA"><img alt="image" class="imgU" src="'+serie.imagen+'">'
                                + '</div><span class="dataUL-itemB">' + serie.name + '</span><span class="dataUL-itemA">' + serie.capitulos + '</span>'
                                + '<span class="dataUL-itemA">' + serie.capA + '</span></a></li>');
	    });
    }
}

/*LOAD SERIE INDIVIDUAL => DETAIL */
function loadSerie(){
    
    if(idSerie){
        /*Borrar toda la mierda antes inflada*/
        var myNode = document.getElementById("Dcontent");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        $.each(MapSeries, function (index, itemS) {
            if (itemS.id == idSerie) {

                document.getElementById("Dtitle").value = itemS.name;

                $('#Dcontent').append('<div class="detail-img" ><img src="' + itemS.imagen + '"></div>'
                 + '<div class="detail-text">' + itemS.description + '</div>'
                 + '<div class="container"><div class="progressBar"></div></div>'
                 + '<div class="listCaps"><ul id="listCaps"></ul>'
                 );

                loadEpisodes();
                
                
            }

        });
    } else {
        window.location = 'index.php#home';
    }
 }

/*LOAD EPISODES REVERSE MODE*/
function loadEpisodes(){

    var parametres = { id: idSerie};
    var bureka = jQuery.param(parametres);

    $.ajax({
		type: 'GET',
		url: 'ws/getE.php',
		dataType: 'json',
        data: bureka,
		success: printEpisodes,
		error: function(error) {alert('ERROR:  ' + error.message)}
	});

    function printEpisodes(data){
        Episodes = data;
        length = Object.keys(Episodes).length;
        $.each(Episodes, function (index, Epi) {

            if(Epi.viewed == 'no'){
                $('#listCaps').append('<a onclick="EpisodePOP(' + Epi.id +  ');" href="#popupParis" data-rel="popup" data-position-to="window" data-transition="fade"><li class="capituloS">' + length-- + " - " + Epi.name + '</li></a>');
            } else if( Epi.viewed == 'ac'){
                $('#listCaps').append('<a onclick="EpisodePOP(' + Epi.id + ');" href="#popupParis" data-rel="popup" data-position-to="window" data-transition="fade"><li class="capituloA">' + length-- + " - " + Epi.name + '</li></a>');
            } else {
                $('#listCaps').append('<a onclick="EpisodePOP(' + Epi.id + ');" href="#popupParis" data-rel="popup" data-position-to="window" data-transition="fade"><li class="capituloA">' + length-- + " - " + Epi.name + '</li></a>');
            }

            setProgress();
        });
    }
}

/*Change Status EPISODES*/
function viewedEpisode(){

    if(Tepisode.viewed == 'no' || Tepisode.viewed == 'ac'){
        EpisodeStatus = 'si';
    } else {
        EpisodeStatus = 'no';
    }

    newName = $( "#CapNameEditor").val()

    parametres = { id: Tepisode.id, viewed: EpisodeStatus};
    dataEpi = jQuery.param(parametres);


    $.ajax({
		type: 'POST',
		url: 'ws/UpE.php',
		data: dataEpi,
		success: Correct,
		error: ErrorMessage
	});

    function Correct(){
       getPositionEpisodeById(Tepisode.id);
       countL = $("#listCaps li").size()
       /*CHANGE el CSS Button*/
       if(Tepisode.viewed == 'no'){
           $('#viewButton').text('VISTO');
           $("#viewButton").css("background", "#90EE90");
           $("#listCaps li").get(indexE).setAttribute("style", "background: #90EE90;");
           Tepisode.viewed = 'si';
       } else {
           Tepisode.viewed = 'no';
           $('#viewButton').text('SIN VER');
           $("#listCaps li").get(indexE).setAttribute("style", "background: #F17979;");
           $("#viewButton").css("background", "#F17979");
       }
              
    }

    function ErrorMessage(Error){
	    alert('ERROR:  al editar el capitulo - ( º - º ) ');
    }

    setProgress();
}

/*Editar el nombre del capitulo*/
function editEpisode(){
    
    newName = $("#CapNameEditor").val();

    parametres = { id: Tepisode.id, name: newName };
    dataEpi = jQuery.param(parametres);


    $.ajax({
		type: 'POST',
		url: 'ws/UpEname.php',
		data: dataEpi,
		success: Correct,
		error: ErrorMessage
	});

	function Correct() {
	    $("#listCaps li").get(indexE).innerText = Tepisode.numCap + ' - ' + newName;
    }

	function ErrorMessage() { alert('ERROR:  al editar el capitulo - ( º - º ) '); }
}


/*LIVE JQUERY*/
$("#home").on("pagecreate", function () {
    getS();
});

$("#home").on("pageshow", function () {
    loader = document.getElementById("loader");
    loader.setAttribute("style","display: none;");
});

$("#detailSerie").on("pagecreate", function () {
    loader = document.getElementById("loader");
    loader.setAttribute("style","display: block;");
});

$("#detailSerie").on("pageshow", function () {
     loader.setAttribute("style","display: none;");
     loadSerie();
});


/*UTILIDADES*/
function setProgress(){
    var count = 0;

    $.each(Episodes, function (index, episode) {
        if (episode.viewed == 'si') {
            count++;
        }
    });

    serieStatus = (( count / Episodes.length ) * 100).toFixed(2);

    var progressBarWidth =serieStatus*$(".container").width()/ 100;  
    $(".progressBar").width(progressBarWidth).html(serieStatus + "%&nbsp;");
}
function detail(value){
    idSerie = value;
    window.location = '#detailSerie';
}
function EpisodePOP(idS){

    $.each(Episodes, function (index, episode) {
        if (episode.id == idS) {
            Tepisode = episode;
            if (episode.viewed == 'no') {
                $('#viewButton').text('SIN VER');
                $("#viewButton").css("background", "#F17979");
            } else {
                $("#viewButton").val('VISTO');
                $("#viewButton").css("background", "#90EE90");
            }
            $("#CapNameEditor").val(episode.name);
            return;
        }
    });
}
function getPositionEpisodeById(idEpisode){
    $.each(Episodes, function (index, episode) {
        if (episode.id == idEpisode) {
            indexE = index;
        }
    });
}
