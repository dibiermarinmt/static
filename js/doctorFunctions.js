var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar



function editarDoctor(){

    var elemento={
        "id":idCarga,
        "name":$("#nameDoctor").val(),
        "department":$("#departmentDoctor").val(),
        "year":$("#yearDoctor").val(),
        "description":$("#descriptionDoctor").val(),
        "specialty":{"id":window.Especialidades.options[window.Especialidades.selectedIndex].value}
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
          //$("#specialtyDoctor").val(json.specialty.id);
          window.Especialidades.selectedIndex= json.specialty.id;
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
}

function guardarDoctor(){
    let var2 = {
        name:$("#nameDoctor").val(),
        department:$("#departmentDoctor").val(),
        year:$("#yearDoctor").val(),
        description:$("#descriptionDoctor").val(),
        specialty:{"id":window.Especialidades.options[window.Especialidades.selectedIndex].value}
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
    //$("#specialtyDoctor").val("");
    window.Especialidades.selectedindex = 0;
}


function consultarSpecialtyDoctor(){
    $.ajax({
        url:"http://localhost:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            comboBoxSpecialty(respuesta);
        }
    });
}

//se llena el combo box de Doctor

    function comboBoxSpecialty(respuesta){
        let myOption='<select  class="form-control m-3" name=Especialidades id="Especialidades">';
                myOption+="<option value="+0+">"+"Seleccione Especialidad"+"</option>";
            for(i=0; i<respuesta.length; i++) {
                myOption+="<option value="+respuesta[i].id+">"+respuesta[i].name+"</option>";

            }
        myOption+="</select>";
        $("#comboSpecialty").html(myOption);

    }

//se obtiene el id del cliente seleccionado del combo box

    /**function fillBookDoctor(document){    
        var first_select = document.getElementById('Especialidades').value;
        console.log('Especialidad select -> '+first_select);
        window.doctorMessage=first_select; 
     }**/


$(document).ready(function(){
    consultarDoctor();
    consultarSpecialtyDoctor();
});