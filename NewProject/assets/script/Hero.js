cc.Class({
    extends: cc.Component,

    properties: {
        trash:{
            default:null,
            type:cc.Prefab,
        },
        background:{
            default:null,
            type:cc.Node,
        },
        jumpspeed:1.8,
        jumpheight:125,
 
    },

    onLoad: function () {
        //collision機能
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        //敵と触るの変数
        this.touchingNumber = 0;
        //何回謝った
        this.ayamaruNumber = 0;
        this.jumpCondition =0;
        this.finish= 0;
        this.trashHit= 0;
        this.womanHit=0;
    },
    //heroと敵触ったら起動
    onCollisionEnter: function(other, self){
        cc.log("hit");
        if (other.node.group === "trash"){
            this.touchingNumber=1;
            this.trashHit++;
            other.getComponent('Trash').trashdown();
            other.getComponent('Trash').trashnumber=0;
            cc.log("trashfall");
        }
        else if (other.node.group === "enemy") {
            cc.log("women");
            this.touchingNumber=1;
            other.getComponent('Women').enemyangry();
            this.womanHit++;
            this.ayamaruNumber=1;
        }
        else if (other.node.group === "goal") {
            cc.log("finish");
            this.finish++;
        }
    },
    
    //heroと敵collision終わり
    onCollisionExit: function (other, self) {
        cc.log(other.node.group + "," + self.node.group);
        if (other.node.group === "trash" ||other.node.group === "enemy") {
            this.touchingNumber=0;
        }
        
    },
    touchingminus:function(){
        this.touchingNumber--;
    },
    
    //謝るの関数
    jump:function(){
        var anim= this.node.getComponent(cc.Animation);
        anim.play('herojump');
        var jump = cc.moveBy(this.jumpspeed,cc.p(0,this.jumpheight));
        var jumpdown = cc.moveBy(this.jumpspeed,cc.p(0,-this.jumpheight));
        var delay = cc.delayTime(0.1);
        var runagain = cc.callFunc(this.run,this)
        var seq = cc.sequence(jump,delay,jumpdown,runagain);
        this.node.runAction(seq);
        this.cannotjump();
        this.scheduleOnce(this.canjump,this.jumpspeed);
    },
    run:function(){
        var anim= this.node.getComponent(cc.Animation);
        anim.play('heromove');
    },
    canjump:function(){
        this.jumpCondition=0
    },
    cannotjump:function(){
        this.jumpCondition=1
    },
    
    heropickuptrash:function(){
        this.node.stopAllActions();
        var anim= this.node.getComponent(cc.Animation);
        anim.play('heropickuptrash');
    },
    ayamaru:function(){
        this.node.stopAllActions();
        var anim= this.node.getComponent(cc.Animation);
        anim.play('ayamaru');
    },
    takaraget:function(){
        this.node.stopAllActions();
        var anim= this.node.getComponent(cc.Animation);
        anim.play('takarakuji');
    },
    // onCollisionFinish: function(other, self){
    //     cc.log("finish");
    //     this.finish++;
        
    // },
  
});
