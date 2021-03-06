var ZenvaRunner = function() {}

ZenvaRunner.Boot = function() {}

ZenvaRunner.Boot.prototype = {
  preload: function() {
    this.load.image("logo", "assets/images/logo.png")
    this.load.image("preloadbar", "assets/images/preloader-bar.png")
  },
  create: function() {
    this.game.stage.backgroundColor = "#fff"

    this.input.maxPointers = 1

    if(this.game.device.desktop) {
      this.scale.pageAlignHorizontally = true
    } else {
      // if its not desktop, dis b display 4 mobile
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 568;
      this.scale.minHeight = 600;
      this.scale.maxWidth = 2048;
      this.scale.maxheight = 1536;
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.setScreenSize(true);
    }
      // start the preloader
      this.state.start("Preloader")


  }
}
