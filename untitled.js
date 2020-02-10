  var db;

  function openDb(DB_NAME, DB_VERSION, DB_STORE_NAME) {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION, DB_STORE_NAME);
    
    req.onsuccess = function (evt) {
      db = this.result;
      console.log("openDb DONE");
    };

    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
      console.log(evt)
      // var store = evt.currentTarget.result.createObjectStore( DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      // store.createIndex('name', 'name', { unique: true });
      // store.createIndex('value', 'value', { unique: false });
    };
    console.log(req)

  }

  /**
   * @param {string} store_name
   * @param {string} mode either "readonly" or "readwrite"
   */
  function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
  }

  function getBlob(key, store, success_callback) {
    var req = store.get(key);
    req.onsuccess = function(evt) {
      var value = evt.target.result;
      if (value)
        success_callback(value.blob);
    };
  }

  openDb("cache-viajemos", "1.0", "publications")
  //var tx = db.transaction("publications", "readwrite");

  // console.log(db)
  // var store = getObjectStore("publications", 'readonly');
  // var store2 = getObjectStore("publications", 'readwrite');
  // var obj = { name: "bla", value: "title" };

  // store2.add(obj)
  // getBlob(key, store, function(blob) {
  //   console.log(blob)
  // });


  // console.log(db)