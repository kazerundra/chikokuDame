cc.Class({
    extends: cc.Component,

    properties: {
        

    },

    // use this for initialization
    onLoad: function () {
        this.enemymoveright();

    },
    //敵自動に右に動く
    enemymoveright:function(){
        var move= cc.moveBy(220,cc.p(2017,0));
        this.node.runAction(move);
        var anim= this.node.getComponent(cc.Animation);
        anim.play('womenwalk');
         
    },
    //敵動くを止めってセリフを話す
    enemystop:function(){
        this.node.stopAllActions();
        var anim= this.node.getComponent(cc.Animation);
        anim.play('labelanimation');
    },
    
    enemyangry:function(){
        var anim= this.node.getComponent(cc.Animation);
        anim.play('womenangry');
        this.node.stopAllActions();
        
    }
});
