import {describe, it, expect} from 'vitest'
import cycle from './cycle';

describe('cycle', () => {
  it('returns function', () => {
    const fooFn = cycle('foo');
    expect(fooFn).toBeInstanceOf(Function);
  });

  it('single item', () => {
    const helloFn = cycle('hello');
    expect(helloFn()).toBe('hello');
  });

  it('two values', () => {
    const onOffFn = cycle('on', 'off');
    expect(onOffFn()).toBe('on');
    expect(onOffFn()).toBe('off');
  });

  it('three values', () => {
    const speedFn = cycle('slow', 'medium', 'fast');
    expect(speedFn()).toBe('slow');
    expect(speedFn()).toBe('medium');
    expect(speedFn()).toBe('fast');
  });

  it('wraps around', () => {
    const speedFn = cycle('slow', 'medium', 'fast');
    expect(speedFn()).toBe('slow');
    expect(speedFn()).toBe('medium');
    expect(speedFn()).toBe('fast');
    expect(speedFn()).toBe('slow');
    expect(speedFn()).toBe('medium');
    expect(speedFn()).toBe('fast');
  });
});
