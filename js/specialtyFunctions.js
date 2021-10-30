var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar



function editarSpecialty(){

    var elemento={
        "id": idCarga,
        "name":$("#nameSpecialty").val(),
        "description":$("#descriptionSpecialty").val()
    };
    
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:8080/api/Specialty/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormularioSpecialty();
            consultarSpecialty();
            idCarga=null;
        }
    });
}

function eliminarSpecialty(idElemento){
    var elemento={
        "id":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://localhost:8080/api/Specialty/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultarSpecialty();
        }
    });
}


function cargarSpecialty(idItem){
    $.ajax({    
        url : "http://localhost:8080/api/Specialty/"+idItem,
        type : 'GET',
        dataType : 'json',        
        
        success : function(json) {               
                console.log(json);

  
          $("#nameSpecialty").val(json.name);
          $("#descriptionSpecialty").val(json.description);
          idCarga = idItem;
          console.log("idCarga es " +idCarga);

        }
    });
}

//////------------------


function consultarSpecialty(){
    $.ajax({
        url:"http://localhost:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaSpecialty(respuesta);
        }
    });
}
//consultar();

function pintarRespuestaSpecialty(respuesta){
    let myTable=`<div class="container" style="width: 100%"><div class="row">`;
    for(i=0; i<respuesta.length; i++) {
        myTable+=`
            <div class="card m-2" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${respuesta[i].name}</h5>
                    <p class="card-text">${respuesta[i].description}</p>
                    <div align="centre">
                        <button class="btn btn-success" onclick="eliminarSpecialty(${respuesta[i].id})">Borrar</button>
                        <button class="btn btn-success" onclick="cargarSpecialty(${respuesta[i].id})">Cargar</button>
                    </div>
                </div>
            </div>`;   
         
    }
    myTable+=`</div></div>`;
    $("#resultadosSpecialty").html(myTable);
    
    /**let myTable="<table border='1'>";
    myTable+="<thead>";
    myTable+="<TR>";
    myTable+="<th>"+"Nombre"+"</th>";
    myTable+="<th>"+"Descripcion"+"</th>";
    myTable+="</TR>";
    myTable+="</thead>";
    for(i=0; i<respuesta.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td><button onclick='eliminar("+respuesta[i].id+")'>Borrar</button></td>";
        myTable+="<td><button onclick='cargar("+respuesta[i].id+")'>Cargar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultados").html(myTable);**/
}

function guardarSpecialty(){
    let var2 = {
        name:$("#nameSpecialty").val(),
        description:$("#descriptionSpecialty").val()
    };
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:8080/api/Specialty/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            //limpiarFormularioSpecialty();
            consultarSpecialty();
        },
        error:function(jqXHR, textStatus, errorTrown){
            //window.location.reload();
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormularioSpecialty(){
    $("#nameSpecialty").val("");
    $("#descriptionSpecialty").val("");
}

$(document).ready(function(){
    consultarSpecialty();
});