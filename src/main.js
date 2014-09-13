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

var grid;
var $game = document.querySelector('.Game');
var $grid = document.querySelector('.Game-grid');
var $score = document.querySelector('.Game-score');
var $moves = document.querySelector('.Game-moves');
var $playAgain = document.querySelector('.Game-playAgain');
var $replay = document.querySelector('.Game-replay');
var lastScore;
var lastMoves;

function replay() {
  if (grid) {
    grid.remove();
  }
  grid = new Grid($grid, FIELD_SIZE, FIELD_TILES);
  lastScore = null;
  lastMoves = null;
  $game.className = 'Game';
}

raf.start(function () {
  if (grid) {
    grid.updateAppearance();

    if (grid.score !== lastScore) {
      $score.innerHTML = grid.score;
      $score.className = 'Game-score ' + (grid.score < 0 ? 'is-negative' : '');
      lastScore = grid.score;
    }

    if (grid.moves !== lastMoves) {
      $moves.innerHTML = grid.moves;
      $moves.className = 'Game-moves ' + (grid.moves < 0 ? 'is-negative' : '') + (grid.moves < 6 ? 'is-low' : '');
      lastMoves = grid.moves;
    }

    if (grid.moves <= 0) {
      $game.className = 'Game Game--over';
    }
  }
});

autoscale('.Game', GAME_WIDTH, GAME_HEIGHT);
replay();
$playAgain.onclick = replay;
$replay.onclick = replay;
