// var Observ = require('observ');
// var ObservStruct = require('observ-struct');
// var ObservArray = require('observ-array');
var interact = require('interact-js');

var raf = require('./raf');
// var rng = require('./rng');
var autoscale = require('./autoscale');

var TILE_SIZE = 80;
var FIELD_SIZE = 8;
var NUM_TILES = FIELD_SIZE * FIELD_SIZE;
var NUM_TILE_TYPES = 4;
var DIRECTIONS = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
  ALL: 4
};

var tiles = new Array(NUM_TILES);
var $tiles = new Array(NUM_TILES);
var $grid = document.querySelector('.Game-grid');

function rowNumber(i) {
  return Math.floor(i / FIELD_SIZE);
}

function colNumber(i) {
  return i % FIELD_SIZE;
}

function isHorizontalMatch(i) {
  return colNumber(i) >= 2 &&
    tiles[i] === tiles[i - 1] &&
    tiles[i] === tiles[i - 2] &&
    rowNumber(i) === rowNumber(i - 2);
}

function isVerticalMatch(i) {
  return rowNumber(i) >= 2 &&
    tiles[i] === tiles[i - FIELD_SIZE] &&
    tiles[i] === tiles[i - 2 * FIELD_SIZE];
}

function swap(a, b) {
  var temp = tiles[a];
  tiles[a] = tiles[b];
  tiles[b] = temp;
}

function onDrag(interaction) {
  var delta = interaction.getMoveDelta();
  var index, row, col, direction;

  if (interaction.isResolved) {
    return;
  }

  if (interaction.sourceIndex == null) {
    // interaction.sourceIndex = Array.prototype.indexOf.call(interaction.target.parentNode.childNodes, interaction.target);
    interaction.sourceIndex = $tiles.indexOf(interaction.target);
    console.log(interaction.sourceIndex);
  }

  if (!interaction.totals) {
    interaction.totals = {x: 0, y: 0, d: 0};
  }

  interaction.totals.x += delta.x;
  interaction.totals.y += delta.y;
  interaction.totals.d = Math.max(Math.abs(interaction.totals.x), Math.abs(interaction.totals.y));

  if (interaction.totals.d < (TILE_SIZE / 8)) {
    return;
  }

  if (Math.abs(interaction.totals.x) > Math.abs(interaction.totals.y)) {
    direction = DIRECTIONS[interaction.totals.x < 0 ? 'LEFT' : 'RIGHT'];
  } else {
    direction = DIRECTIONS[interaction.totals.y < 0 ? 'UP' : 'DOWN'];
  }

  interaction.isResolved = true;
  index = interaction.sourceIndex;
  row = rowNumber(index);
  col = colNumber(index);

  switch (direction) {
    case DIRECTIONS.UP:
      if (row > 0) {
        console.log('up');
        swap(index, index - 8);
      }
      break;
    case DIRECTIONS.DOWN:
      if (row < (FIELD_SIZE - 1)) {
        console.log('down');
        swap(index, index + 8);
      }
      break;
    case DIRECTIONS.LEFT:
      if (col > 0) {
        console.log('left');
        swap(index, index - 1);
      }
      break;
    case DIRECTIONS.RIGHT:
      if (col < (FIELD_SIZE - 1)) {
        console.log('right');
        swap(index, index + 1);
      }
      break;
    default:
      break;
  }
}

for (var i = 0; i < NUM_TILES; i++) {
  do {
    tiles[i] = Math.ceil(Math.random() * NUM_TILE_TYPES);
    if (!$tiles[i]) {
      $tiles[i] = document.createElement('div');
      // $tiles[i].data.index = i;
      $tiles[i].className = 'Game-tile Game-tile--type' + tiles[i];
      $tiles[i].style.transform = 'translate(' + (colNumber(i) * TILE_SIZE)  + 'px,' + (rowNumber(i) * TILE_SIZE) + 'px)';
      $grid.appendChild($tiles[i]);
    }
  } while (isHorizontalMatch(i) || isVerticalMatch(i));
}

interact.on('drag', $grid, onDrag);

raf.start(function () {
  for (var i = 0; i < NUM_TILES; i++) {
      $tiles[i].className = $tiles[i].className.replace(/(--type)\d/, '$1' + tiles[i]);
  }
});

autoscale('.Game', 640, 880);
