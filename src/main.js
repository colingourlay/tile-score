// var Observ = require('observ');
// var ObservStruct = require('observ-struct');
// var ObservArray = require('observ-array');
var autoscale = require('./autoscale');
var raf = require('./raf');
var Grid = require('./Grid');

var FIELD_SIZE = 640;
var FIELD_TILES = 6;
var MENU_HEIGHT = 80;
var STATS_HEIGHT = 160;
var GAME_WIDTH = FIELD_SIZE;
var GAME_HEIGHT = FIELD_SIZE + MENU_HEIGHT + STATS_HEIGHT;

var grid = new Grid(document.querySelector('.Game-grid'), FIELD_SIZE, FIELD_TILES);
var $stats = document.querySelector('.Game-stats');
var lastScore;

raf.start(function () {
  grid.updateAppearance();

  if (grid.score !== lastScore) {
    $stats.innerHTML = '<label class="' + (grid.score < 0 ? 'is-negative' : '') + '">' + grid.score + '</label>';
    lastScore = grid.score;
  }
});

autoscale('.Game', GAME_WIDTH, GAME_HEIGHT);
