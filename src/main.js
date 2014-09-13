// var Observ = require('observ');
// var ObservStruct = require('observ-struct');
// var ObservArray = require('observ-array');
var autoscale = require('./autoscale');
var raf = require('./raf');
var Grid = require('./Grid');

var FIELD_SIZE = 720;
var FIELD_TILES = 6;
var MENU_HEIGHT = 180;
var STATS_HEIGHT = 180;
var GAME_WIDTH = FIELD_SIZE;
var GAME_HEIGHT = FIELD_SIZE + MENU_HEIGHT + STATS_HEIGHT;

var grid = new Grid(document.querySelector('.Game-grid'), FIELD_SIZE, FIELD_TILES);
// var $stats = document.querySelector('.Game-stats');
var $score = document.querySelector('.Game-score');
var $moves = document.querySelector('.Game-moves');
var lastScore;
var lastMoves;

raf.start(function () {
  grid.updateAppearance();

  if (grid.score !== lastScore) {
    $score.innerHTML = grid.score;
    $score.className = 'Game-score ' + (grid.score < 0 ? 'is-negative' : '');
    lastScore = grid.score;
  }

  if (grid.moves !== lastMoves) {
    $moves.innerHTML = grid.moves;
    $moves.className = 'Game-score ' + (grid.moves < 0 ? 'is-negative' : '');
    lastMoves = grid.moves;
  }

});

autoscale('.Game', GAME_WIDTH, GAME_HEIGHT);
