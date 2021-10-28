var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar



function editar(){

    var elemento={
        "idAdmin":idCarga,
        "name":$("#name").val(),
        "email":$("#email").val(),
        "password":$("#password").val()
    };
    
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://129.151.116.109:8080/api/Admin/update',
        
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
        "idAdmin":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://129.151.116.109:8080/api/Admin/"+idElemento,
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
        url : "http://129.151.116.109:8080/api/Admin/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json);

                var misItems=json.items;
  
          $("#name").val(json.name);
          $("#email").val(json.email);
          $("#password").val(json.password);
          idCarga = idItem;
          console.log("idCarga es " +idCarga);
          
  
  
        }
    });
}

//////------------------


function consultar(){
    $.ajax({
        url:"http://129.151.116.109:8080/api/Admin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){
    let myTable="<table border='1'>";

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
    $("#resultados").html(myTable);
}

function guardar(){
    let var2 = {
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val()
    };
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://129.151.116.109:8080/api/Admin/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            limpiarFormulario();
            consultar();
        },
        error:function(jqXHR, textStatus, errorTrown){
            
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormulario(){
    $("#name").val("");
    $("#email").val("");
    $("#password").val("");
}