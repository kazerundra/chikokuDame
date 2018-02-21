cc.Class({
    extends: cc.Component,

    properties: {
        trashnumber: 0,
    },

    // use this for initialization
    onLoad: function () {

    },
    trashup:function(){
        var anim= this.node.getComponent(cc.Animation);
        anim.play('trashup');
    },
    trashdown:function(){
        var anim= this.node.getComponent(cc.Animation);
        anim.play('trashdown');
        cc.log('trashisdown');
    },
});
