var character = document.getElementById("character");
var block = document.getElementById("block");
var counter=0;
function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },300);
}
var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
        block.style.animation = "none";
        alert("Game Over. score: "+Math.floor(counter/100));
        counter=0;
        block.style.animation = "block 1s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);

/* Werkende menu waar je alles kan klikken*/
(function(){
    function $(selector, context){
        context = context || document;
        return context["querySelectorAll"](selector);
    }

    function forEach(collection, iterator){
        for(var key in Object.keys(collection)){
            iterator(collection[key]);
        }
    }

    function showMenu(menu){
        var menu = this;
        var ul = $("ul", menu)[0];

        if(!ul || ul.classList.contains("-visible")) return;

        menu.classList.add("-active");
        ul.classList.add("-animating");
        ul.classList.add("-visible");
        setTimeout(function(){
            ul.classList.remove("-animating")
        }, 25);
    }

    function hideMenu(menu){
        var menu = this;
        var ul = $("ul", menu)[0];

        if(!ul || !ul.classList.contains("-visible")) return;

        menu.classList.remove("-active");
        ul.classList.add("-animating");
        setTimeout(function(){
            ul.classList.remove("-visible");
            ul.classList.remove("-animating");
        }, 300);
    }

    function hideAllInactiveMenus(menu){
        var menu = this;
        forEach(
            $("li.-hasSubmenu.-active:not(:hover)", menu.parent),
            function(e){
                e.hideMenu && e.hideMenu();
            }
        );
    }

    window.addEventListener("load", function(){
        forEach($(".Menu li.-hasSubmenu"), function(e){
            e.showMenu = showMenu;
            e.hideMenu = hideMenu;
        });

        forEach($(".Menu > li.-hasSubmenu"), function(e){
            e.addEventListener("click", showMenu);
        });

        forEach($(".Menu > li.-hasSubmenu li"), function(e){
            e.addEventListener("mouseenter", hideAllInactiveMenus);
        });

        forEach($(".Menu > li.-hasSubmenu li.-hasSubmenu"), function(e){
            e.addEventListener("mouseenter", showMenu);
        });

        document.addEventListener("click", hideAllInactiveMenus);
    });
})();
