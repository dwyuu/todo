(function(){
    'use strict';

    function App(){
        this.storage = new app.Storage("todo");
        this.model = new app.Model(this.storage);
        this.view = new app.View();
        this.controller = new app.Controller(this.model, this.view);
    }

    let new_app = new App();
}());