// Implement a function compose that takes multiple functions as arguments and returns a new function that applies those functions in reverse order. The output of one function becomes the input of the next function, creating a chain of function compositions.

export default function compose(...fns) {
  return function(arg) {
    return fns.reverse().reduce((acc, curr) => {
      return curr.call(this, acc);
    }, arg)
  }
}
