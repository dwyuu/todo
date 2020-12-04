(function(){
    'use strict';

    function Controller(model, view){
        this.model = model;
        this.view = view;
        this.events();
        this.mirror_storage();
    }

    Controller.prototype.events = function(){
        let self = this;
        self.view.event("add", function(){
            self.add()
        });
        self.view.event("task_add", function(data){
            self.task_add(data);
        });
        self.view.event("task_cancel", function(){
            self.task_cancel();
        });
        self.view.event("task_edit", function(data){
            self.task_edit(data);
        });
        self.view.event("task_remove", function(id){
            self.task_remove(id);
        });
    }

    Controller.prototype.mirror_storage = function(){
        let self = this;
        let todos = self.model.List.storage_obj.TODOS;
        if (todos === []) return;
        for (let i = 0; i < todos.length; i++) {
            let promise = new Promise((fullfill, reject) => {
                self.view.task_add(todos[i]);
                fullfill()
            });
            const fullfilled = () => {
                self.view.event("edit", function(id){
                    self.edit(id);
                }, todos[i].id)
                console.log("fullfill")
            };
            promise.then(fullfilled);        
        }
    }

    Controller.prototype.add = function(){
        this.view.add();
    }

    Controller.prototype.task_add = function(data){
        if(data.text === "") return;
        let self = this;
        data.id = new Date().getTime();
        let promise = new Promise((fullfill, reject) => {
            self.view.task_add(data);
            self.model.List.task_add(data);
            fullfill()
        });
        const fullfilled = () => {
            self.view.event("edit", function(id){
                self.edit(id);
            }, data.id)
            console.log("fullfill")
        };
        promise.then(fullfilled);
    }

    Controller.prototype.task_cancel = function(){
        this.view.task_cancel();
    }

    Controller.prototype.edit = function(id){
        this.view.edit(this.model.List.return_todo(id));
    }

    Controller.prototype.task_edit = function(data){
        if(data.text === "") return;
        this.view.task_edit(data)
        this.model.List.task_edit(data);
    }

    Controller.prototype.task_remove = function(id){
        this.view.task_remove(id)
        this.model.List.task_remove(id);
    }





    window.app = window.app || {};
    window.app.Controller = Controller;

}());