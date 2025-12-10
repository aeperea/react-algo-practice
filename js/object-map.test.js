import {describe, it, expect} from 'vitest'
import objectMap from './object-map';

const double = (x) => x * 2;

describe('objectMap', () => {
  it('empty', () => {
    expect(objectMap({}, double)).toEqual({});
  });

  it('single key', () => {
    expect(objectMap({foo: 2}, double)).toEqual({foo: 4});
  });

  it('multiple keys', () => {
    expect(objectMap({foo: 2, bar: 3}, double)).toEqual({foo: 4, bar: 6});
  });

  it('does not mutate the input', () => {
    const obj = {bar: 3, foo: 2};
    expect(objectMap(obj, double)).toEqual({
      foo: 4,
      bar: 6,
    });
    expect(obj).toEqual({
      foo: 2,
      bar: 3,
    });
  });
});
