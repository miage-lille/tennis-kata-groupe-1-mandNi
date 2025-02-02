import { isSamePlayer, Player } from './types/player';
import {
  advantage,
  deuce,
  forty,
  FortyData,
  game,
  Point,
  PointsData,
  Score,
} from './types/score';
import { match as matchOpt } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { incrementPoint } from './types/score.utils';



export const playerToString = (player: Player): string => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};

export const otherPlayer = (player: Player): Player => {
  return player === 'PLAYER_ONE' ? 'PLAYER_TWO' : 'PLAYER_ONE';
};


// Exercice 1 : pointToString, scoreToString

export const pointToString = (point: Point): string => {
  switch (point.kind) {
    case 'LOVE':
      return '0';
    case 'FIFTEEN':
      return '15';
    case 'THIRTY':
      return '30';
  }
};

export const scoreToString = (score: Score): string => {
  switch (score.kind) {
    case 'POINTS':
      return (
          pointToString(score.pointsData.PLAYER_ONE) +
          ' - ' +
          pointToString(score.pointsData.PLAYER_TWO)
      );
    case 'GAME':
      return `${playerToString(score.player)} wins`;
    case 'DEUCE':
      return 'Deuce';
    case 'FORTY':
      return `Forty ${playerToString(score.fortyData.player)}`;
    case 'ADVANTAGE':
      return `Advantage ${playerToString(score.player)}`;
  }
};


export const scoreWhenDeuce = (winner: Player): Score => advantage(winner);

export const scoreWhenAdvantage = (
    advantagedPlayer: Player,
    winner: Player
): Score => {
  return isSamePlayer(advantagedPlayer, winner) ? game(winner) : deuce();
};


export const scoreWhenForty = (currentForty: FortyData, winner: Player): Score => {
  if (isSamePlayer(currentForty.player, winner)) {
    return game(winner);
  }
  return pipe(
      incrementPoint(currentForty.otherPoint),
      matchOpt<Point, Score>(
          () => deuce(),
          (newPoint) => forty(currentForty.player, newPoint)
      )
  );
};


export const scoreWhenGame = (winner: Player): Score => {
  return game(winner);
};


// Exercice 2 : scoreWhenPoint

export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const winnerPoint = current[winner];

  return pipe(
      incrementPoint(winnerPoint),
      matchOpt<Point, Score>(
          () => {
            const loser = otherPlayer(winner);
            return forty(winner, current[loser]);
          },
          (nextPoint) => {
            const newPointsData: PointsData = {
              PLAYER_ONE:
                  winner === 'PLAYER_ONE' ? nextPoint : current.PLAYER_ONE,
              PLAYER_TWO:
                  winner === 'PLAYER_TWO' ? nextPoint : current.PLAYER_TWO,
            };
            return {
              kind: 'POINTS',
              pointsData: newPointsData,
            };
          }
      )
  );
};



export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'GAME':
      return scoreWhenGame(winner);
  }
};