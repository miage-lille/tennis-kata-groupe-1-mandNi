import { Player } from './player';

export type Love = { kind: 'LOVE' };
export type Fifteen = { kind: 'FIFTEEN' };
export type Thirty = { kind: 'THIRTY' };

export type Point = Love | Fifteen | Thirty;

export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export const points = (
    playerOnePoints: Point,
    playerTwoPoints: Point
): Points => ({
  kind: 'POINTS',
  pointsData: {
    PLAYER_ONE: playerOnePoints,
    PLAYER_TWO: playerTwoPoints,
  },
});

export type Deuce = {
  kind: 'DEUCE';
};

export type FortyData = {
  player: Player;
  otherPoint: Point;
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player; // Player that has the advantage
};

export type Game = {
  kind: 'GAME';
  player: Player; // Player that won the game
};

// Constructors

export type Score = Points | Forty | Deuce | Advantage | Game;

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {
    player,
    otherPoint,
  },
});

export const love = (): Love => ({ kind: 'LOVE' });
export const fifteen = (): Fifteen => ({ kind: 'FIFTEEN' });
export const thirty = (): Thirty => ({ kind: 'THIRTY' });