

class CustomSessionStorage {

    constructor(sessionStorage,keySessionSotorage = "__ey", lastVersion="1.0.0",clear =  false) {
    	this.sessionStorage = sessionStorage;
    	this.version = lastVersion;
    	this.key = keySessionSotorage;
    	this.prefix = "__." + this.key;
        this.init();
    }

}

CustomSessionStorage.prototype.init =  function(){
	this.browserSupport();
	this.validationVersion();

}

CustomSessionStorage.prototype.set = function(itemName,value){
	return this.sessionStorage.setItem(itemName,value);
}

CustomSessionStorage.prototype.get = function(itemName){
	return this.sessionStorage.getItem(itemName);

}

CustomSessionStorage.prototype.browserSupport = function(){
	this.support =  true;
	return this.support;
}

CustomSessionStorage.prototype.validationVersion =  function(){

	var version = ( this.get( this.key ) == null ) ? this.set(this.key,this.version) : this.get( this.key ); ;

	if (version != this.version ) {
		this.sessionStorage.clear();
		this.set(this.key, this.version)
		
	}

}