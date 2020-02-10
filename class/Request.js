class ImageCustom () { 
    this.images = [];
    this.imagesFinish = [];
    this.enableExtension = ["jpeg","png","jpg"];
 
}

ImageCustom.prototype.convertUrl = function(url){
    if (!url.startsWith('/')) {
        var url =  url.indexOf(self.location.host) > 0 ? url : 'https://cors-anywhere.herokuapp.com/' + url ;
    }else{
        url = self.location.host + url;
    }

    return url;
}

ImageCustom.prototype.addImage = function(url){
    this.images.push(url);
}

ImageCustom.prototype.run = function(){
    this.images.forEach( function(e,idx,array){ 
        if (this.enableExtension.indexOf( e.ext )) {
            
            url = this.convertUrl( e.src );
            var xhr2 = new XMLHttpRequest();
            xhr2.onload = function() {
                console.log(xhr2.response)
            };
            xhr2.open('GET', url);
            xhr2.responseType = 'blob';
            xhr2.withCredentials = true;
            //xhr2.setRequestHeader('Content-Type', 'text/plain');
            xhr2.send();

        }

        toDataURL(e.src,(srcBlob) => {
            if (e.ext == "jpg" || e.ext == "jpeg" || e.ext == "png" ) {
              e.src = srcBlob;
            }
            contFinish.push(e);
           
           if (idx === array.length - 1){ 
              pushContFinish()
           }
        });
    });
}

// =============


var cont = [];
var contFinish = [];

function toDataURL(url, callback) {
  
  if (!url.startsWith('/')) {
    var url =  url.indexOf(self.location.host) > 0 ? url : 'https://cors-anywhere.herokuapp.com/' + url ;
  }
  

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
      img = reader.result;
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url, false);
  xhr.responseType = 'blob';
  xhr.send();
}
function pushContFinish(){
  postMessage(contFinish);
}

//self.importScripts('/js/jquery-1.11.1.min.js')
self.addEventListener('message', function(e) {
    
  let data =  e.data;
    switch (data.action) {
        case 'img':
        cont.forEach( function(e,idx,array){ 
            toDataURL(e.src,(srcBlob) => {
                if (e.ext == "jpg" || e.ext == "jpeg" || e.ext == "png" ) {
                  e.src = srcBlob;
                }
                contFinish.push(e);
               
               if (idx === array.length - 1){ 
                  pushContFinish()
               }
            });
        });

        //console.log(contFinish[0].src);
        //console.log(cont[0]);
            break;
    case 'js':
        loadJs()
        postMessage(data.src);
      break;
    case 'add':
      cont.push(data);
      break;
    }
  //self.postMessage(e.data);
}, false);


// evitar bloque
url = 'http://dev.viajemos.viajemosdev.info/skin/frontend/viajemos/default/assets/css/bootstrap.min.css?version=102';
url = 'http://dev.viajemos.viajemosdev.info/skin/frontend/viajemos/default/assets/css/bootstrap.min.css?version=102';
var xhr2 = new XMLHttpRequest();
xhr2.onload = function() {
    console.log(xhr2.response)
};
xhr2.open('GET', url);
  xhr2.responseType = 'blob';
xhr2.withCredentials = true;
//xhr2.setRequestHeader('Content-Type', 'text/plain');
xhr2.send();