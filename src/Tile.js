function Tile(grid, type) {
  this.grid = grid;
  this.type = type;
  this.scoring = {
    topLeft: 0,
    top: 0,
    topRight: 0,
    right: 0,
    bottomRight: 0,
    bottom: 0,
    bottomLeft: 0,
    left: 0
  };
  this.score = 0;
  this.$el = document.createElement('div');
}

Tile.prototype.updateScore = function () {
  var tile = this;

  var index = this.grid.tiles.indexOf(this);
  var row = this.grid.rowOf(this);
  var col = this.grid.colOf(this);
  var last = this.grid.fieldTiles - 1;
  var type = this.type;

  // Simple 4-way scoring
  // this.scoring.top = row === 0 ? 0 : (type === this.grid.tiles[index - this.grid.fieldTiles].type) ? 1 : -1;
  // this.scoring.right = col === last ? 0 : (type === this.grid.tiles[index + 1].type) ? 1 : -1;
  // this.scoring.bottom = row === last ? 0 : (type === this.grid.tiles[index + this.grid.fieldTiles].type) ? 1 : -1;
  // this.scoring.left = col === 0 ? 0 : (type === this.grid.tiles[index - 1].type) ? 1 : -1;

  // Simple 8-way scoring
  this.scoring.top = row === 0 ? 0 : (type === this.grid.tiles[index - this.grid.fieldTiles].type) ? 2 : -1;
  this.scoring.topRight = (row === 0 || col === last) ? 0 : (type === this.grid.tiles[index - (this.grid.fieldTiles - 1)].type) ? 1 : 0;
  this.scoring.right = col === last ? 0 : (type === this.grid.tiles[index + 1].type) ? 2 : -1;
  this.scoring.bottomRight = (row === last || col === last) ? 0 : (type === this.grid.tiles[index + (this.grid.fieldTiles + 1)].type) ? 1 : 0;
  this.scoring.bottom = row === last ? 0 : (type === this.grid.tiles[index + this.grid.fieldTiles].type) ? 2 : -1;
  this.scoring.bottomLeft = (row === last || col === 0) ? 0 : (type === this.grid.tiles[index + (this.grid.fieldTiles - 1)].type) ? 1 : 0;
  this.scoring.left = col === 0 ? 0 : (type === this.grid.tiles[index - 1].type) ? 2 : -1;
  this.scoring.topLeft = (row === 0 || col === 0) ? 0 : (type === this.grid.tiles[index - (this.grid.fieldTiles + 1)].type) ? 1 : 0;


  this.score = Object.keys(this.scoring).reduce(function (totalScore, key) {
    return totalScore + tile.scoring[key];
  }, 0);
};

Tile.prototype.updateAppearance = function () {
  var tileSize = this.grid.tileSize;
  var borderSize = Math.ceil(tileSize / 45);
  var borderSizePx = borderSize + 'px';
  var index = this.grid.tiles.indexOf(this);
  var row = this.grid.rowOf(this);
  var col = this.grid.colOf(this);
  var last = this.grid.fieldTiles - 1;

  this.$el.className = [
    'Game-tile',
    'Game-tile--type' + this.type
  ].join(' ');

  this.$el.innerHTML = this.score;

  this.$el.style.borderTopWidth = row === 0 || this.scoring.top < 0 ? borderSizePx : 0;
  this.$el.style.borderRightWidth = col === last || this.scoring.right < 0 ? borderSizePx : 0;
  this.$el.style.borderBottomWidth = row === last || this.scoring.bottom < 0 ? borderSizePx : 0;
  this.$el.style.borderLeftWidth = col === 0 || this.scoring.left < 0 ? borderSizePx : 0;

  this.$el.style.borderTopRightRadius = 'inherit';
  this.$el.style.borderBottomRightRadius = 'inherit';
  this.$el.style.borderBottomLeftRadius = 'inherit';
  this.$el.style.borderTopLeftRadius = 'inherit';

  if (row !== 0 && this.type === this.grid.tiles[index - this.grid.fieldTiles].type) {
    this.$el.style.borderTopLeftRadius = 0;
    this.$el.style.borderTopRightRadius = 0;
    // this.$el.style.backgroundImage = 'radial-gradient(circle 20px at -20% 50%,transparent,transparent 100px,#888888 100px)';
    this.$el.style.backgroundImage = 'radial-gradient(circle 20px at -20% 50%,transparent,transparent 100px,#888888 100px)';
  }

  if (col !== 0 && this.type === this.grid.tiles[index - 1].type) {
    this.$el.style.borderBottomLeftRadius = 0;
    this.$el.style.borderTopLeftRadius = 0;
  }

  if (col !== last && this.type === this.grid.tiles[index + 1].type) {
    this.$el.style.borderTopRightRadius = 0;
    this.$el.style.borderBottomRightRadius = 0;
  }

  if (row !== last && this.type === this.grid.tiles[index + this.grid.fieldTiles].type) {
    this.$el.style.borderBottomRightRadius = 0;
    this.$el.style.borderBottomLeftRadius = 0;
  }

};

module.exports = Tile;
