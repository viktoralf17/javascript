var JsFileCompiled = function(ws) {
    this.myWorker = ws;
    this.result = "";
    this.js = [];
    this.jsXhr = [];
};
JsFileCompiled.prototype.init = function() {}
JsFileCompiled.prototype.addJsXrh = function(file) {
    this.jsXhr.push(file)
};
/*
 *	Compila todas la informacion
 */
JsFileCompiled.prototype.compile = function() {
    //load js xhr
    this.jsXhr.forEach((el, i) => {

        var req = new XMLHttpRequest();
        req.open('GET', 'https://cors-anywhere.herokuapp.com/' + el, false);
        req.send(null);
        if (req.status == 200) {
            this.js[i] = req.responseText;
        }
    })
    // compile js
    this.js.forEach((el, i) => {
        this.result += "//" + i + "\n" + el;
    })
}

var js = new JsFileCompiled(self);
js.myWorker.postMessage("Init");
js.myWorker.onmessage = (event) => {
    switch (event.data.action) {
        case "add":
            js.addJsXrh(event.data.src);
            break;
        case "run":
            js.compile(event.data.src);
            js.myWorker.postMessage({
                response: js.result,
                status: 200
            });
            break;
    }
};
