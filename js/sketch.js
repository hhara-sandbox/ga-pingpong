(function(global){
    var clientWidth = window.innerWidth;
    var clientHeight = window.innerHeight;

    var Ball = window.Ball;
    var balls = [];
    var ballSize = null;
    var ballWidth = null;

    var Block = window.Block;
    var block = null;

    var ballBoundMouseX = null;
    var ballBoundMouseY = null;

    function init(){
        var the_canvas = createCanvas(clientWidth, clientHeight);
        the_canvas.parent('block-canvas');

        if('ontouchend' in document){
            block = new Block(100, 0, touchX, touchY);
            ballSize = 300;
            ballWidth = 50;
        }else{
            block = new Block(200, 0, mouseX, mouseY);
            ballSize = 500;
            ballWidth = 75;
        }

        _(ballSize).times(function(){
            balls.push(new Ball(clientWidth, clientHeight, ballWidth));
        });
    };

    function paint(){
        clear();

        if('ontouchend' in document){
            block.evaluete(touchX, touchY);
        }else{
            block.evaluete(mouseX, mouseY);
        }

        block.draw();

        _.each(balls, function(ball, key){
            ball.move(block);
            ball.draw();
        });
    }

    /*------------------------------------------------------------------
        グローバルオブジェクトに関数を追加
    ------------------------------------------------------------------*/
    _.extend(global, {
        setup: init,
        draw: paint
    });

})(window);