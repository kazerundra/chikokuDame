cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // use this for initialization
    onLoad: function () {

    },

    gamestart: function(){
        cc.log("gamestart");
        cc.director.loadScene("Game.fire");
    },
    
});
