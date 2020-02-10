const storageCache = new CustomSessionStorage(sessionStorage,"__v_cache","1.0.0.1");

// get element cache css
document.querySelectorAll('[data-class="cache"]').forEach( (element, index) => {
	
	// set data
	if ( fileCache = storageCache.get(element.dataset.href) ) {
		var blob = new Blob([ fileCache ], {type: 'stylesheet'});
		var url = URL.createObjectURL(blob);
		element.href = url;
		
	}else{

        var xhr2 = new XMLHttpRequest();
        xhr2.onload = function() {
			storageCache.set(element.dataset.href, xhr2.response);
        };
        xhr2.open('GET', element.dataset.href);
        xhr2.responseType = 'text';
        xhr2.withCredentials = true;
        //xhr2.setRequestHeader('Content-Type', 'text/plain');
        xhr2.send();
	}

});