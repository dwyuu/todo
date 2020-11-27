(function(){
    'use strict';
    function View(){
        this.$add_button = document.getElementById("add_button");
        this.$task_add = document.getElementById("task_add");
        this.$task_cancel = document.getElementById("task_cancel");
        this.$task_edit = document.getElementById("task_edit");
        this.$task_remove = document.getElementById("task_remove");
        this.$text = document.getElementById("subject");
        this.$emergence = document.getElementById("emergence");
        this.$time_consuming = document.getElementById("time_consuming");
        this.$e_text = document.getElementById("e_subject");
        this.$e_emergence = document.getElementById("e_emergence");
        this.$e_time_consuming = document.getElementById("e_time_consuming");

        this.$modal_add = document.getElementById("modal_add");
        this.$modal_edit = document.getElementById("modal_edit");
        this.$overlay = document.getElementById("overlay");

        this.$task_holder = document.getElementById("task_holder");
        this.id = null;
    }

    View.prototype.event = function(key, callback, id){
        let self = this;
        switch (key) {
            case "add":
                self.$add_button.addEventListener("click", callback)
                break;

            case "task_add":
                self.$task_add.addEventListener("click", function(){
                    callback({"text": self.$text.value, "emergence": self.$emergence.value, "time_consuming": self.$time_consuming.value})
                })
                break;

            case "task_cancel":
                self.$task_cancel.addEventListener("click", callback)
                break;

            case "edit":
                let $task = document.getElementById(id);
                $task.addEventListener("click", function(){
                    callback($task.id)
                })
                break;

            case "task_edit":
                self.$task_edit.addEventListener("click", function(){
                    callback({"id": self.id, "text": self.$e_text.value, "emergence": self.$e_emergence.value, "time_consuming": self.$e_time_consuming.value})
                })
                break;

            case "task_remove":
                self.$task_remove.addEventListener("click", function(){
                    callback(self.id);
                })
                break;                                           
            default:
                break;
        }
    }

    View.prototype.task_html_bulider = function(data){
        let html = `        
        <div class="task" id="${data.id}" style="top: ${100 - data.emergence}%; left: ${data.time_consuming}%">
            <p class="task_subject" id="t_${data.id}">${data.text}</p>
        </div>`
        return html;
    }

    View.prototype.add = function(){
        this.$modal_add.style.display = "flex";
        this.$overlay.style.display = "flex";
        this.$text.focus();
        this.$text.value = "";
        this.$emergence.value = 50;
        this.$time_consuming.value = 50;
    }

    View.prototype.task_add = function(data){
        this.$modal_add.style.display = "none";
        this.$overlay.style.display = "none";
        let $div = document.createElement("div");
        $div.innerHTML = this.task_html_bulider(data);
        this.$task_holder.appendChild($div)

    }

    View.prototype.task_cancel = function(){
        this.$modal_add.style.display = "none";
        this.$overlay.style.display = "none";
    }

    View.prototype.edit = function(id){
        this.id = id;
        this.$modal_edit.style.display = "flex";
        this.$overlay.style.display = "flex";
        this.$e_text.focus()
    }
    
    View.prototype.task_edit = function(data){
        this.$modal_edit.style.display = "none";
        this.$overlay.style.display = "none";
        let $t = document.getElementById(data.id);
        let $p = document.getElementById("t_" + data.id)
        $t.style.top = 100 - data.emergence + "%";
        $t.style.left = data.time_consuming + "%";
        $p.innerText = data.text;
    }
    
    View.prototype.task_remove = function(id){
        this.$modal_edit.style.display = "none";
        this.$overlay.style.display = "none";
        document.getElementById(id).remove()
    }


    window.app = window.app || {};
    window.app.View = View;

}());