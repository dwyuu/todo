(function(){
    'use strict';
    function Model(storage){
        this.Storage = storage;
        this.List = new List(this.Storage);      
    };

    // todo LIST MODEL
    function List(storage){
        this.Storage = storage;
        this.storage_obj = this.Storage.retreive_storage();
        // if this storage object is empty, initialize this
        if (Object.keys(this.storage_obj)==0) this.initialization();
    }
    // functions

    List.prototype.initialization = function(){
        this.storage_obj = {"TODOS": []};
        this.Storage.save(this.storage_obj);
    }

    List.prototype.task_add = function(data){
        this.storage_obj.TODOS.push(new Todo(data));
        this.Storage.save(this.storage_obj);
    }

    List.prototype.task_edit = function(data){
        let idx = this.identify(data.id);
        this.storage_obj.TODOS[idx] = data;
        this.Storage.save(this.storage_obj);
    }

    List.prototype.task_remove = function(id){
        let idx = this.identify(id);
        this.storage_obj.TODOS.splice(idx, 1);
        this.Storage.save(this.storage_obj);
    }

    List.prototype.identify = function(id){
        for (let i = 0; i < this.storage_obj.TODOS.length; i++) {
            if (this.storage_obj.TODOS[i].id == parseInt(id)) return i;
        }
    }

    List.prototype.return_todo = function(id){
        let idx = this.identify(id);
        return this.storage_obj.TODOS[idx];
    }

    // TODO MODEL
    function Todo(data){
        this.id = data.id;
        this.text = data.text;
        this.time_consuming = data.time_consuming;
        this.emergence = data.emergence;
    }

    Todo.prototype.edit = function(data){
        this.text = data.text;
        this.time_consuming = data.time_consuming;
        this.emergence = data.emergence;
    }


    
    window.app = window.app || {};
    window.app.Model = Model;

}());