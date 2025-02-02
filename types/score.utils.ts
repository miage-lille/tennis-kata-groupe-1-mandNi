import { Option, some, none } from 'fp-ts/Option';
import { Point, fifteen, thirty } from './score';

/**
 * Increment the point of a player and return the new point
 * @param p The current point
 */
export const incrementPoint = (p: Point): Option<Point> => {
    switch (p.kind) {
        case 'LOVE':
            return some(fifteen());
        case 'FIFTEEN':
            return some(thirty());
        case 'THIRTY':
            return none;
    }
};
