var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar



function editarDoctor(){

    var elemento={
        "id":idCarga,
        "name":$("#nameDoctor").val(),
        "department":$("#departmentDoctor").val(),
        "year":$("#yearDoctor").val(),
        "description":$("#descriptionDoctor").val(),
        "specialty":{"id":$("#specialtyDoctor").val()}
    };
    
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:8080/api/Doctor/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormularioDoctor();
            consultarDoctor();
            idCarga=null;
        }
    });
}

function eliminarDoctor(idElemento){
    var elemento={
        "id":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://localhost:8080/api/Doctor/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultarDoctor();
        }
    });
}




function cargarDoctor(idItem){
    $.ajax({    
        url : "http://localhost:8080/api/Doctor/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json);
  
          $("#nameDoctor").val(json.name);
          $("#departmentDoctor").val(json.department);
          $("#yearDoctor").val(json.year);
          $("#descriptionDoctor").val(json.description);
          $("#specialtyDoctor").val(json.specialty.id);
          idCarga = idItem;
          console.log("idCarga es " +idCarga);
        }
    });
}

//////------------------


function consultarDoctor(){
    $.ajax({
        url:"http://localhost:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaDoctor(respuesta);
        }
    });
}

function pintarRespuestaDoctor(respuesta){
    
    let myTable=`<div class="container" style="width: 100%"><div class="row">`;
    for(i=0; i<respuesta.length; i++) {
        myTable+=`
            <div class="card m-2" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${respuesta[i].name}</h5>
                    <p class="card-text">${respuesta[i].department}</p>
                    <p class="card-text">Año ${respuesta[i].year}</p>
                    <p class="card-text">${respuesta[i].description}</p>
                    <p class="card-text">${respuesta[i].specialty.name}</p>
                    <div align="centre">
                        <button class="btn btn-success" onclick="eliminarDoctor(${respuesta[i].id})">Borrar</button>
                        <button class="btn btn-success" onclick="cargarDoctor(${respuesta[i].id})">Cargar</button>
                    </div>
                </div>
            </div>`;   
         
    }
    myTable+=`</div></div>`;
    $("#resultadosDoctor").html(myTable);
    
    /**let myTable="<table border=1>";

    myTable+="<thead>";
    myTable+="<TR>";
    myTable+="<th>"+"Nombre"+"</th>";
    myTable+="<th>"+"Departamento"+"</th>";
    myTable+="<th>"+"Año"+"</th>";
    myTable+="<th>"+"Descripcion"+"</th>";
    myTable+="<th>"+"Especialidad"+"</th>";
    myTable+="</TR>";
    myTable+="</thead>";
   
    for(i=0; i<respuesta.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].department+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].specialty.name+"</td>";
        myTable+="<td><button onclick='borrar("+respuesta[i].id+")'>Borrar</button></td>";
        myTable+="<td><button onclick='cargar("+respuesta[i].id+")'>Cargar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultados").html(myTable);**/
}

function guardarDoctor(){
    let var2 = {
        name:$("#nameDoctor").val(),
        department:$("#departmentDoctor").val(),
        year:$("#yearDoctor").val(),
        description:$("#descriptionDoctor").val(),
        specialty:{"id":$("#specialtyDoctor").val()}
    };
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:8080/api/Doctor/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            //limpiarFormulario();
            consultarDoctor();
        },
        error:function(jqXHR, textStatus, errorTrown){
            window.location.reload();
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormularioDoctor(){
    $("#nameDoctor").val("");
    $("#departmentDoctor").val("");
    $("#yearDoctor").val("");
    $("#descriptionDoctor").val("");
    $("#specialtyDoctor").val("");
}

$(document).ready(function(){
    consultarDoctor();
});