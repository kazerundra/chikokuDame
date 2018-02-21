cc.Class({
    extends: cc.Component,

    properties: {
    Start:{
            default:null,
            type:cc.Button,
        },
    Jump:{
            default:null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.Jump.getComponent('animation').jump();

    },
    
    tutorial: function(){
        cc.log("gamestart");
        cc.director.loadScene("Tutorial.fire");
    },

});
