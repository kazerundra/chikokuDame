cc.Class({
    extends: cc.Component,

    properties: {
       Retry:{
            default:null,
            type:cc.Button,
        },
    },

    // use this for initialization
    onLoad: function () {

    },
    gamestart: function(){
        cc.log("gamestart");
        cc.director.loadScene("Game.fire");
    },
    tittle: function(){
        cc.log("gamestart");
        cc.director.loadScene("TittleScreen.fire");
    },
    next: function(){
        cc.log("gamestart");
        cc.director.loadScene("Stage2.fire");
    },

});
