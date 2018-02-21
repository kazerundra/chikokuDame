cc.Class({
    extends: cc.Component,

    properties: {
        //主人公
        hero:{
            default:null,
            type:cc.Node,
        },
        women0:{
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
        this.ayamarunumber=0;
        this.minigamenumber=0;
        this.minigametype=0;
        this.trashUpOk=0;
        this.movebackground();
        this.disableaction();
    },
  
    
    update: function(){
        //エンディング決める
        if(this.hero.getComponent('Hero').finish== 1){
            if(this.hero.getComponent('Hero').trashHit >= 6){
            cc.director.loadScene("trashEnding.fire");
            } else if(this.hero.getComponent('Hero').trashHit >= 3 || this.hero.getComponent('Hero').womanHit >= 2){
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
        if(this.ayamarunumber>=5){
            this.minigameover();
            this.ayamarunumber=0;
        }   
        //ジャンプ中にジャンプボタンを使うことができない
        if (this.hero.getComponent('Hero').jumpCondition==1){
            cc.log('disablejump');
            this.disablejump();
            this.scheduleOnce(this.enablejump,1.4);
        }
        if(this.trashUpOk===1 && this.trash1.getComponent('Trash').trashnumber===0){
            this.trashUpOk=0
            this.trash1.getComponent('Trash').trashnumber=1;
            this.trash1.getComponent('Trash').trashup();
        }
        if(this.trashUpOk===1 && this.trash2.getComponent('Trash').trashnumber===0){
            this.trashUpOk=0
            this.trash2.getComponent('Trash').trashnumber=1;
            this.trash2.getComponent('Trash').trashup();
        }
    },

    //ミニゲーム時他の動きを止める
    minigame: function(){
        cc.log("minigamestart");
        this.node.stopAllActions();
        this.enableaction();
        this.minigamenumber=0;
        if(this.hero.getComponent('Hero').ayamaruNumber==1){
            this.hero.getComponent('Hero').ayamaruNumber=0;
            this.hero.getComponent('Hero').ayamaru();
            this.minigametype=1;
            cc.log("minigame1")
            
        } else {
        this.hero.getComponent('Hero').heropickuptrash();
        this.minigametype=2;
        cc.log("minigame2")
        }
    },
    //ミニゲーム終わったらまた走ります
    minigameover: function(){
        cc.log("minigameover");
        this.minigametype=0;
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
        if(this.minigametype==1){
        this.trashnumber++;
        }
        else if (this.minigametype==2){
        this.ayamarunumber++;
        }
        cc.log("pickuptrash");
    }
    
   
    

   
});