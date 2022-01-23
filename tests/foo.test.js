function foo(a, b) {
  return a + b;
}

describe('Test', () => {
  it('Checking', () => {
    expect(foo(2, 2)).toBe(4);
  });
});
