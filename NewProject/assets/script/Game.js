cc.Class({
    extends: cc.Component,

    properties: {
        //主人公
        hero:{
            default:null,
            type:cc.Node,
        },
        trash1:{
            default:null,
            type:cc.Node,
        },
        trash2:{
            default:null,
            type:cc.Node,
        },
        trash3:{
            default:null,
            type:cc.Node,
        },
        trash4:{
            default:null,
            type:cc.Node,
        },
        trash5:{
            default:null,
            type:cc.Node,
        },
        trash6:{
            default:null,
            type:cc.Node,
        },
        trash7:{
            default:null,
            type:cc.Node,
        },
        trash8:{
            default:null,
            type:cc.Node,
        },
        trash9:{
            default:null,
            type:cc.Node,
        },
        //アクションボタン
        action:{
            default:null,
            type:cc.Button,
        },
        //ジャンプボタン
        jump:{
            default:null,
            type:cc.Button,
        },
        //背景/ステージ
        background:{
            default:null,
            type:cc.Node,
        },
        movespeed:5.5,
    },

    onLoad: function () {
        this.trashnumber=0;
        this.minigamenumber=0;
        this.trashUpOk=0;
        this.movebackground();
        this.disableaction();
    },
  
    
    update: function(){
        //エンディング決める
        if(this.hero.getComponent('Hero').finish== 1){
            if(this.hero.getComponent('Hero').trashHit >= 6){
            cc.director.loadScene("trashEnding.fire");
            } else if(this.hero.getComponent('Hero').trashHit >= 3){
            cc.director.loadScene("lateending.fire");
            }else cc.director.loadScene("Ending1.fire");
        }
        //ゴミ箱触ったら起動します
        if(this.hero.getComponent('Hero').touchingNumber== 1){
            this.disablejump();
            this.minigamenumber=1;
            this.scheduleOnce(this.minigame,1.3);
        }
        //ミニゲームの時何回アクションボタン押さなきゃ
        if(this.trashnumber>=5){
            this.minigameover();
            this.trashnumber=0;
            this.trashUpOk=1;
        }   
        //ジャンプ中にジャンプボタンを使うことができない
        if (this.hero.getComponent('Hero').jumpCondition==1){
            cc.log('disablejump');
            this.disablejump();
            this.scheduleOnce(this.enablejump,1.4);
        }
        if(this.trashUpOk===1 && this.trash1.getComponent('Trash').trashnumber===0){
            this.trashUpOk=0;
            this.trash1.getComponent('Trash').trashnumber=1;
            this.trash1.getComponent('Trash').trashup();
        }
        if(this.trashUpOk===1 && this.trash2.getComponent('Trash').trashnumber===0){
            this.trash2.getComponent('Trash').trashnumber=1;
            this.trash2.getComponent('Trash').trashup();
            this.trashUpOk=0;
        }
        if(this.trashUpOk===1 && this.trash3.getComponent('Trash').trashnumber===0){
            this.trash3.getComponent('Trash').trashnumber=1;
            this.trash3.getComponent('Trash').trashup();
            this.trashUpOk=0;
        }
        if(this.trashUpOk===1 && this.trash4.getComponent('Trash').trashnumber===0){
            this.trash4.getComponent('Trash').trashnumber=1;
            this.trash4.getComponent('Trash').trashup();
            this.trashUpOk=0;
        }
        if(this.trashUpOk===1 && this.trash5.getComponent('Trash').trashnumber===0){
            this.trash5.getComponent('Trash').trashnumber=1;
            this.trash5.getComponent('Trash').trashup();
            this.trashUpOk=0;
            this.takarakuji();
        }
        if(this.trashUpOk===1 && this.trash6.getComponent('Trash').trashnumber===0){
            this.trash6.getComponent('Trash').trashnumber=1;
            this.trash6.getComponent('Trash').trashup();
            this.trashUpOk=0;
        }
        if(this.trashUpOk===1 && this.trash7.getComponent('Trash').trashnumber===0){
            this.trash7.getComponent('Trash').trashnumber=1;
            this.trash7.getComponent('Trash').trashup();
            this.trashUpOk=0;
        }
        if(this.trashUpOk===1 && this.trash8.getComponent('Trash').trashnumber===0){
            this.trash8.getComponent('Trash').trashnumber=1;
            this.trash8.getComponent('Trash').trashup();
            this.trashUpOk=0;
        }
        if(this.trashUpOk===1 && this.trash9.getComponent('Trash').trashnumber===0){
            this.trash9.getComponent('Trash').trashnumber=1;
            this.trash9.getComponent('Trash').trashup();
            this.trashUpOk=0;
        }
        
    },

    //ミニゲーム時他の動きを止める
    minigame: function(){
        cc.log("minigamestart");
        this.node.stopAllActions();
        this.hero.getComponent('Hero').heropickuptrash();
        this.enableaction();
        this.minigamenumber=0;
    },
    //ミニゲーム終わったらまた走ります
    minigameover: function(){
        cc.log("minigameover");
        this.movebackground();
    },
    //走るの関数
    movebackground:function(){
        //背景を動かす
        var movebg = cc.moveBy(60,cc.p(this.movespeed*2000,0));
        this.background.runAction(movebg);
        this.hero.getComponent('Hero').run();
        //アクションボタンを制御
        this.disableaction();
        this.enablejump();
        this.node.getComponent(cc.Animation);
        
    },
    //ジャンプを制御
    disablejump: function(){
        this.jump.enabled = false;
    },
    //ジャンプをまた使えるようにする
    enablejump: function(){
        if(this.minigamenumber===0)
        this.jump.enabled = true;
    },
    //アクションを制御
    disableaction:function(){
        this.action.enabled = false;
    },
    //アクションをまた使えるようにする
    enableaction:function(){
        this.action.enabled = true;
    },
    //拾ったゴミの数を加算する
    trashpickup: function(){
        this.trashnumber++;
        cc.log("pickuptrash");
    },
    takarakuji: function(){
        this.node.stopAllActions();
        this.hero.getComponent('Hero').takaraget();
        this.scheduleOnce(this.takaraending,3.5);
    },
    takaraending: function(){
        cc.director.loadScene("takaraending.fire");
    },
   
    

   
});
