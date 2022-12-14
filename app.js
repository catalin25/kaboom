const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

kaboom();

// load assets
loadSprite("bean", "assets/idle1.gif");
loadSprite("bg", "assets/bgpic.jpg")
loadSprite("bgover", "assets/bgover.jfif")
loadSound("bgmusic", "assets/bgmusic.mp3")

 
scene("pregame", () => {
    const bg = add([
        sprite("bg" ,{width: width(), height: height()}),
    ])
    
    add([
        sprite("bean"),
        pos(width() / 2, height() / 2 - 80),
        scale(3.5),
        origin("center"),
        
    ]);

    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));
    onClick(() => play("bgmusic"));
    onTouchMove(() => go("game"));
    onTouchMove(() => play("bgmusic"));

})

scene("game", () => {

    // define gravity
    gravity(2400);

    
    const bg = add([
        sprite("bg" ,{width: width(), height: height()}),
    ])

    // add a game object to screen
    const player = add([
        // list of components
        sprite("bean"),
        pos(80, 40),
        scale(3.4),
        area(),
        body(),
    ]);

    // floor
    add([
        rect(width(), FLOOR_HEIGHT),
        outline(4),
        pos(0, height()),
        origin("botleft"),
        area(),
        solid(),
        color(127, 200, 255),
    ]);

    function jump() {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    } 

   
    // jump when user press space
    onKeyPress("space", jump);
    onClick(jump, );


    function spawnTree() {

        // add tree obj
        add([
            rect(48, rand(32, 96)),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            origin("botleft"),
            color(255, 180, 255),
            move(LEFT, SPEED),
            "tree",
        ]);

        // wait a random amount of time to spawn next tree
        wait(rand(0.5, 1.5), spawnTree);

    }

    // start spawning trees
    spawnTree();

    // lose if player collides with any game obj with tag "tree"
    player.onCollide("tree", () => {
        // go to "lose" scene and pass the score
        go("lose", score);
        addKaboom(player.pos);
    });

    // keep track of score
    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(24, 24),
    ]);

    // increment score every frame
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });

});

scene("lose", (score) => {

    const bgover = add([
        sprite("bgover" ,{width: width(), height: height()}),
    ])

    add([
        sprite("bean"),
        pos(width() / 2, height() / 2 - 80),
        scale(3.5),
        origin("center"),
        
    ]);


    // display score
    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        origin("center"),
    ]);

    // go back to game with space is pressed
    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));

});
go("pregame");

// go("game");
