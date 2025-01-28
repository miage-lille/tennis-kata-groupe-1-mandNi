import { Player } from './player';

export type Point = LOVE | FIFTEEN | THIRTY

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

export type Game = {
  kind: 'GAME';
  player: Player; // Player has won
};

export type LOVE = {
  kind: 'LOVE';
}

export type Deuce = {
  kind: 'DEUCE';
}

export type FIFTEEN = {
  kind: 'FIFTEEN';
}

export type THIRTY = {
  kind: 'THIRTY';
}

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player; // Player has advantage
}

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player : player
});

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export const  thirty = (): THIRTY => ({
  kind: 'THIRTY',
});

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {
    player: player,
    otherPoint: otherPoint
  }
});

export type FortyData = {
  player: Player;
  otherPoint: Point
};

export type Score = Points | Game | Deuce | Forty | Advantage;
