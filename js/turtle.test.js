import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import Turtle from './turtle.js';

describe('Turtle', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to (0,0) facing north', () => {
    const t = new Turtle();
    expect(t.position()).toEqual([0, 0]);
    expect(t.isFacingNorth()).toBe(true);
  });

  it('moves forward when facing north', () => {
    const t = new Turtle(0, 0, 0); // north
    const ret = t.forward(5);
    expect(t.position()).toEqual([0, 5]);
    expect(ret).toBe(t); // forward returns this
  });

  it('turns right and moves east', () => {
    const t = new Turtle();
    t.right();
    expect(t.isFacingEast()).toBe(true);
    t.forward(3);
    expect(t.position()).toEqual([3, 0]);
  });

  it('turns left from north to west and moves', () => {
    const t = new Turtle();
    t.left();
    expect(t.isFacingWest()).toBe(true);
    t.forward(2);
    expect(t.position()).toEqual([-2, 0]);
  });

  it('backward moves opposite direction (and does not return this)', () => {
    const t = new Turtle(0, 0, 1); // facing east
    // backward uses forward(-distance) under the hood
    const ret = t.backward(4);
    expect(t.position()).toEqual([-4, 0]);
    expect(ret).toBeUndefined();
  });

  it('supports chaining of right/left/forward', () => {
    const t = new Turtle();
    t.right().forward(2).left().forward(1);
    expect(t.position()).toEqual([2, 1]);
  });

  it('wraps directions correctly when rotating', () => {
    const t = new Turtle(0, 0, 3); // facing west
    t.right(); // should wrap to north (0)
    expect(t.isFacingNorth()).toBe(true);
    t.left(); // back to west (3)
    expect(t.isFacingWest()).toBe(true);
  });
});
