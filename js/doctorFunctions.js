var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar



function editar(){

    var elemento={
        "id":idCarga,
        "name":$("#name").val(),
        "department":$("#department").val(),
        "year":$("#year").val(),
        "description":$("#description").val(),
        "specialty":{"id":$("#specialty").val()}
    };
    
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://129.151.116.109:8080/api/Doctor/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormulario();
            consultar();
            idCarga=null;
        }
    });
}

function eliminar(idElemento){
    var elemento={
        "id":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://129.151.116.109:8080/api/Doctor/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultar();
        }
    });
}




function cargar(idItem){
    $.ajax({    
        url : "http://129.151.116.109:8080/api/Doctor/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json);
  
          $("#name").val(json.name);
          $("#department").val(json.department);
          $("#year").val(json.year);
          $("#description").val(json.description);
          $("#specialty").val(json.specialty.id);
          idCarga = idItem;
          console.log("idCarga es " +idCarga);
        }
    });
}

//////------------------


function consultar(){
    $.ajax({
        url:"http://129.151.116.109:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){
   
    let myTable="<table border=1>";

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
    $("#resultados").html(myTable);
}

function guardar(){
    let var2 = {
        name:$("#name").val(),
        department:$("#department").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        specialty:{"id":$("#specialty").val()}
    };
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://129.151.116.109:8080/api/Doctor/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            limpiarFormulario();
            consultar();
        },
        error:function(jqXHR, textStatus, errorTrown){
            window.location.reload();
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormulario(){
    $("#name").val("");
    $("#department").val("");
    $("#year").val("");
    $("#description").val("");
    $("#specialty").val("");
}