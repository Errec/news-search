var newsArr = []; // Global arr variable to hold the json data

function requestData(url, methodType){
  var promise = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.send();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
         if(xhr.status === 200){
          var resp = xhr.responseText;
          var respJson = JSON.parse(resp);
          resolve(respJson);
         } else{
            reject(xhr.status);
            console.log("xhr failed");
           }
      } else{
         console.log("xhr processing going on");
         }
    };
  });
  return promise;
}

function errorHandler(statusCode){
  alert("Falha no servidor: status " + statusCode +  "\nTente novamente mais tarde.");
}
