var game = new Phaser.Game(500,500)

var box = function(options) {
  var bmd = game.add.bitmapData(options.length,options.width)
  bmd.ctx.beginPath()
  bmd.ctx.rect(0,0,options.length,options.width)
  bmd.ctx.fillStyle = options.color
  bmd.ctx.fill()
  return bmd
}

var mainState = {
  create: function() {
    game.stage.backgroundColor = "#BDC2C5";
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    this.player = game.add.sprite(32, 32, box({length: 32, width: 32, color: "#4F616E"}))
    this.cursor = game.input.keyboard.createCursorKeys()
    this.player.body.collideWorldBounds = true
    this.enemy = game.add.sprite(200, 32, box({
      length: 32,
      width: 32,
      color: "#A96262"
      }))

    this.walls = game.add.group()
    this.walls.enableBody = true
    var top = this.walls.create(0,0, box({
      length: game.world.width,
      width: 16,
      color: "#374A59"
      })
    )
    var bottom = this.walls.create(0,game.world.height - 16, box({
      length: game.world.width,
      width: 16,
      color: "#374A59"
      })
    )
    var leftWall = this.walls.create(0, 16, box({
      length: 16,
      width: game.world.height - 32,
      color: "#374A59"
    })
  )
  var rightWall = this.walls.create(game.world.width -16, 16, box({
    length: 16,
    width: game.world.height -32,
    color: "#374A59"
    })
  )
  var innerWall1 = this.walls.create(game.world.width /4, 16, box({
    length: 16,
    width: game.world.height - game.world.height /4,
    color: "#374A59"
    })
  )
  var innerWall2 = this.walls.create(game.world.width / 2, 128, box ({
    length: 16,
    width:game.world.height - game.world.height / 4,
    color: "#374A59"
  }) )
  innerWall2.body.immovable = true
  innerWall1.body.immovable = true
  rightWall.body.immovable = true
  top.body.immovable = true
  leftWall.body.immovable = true
  bottom.body.immovable = true
  },
  update: function() {
    game.physics.arcade.collide(this.player, this.walls)
    game.physics.arcade.overlap(this.player, this.enemy, this.handlePlayerDeath, null, this)
    var speed = 250
    this.player.body.velocity.y = 0
    this.player.body.velocity.x = 0

    if (this.cursor.up.isDown) {
      this.player.body.velocity.y -= speed;
    } else if (this.cursor.down.isDown) {
      this.player.body.velocity.y += speed
    }
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x -= speed
    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x += speed
    }
  },
  handlePlayerDeath: function(player, enemy) {
    player.kill()
    game.state.start("gameOver")
  }
}

gameOverState = {
  create: function() {
    label = game.add.text(game.world.width / 2 , game.world.height / 2, "GAMEOVER\nPress SPACE to restart",
    {
      font: "22px Arial",
      fill: "#fff",
      align: "center"
    }
  )
    label.anchor.setTo(0.5, 0.5)
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  },
  update: function() {
    if(this.spacebar.isDown) {
      game.state.start("main")
    }
  }
}





game.state.add("main", mainState);
game.state.start("main");
game.state.add("gameOver", gameOverState)
