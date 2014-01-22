var idSerie = 0;
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

                setProgress(((100 * itemS.capA) / itemS.capitulos).toFixed(2));
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
                $('#listCaps').append('<a onclick="EpisodePOP(' + Epi.id + ');" href="#popupParis" data-rel="popup" data-position-to="window" data-transition="fade"><li class="capitulo">' + length-- + " - " + Epi.name + '</li></a>');
            }

            
        });
    }
}
/*LIVE JQUERY*/
$("#home").on("pagecreate", function () {
    getS();
});

$("#detailSerie").on("pagecreate", function () {
    /*Show Loader GIF*/
});

$("#detailSerie").on("pageshow", function () {
    loadSerie();
});

/*UTILIDADES*/
function setProgress(progress){           
    var progressBarWidth =progress*$(".container").width()/ 100;  
    $(".progressBar").width(progressBarWidth).html(progress + "% Completa&nbsp;&nbsp;");
}
function detail(value){
    idSerie = value;
    window.location = '#detailSerie';
}
function EpisodePOP(idS){
    
    $.each(Episodes, function(index, episode) {
        if (episode.id == idS) {
            $("#CapNameEditor").val(episode.name);
            return;
        }
    });

    
}