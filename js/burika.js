var i = 0;
var PlusMinus = 1;
var Repeateble = setInterval(function(){changeColor()},15);

function myStopFunction(){
    clearInterval(Repeateble);
}

/*Function change Color Login IMG*/
function changeColor(){
  if(PlusMinus == 1){
      i++
      if(i == 100){
          PlusMinus = 0;
      }
  } else if(PlusMinus == 0){
    i--;
    if(i == 0){
        PlusMinus = 1;
    }
  }
    var elem = document.getElementById("logo");
    elem.setAttribute("style","-webkit-filter: contrast("+ i +"%);");

}

/*Function do Login*/
function dusta(){
    var emailCAP = document.getElementById("lemail").value;
    var passCAP = document.getElementById("lpass").value;
    var email = emailCAP.toLowerCase();
    var pass = passCAP.toLowerCase();
    var elem = document.getElementById("loader");
    elem.setAttribute("style","display: block;");
    RemoveLoginView();
    clearInterval(Repeateble);

    

    var parametres = { email: email, pass: pass};
    var dataS = jQuery.param(parametres);

    $.ajax({
        type: 'POST',
        url: 'ws/lo.php',
        data: dataS,
        success: function (data) {
            if (data == 1) {
                window.location = 'index.php';
            } else {
                setTimeout(function () {
                    appendPOPUP2();
                     setTimeout(function () {
                        window.location = 'log.html';
                     }, 4000);
                    
                }, 3000);

            }
        }

    });


}

/*Remove Login HTML Content*/
function RemoveLoginView(){
    PlusMinus = 2;
    var myNode = document.getElementById("content");
    myNode.remove();
}

/*Append Regiser Panel & Remove all the Other Views*/
function CreateRegister(){
    myStopFunction();
    RemoveLoginView();
    var elem = document.getElementById("loader");
    elem.remove();
    document.body.innerHTML = '<div id="content" class="content"><div class="head"><img alt="image" src="css/img/next_icon.png" id="logo">'
                            + '<p class="title">What is Next?</p></div>'
                            + '<input class="input1" type="text" id="user" placeholder="username">'
                            + '<input class="input3" id="email" type="email" placeholder="Email">'
			                + '<input class="input2" id="pass" type="password" placeholder="password">'
                            + '<div class="button2" onclick="newAcc();"><a>Create Account</a></div>'        
                            + '</div><div id="popUp" class="white_content"></div>';
}

/*New Account*/
function newAcc(){
    var name = document.getElementById("user").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    if(email == "" || pass == ""){
        appendPOPUP();
        return;
    }

    var parametres = { name: name, email: email, pass: pass};
    var dataS = jQuery.param(parametres);


    $.ajax({
		type: 'POST',
		url: 'ws/re.php',
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

/*Show POP Up with the correspond Values*/
function appendPOPUP(){
     
        
        var elem = document.getElementById("popUp");
        elem.setAttribute("style","display: block;");

        $('#popUp').append('<div class="Error">Los datos introducidos son incorrectos.<br>'
                         + 'No se permiten contraseñas en blanco o email en blanco</div>');
        setTimeout(function () {
            var elem = document.getElementById("popUp");
            elem.setAttribute("style","display: none;");
            
            var myNode = document.getElementById("popUp");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            
        }, 3000);
}

/*Show POP Up with the correspond Values*/
function appendPOPUP2(){
     
        
        var elem = document.getElementById("popUp");
        elem.setAttribute("style","display: block;");

        $('#popUp').append('<div class="Error">Los datos introducidos son incorrectos.<br>'
                         + 'Verifique que los datos introducidos son incorrectos</div>');
        setTimeout(function () {
            var elem = document.getElementById("popUp");
            elem.setAttribute("style","display: none;");
            
            var myNode = document.getElementById("popUp");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            
        }, 3000);
}
