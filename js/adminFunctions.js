var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar



function editarAdmin(){

    var elemento={
        "idAdmin":idCarga,
        "name":$("#nameAdmin").val(),
        "email":$("#emailAdmin").val(),
        "password":$("#passwordAdmin").val()
    };
    
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:8080/api/Admin/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            //limpiarFormularioAdmin();
            consultarAdmin();
            idCarga=null;
        }
    });
}

function eliminarAdmin(idElemento){
    var elemento={
        "idAdmin":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://localhost:8080/api/Admin/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultarAdmin();
        }
    });
}


function cargarAdmin(idItem){
    $.ajax({    
        url : "http://localhost:8080/api/Admin/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json);

                var misItems=json.items;
  
          $("#nameAdmin").val(json.name);
          $("#emailAdmin").val(json.email);
          $("#passwordAdmin").val(json.password);
          idCarga = idItem;
          console.log("idCarga es " +idCarga);
          
  
  
        }
    });
}

//////------------------


function consultarAdmin(){
    $.ajax({
        url:"http://localhost:8080/api/Admin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaAdmin(respuesta);
        }
    });
}

function pintarRespuestaAdmin(respuesta){
    let myTable=`<div class="container" style="width: 100%"><div class="row">`;
    for(i=0; i<respuesta.length; i++) {
        myTable+=`
            <div class="card m-2" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${respuesta[i].name}</h5>
                    <a href="${respuesta[i].email}" class="card-link">${respuesta[i].email}</a>
                    <!-- p class="card-text">${respuesta[i].password}</p -->
                    <div align="centre">
                        <button class="btn btn-success" onclick="eliminarAdmin(${respuesta[i].idAdmin})">Borrar</button>
                        <button class="btn btn-success" onclick="cargarAdmin(${respuesta[i].idAdmin})">Cargar</button>
                    </div>
                </div>
            </div>`;   
         
    }
    myTable+=`</div></div>`;
    $("#resultadosAdmin").html(myTable);
    
    /**let myTable="<table border='1'>";

    myTable+="<thead>";
    myTable+="<TR>";
    myTable+="<th>"+"Nombre"+"</th>";
    myTable+="<th>"+"Email"+"</th>";
    myTable+="<th>"+"Contraseña"+"</th>";
    myTable+="</TR>";
    myTable+="</thead>";
    for(i=0; i<respuesta.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td><button onclick='eliminar("+respuesta[i].idAdmin+")'>Borrar</button></td>";
        myTable+="<td><button onclick='cargar("+respuesta[i].idAdmin+")'>Cargar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultados").html(myTable);**/
}

function guardarAdmin(){
    let var2 = {
        name:$("#nameAdmin").val(),
        email:$("#emailAdmin").val(),
        password:$("#passwordAdmin").val()
    };
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:8080/api/Admin/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            //limpiarFormularioAdmin();
            consultarAdmin();
        },
        error:function(jqXHR, textStatus, errorTrown){
            
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormularioAdmin(){
    $("#nameAdmin").val("");
    $("#emailAdmin").val("");
    $("#passwordAdmin").val("");
}

$(document).ready(function(){
    consultarAdmin();
});