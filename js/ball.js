(function(global){
    var debugFlag = false;

    if(debugFlag === false){
        console.log = function(){};
    }

    var Ball = function(clientWidth, clientHeight, size){
        this.color = {
            red: _.random(0, 255),
            green: _.random(0, 255),
            blue: _.random(0, 255),
            alpha: _.random(0, 255)
        };

        this.width = _.random(1, size);
        this.height = this.width;

        this.boundAreaTop = 0 + (this.height / 2);
        this.boundAreaBottom = clientHeight - (this.height / 2);
        this.boundAreaLeft = 0 + (this.width / 2);
        this.boundAreaRight = clientWidth - (this.width / 2);

        this.boundInitPos = {
            top: 0 + (this.height / 2),
            right: clientWidth - (this.width / 2),
            bottom: clientHeight - (this.height / 2),
            left: 0 + (this.width / 2)
        };

        this.left = _.random(this.boundAreaLeft, this.boundAreaRight);
        this.top = _.random(this.boundAreaTop, this.boundAreaBottom);

        this.directionX = _.random(0, 1) * 2 - 1;
        this.directionY = _.random(0, 1) * 2 - 1;

        this.directionXValue = _.random(1, 5);
        this.directionYValue = _.random(1, 5);
    };

    Ball.prototype = {
        color: null,

        width: null,
        height: null,

        boundInitPos: null,

        boundTop: null,
        boundBottom: null,
        boundLeft: null,
        boundRight: null,

        left: null,
        top: null,

        directionX: null,
        directionY: null,

        conflictArea: {},

        move: function(block){
            this.left += this.directionXValue * this.directionX;
            this.top += this.directionYValue * this.directionY;

            if(block){
                this.judgeConflictWall();
                this.judgeConflictBlock(block);
            }
        },

        judgeConflictWall: function(){

            if(this.left < this.boundAreaLeft){
                this.directionX = this.directionX * -1;
                this.left = this.boundAreaLeft;
            }

            if(this.left > this.boundAreaRight){
                this.directionX = this.directionX * -1;
                this.left = this.boundAreaRight;
            }

            if(this.top < this.boundAreaTop){
                this.directionY = this.directionY * -1;
                this.top = this.boundAreaTop;
            }

            if(this.top > this.boundAreaBottom){
                this.directionY = this.directionY * -1;
                this.top = this.boundAreaBottom;
            }

        },

        judgeConflictBlock: function(block){
            this.conflictArea.top = this.top - (this.height / 2);
            this.conflictArea.bottom = this.top + (this.height / 2);
            this.conflictArea.left = this.left - (this.width / 2);
            this.conflictArea.right = this.left + (this.width / 2);

            if(block.isTopConflict(this.conflictArea)){
                this.directionY = this.directionY * -1;
                this.top = block.point.top - this.height;
            }

            if(block.isBottomConflict(this.conflictArea)){
                this.directionY = this.directionY * -1;
                this.top = block.point.bottom + this.height;
            }

            if(block.isLeftConflict(this.conflictArea)){
                this.directionX = this.directionX * -1;
                this.left = block.point.left - this.width;
            }

            if(block.isRightConflict(this.conflictArea)){
                this.directionX = this.directionX * -1;
                this.left = block.point.right + this.width;
            }
        },

        draw: function(){
            noStroke();
            fill(this.color.red, this.color.green, this.color.blue, this.color.alpha);
            ellipse(this.left, this.top, this.width, this.height);

            DebugDraw(this.conflictArea.top, this.conflictArea.right, this.conflictArea.bottom, this.conflictArea.left);
        }
    };

    var Block = function(size, color, mouseX, mouseY){
        this.size = size;
        this.color = color;

        this.evaluete(mouseX, mouseY);
        this.draw();
    };

    Block.prototype = {
        size: null,
        color: null,

        left: null,
        top: null,

        point: {
            top: null,
            bottom: null,
            left: null,
            right: null
        },

        evaluete: function(mouseX, mouseY){
            this.left = mouseX - (this.size / 2);
            this.top = mouseY - (this.size / 2);

            this.point.top = mouseY - (this.size / 2);
            this.point.bottom = mouseY + (this.size / 2);
            this.point.left = mouseX - (this.size / 2);
            this.point.right = mouseX + (this.size / 2);
        },

        isTopConflict: function(targetPos){
            if(this.point.top < targetPos.bottom && this.point.bottom > targetPos.bottom
            && (this.point.left < targetPos.left && this.point.right > targetPos.right)){
                console.log("bottom conflict");
                return true;
            }else{
                return false;
            }
        },

        isBottomConflict: function(targetPos){
            if(this.point.bottom > targetPos.top && this.point.top < targetPos.top
            && (this.point.left < targetPos.left && this.point.right > targetPos.right)){
                console.log("top conflict");
                return true;
            }else{
                return false;
            }
        },

        isLeftConflict: function(targetPos){
            if(this.point.left < targetPos.right && this.point.right > targetPos.right
            && (this.point.top < targetPos.top && this.point.bottom > targetPos.bottom)){
                console.log("left conflict");
                return true;
            }else{
                return false;
            }
        },

        isRightConflict: function(targetPos){
            if(this.point.right > targetPos.left && this.point.left < targetPos.left
            && (this.point.top < targetPos.top && this.point.bottom > targetPos.bottom)){
                console.log("right conflict");
                return true;
            }else{
                return false;
            }
        },

        draw: function(){
            noStroke();
            fill(this.color);
            rect(this.left, this.top, this.size, this.size);

            DebugDraw(this.point.top, this.point.right, this.point.bottom, this.point.left);
        }
    };

    var DebugDraw = function(top, right, bottom, left){
        if(debugFlag){
            stroke(255, 0, 0, 128);

            line(left, top, right, top);
            line(right, top, right, bottom);
            line(right, bottom, left, bottom);
            line(left, bottom, left, top);
        }
    };

    global.Ball = Ball;
    global.Block = Block;

})(window);