var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar


function editarDoctor(){

    var elemento={
        "id":idCarga,
        "name":$("#nameDoctor").val(),
        "department":$("#departmentDoctor").val(),
        "year":$("#yearDoctor").val(),
        "description":$("#descriptionDoctor").val(),
        "specialty":{"id":window.doctorI}
    };
    
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
        data: dataToSend,
        url: 'http://localhost:1010/api/Doctor/update',
        type: 'PUT',
        contentType:'application/json',
      
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormularioDoctor();
            consultarDoctorI();
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
        
        url : "http://localhost:1010/api/Doctor/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultarDoctorI();
        }
    });
}

function cargarDoctor(idItem){
    $.ajax({    
        url : "http://localhost:1010/api/Doctor/"+idItem,
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

function consultarDoctorI(){
    $.ajax({
        url:"http://localhost:1010/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaDoctor(respuesta);
        }
    });
}

function pintarRespuestaDoctor(respuesta){


    let myTable=`<div class="container" style="width: 100%;"><div class="row">`;
    for(i=0; i<respuesta.length; i++) {
        myTable+=`
            <div class="card m-2" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title"><b>${respuesta[i].name}</b></h5>
                    <p class="card-text">${respuesta[i].department}</p>
                    <p class="card-text">${respuesta[i].year}</p>
                    <p class="card-text">${respuesta[i].description}</p>
                    <p class="card-text">${respuesta[i].specialty.name}</p>
                    
                    <div align="centre">
                        <button class="btn btn-success" onclick="eliminar(${respuesta[i].idClient})">Borrar</button>
                        <button class="btn btn-success" onclick="cargar(${respuesta[i].idClient})">Cargar</button>
                    </div>
                </div>
            </div>`;   
         
    }
    myTable+=`</div></div>`;
    
    $("#resultadosDoctorI").html(myTable);
}

function guardarDoctor(){
    let var2 = {
        name:$("#nameDoctor").val(),
        department:$("#departmentDoctor").val(),
        year:$("#yearDoctor").val(),
        description:$("#descriptionDoctor").val(),
        specialty:{"id":window.doctorI}
    };
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:1010/api/Doctor/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            limpiarFormularioDoctor();
            consultarDoctorI();
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
    consultarDoctorIC();
    consultarDoctorI();
});

// funciones combo box Doctor 1(consulta) 2(llenado Option) 3(declaracion variable global Doctor)

function consultarDoctorIC(){
    $.ajax({
        url:"http://localhost:1010/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            comboBoxDoctorI(respuesta);
        }
    });
}
    function comboBoxDoctorI(respuesta){
        let myOption='<select name= DoctoresI id=DoctoresI class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">'
                myOption+="<option value="+0+">"+"Seleccione Especialidad"+"</option>";
            for(i=0; i<respuesta.length; i++) {
                myOption+="<option value="+respuesta[i].id+">"+respuesta[i].name+"</option>";
             }
        myOption+="</select>";
        $("#comboDoctorI").html(myOption);
        
        
    }

    function fillBookDoctorI(document){    
        var first_select = document.getElementById('DoctoresI').value;
        
        console.log('Especialidad select -> '+first_select);
        window.doctorI=first_select; 
     }

