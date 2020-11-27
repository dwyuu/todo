(function() {
    'use strict';
    function Store(name){
      this.db_name = name;
      if (!localStorage.getItem(name)) {
        let item = {};
        localStorage.setItem(name, JSON.stringify(item));
      }
    }
  
    Store.prototype.save = function(item){
      localStorage.setItem(this.db_name, JSON.stringify(item))
    }
  
    Store.prototype.partial_save = function(key, value){
      let item = JSON.parse(localStorage.getItem())
      item[key] = value
      localStorage.setItem(this.db_name, JSON.stringify(item))
    }
  
    Store.prototype.partial_remove = function(key){
      let item = JSON.parse(localStorage.getItem())
      delete(item[key])
      localStorage.setItem(this.db_name, JSON.stringify(item))
    }
  
    Store.prototype.retreive_storage = function(){
      return JSON.parse(localStorage.getItem(this.db_name))
    }
  
    window.app = window.app || {};
    window.app.Storage = Store;
  }());
  