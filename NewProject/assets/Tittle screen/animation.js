cc.Class({
    extends: cc.Component,

    properties: {
    },
    jump:function(){
        var anim= this.node.getComponent(cc.Animation);
        var jump = cc.moveBy(2,cc.p(-800,200));
        var jumpdown = cc.moveBy(20,cc.p(-100,-100));
        var seq = cc.sequence(jump,jumpdown);
        this.node.runAction(seq);
    },
});
