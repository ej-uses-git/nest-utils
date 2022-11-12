import ErrorHandle from '../ErrorHandle';

@ErrorHandle(() => {
  throw new Error('Hello there');
})
class TestClass {
  randomMethod() {
    throw new Error('This is a different error!!!');
  }
}

@ErrorHandle(() => 'Wow!')
class TestClass2 {
  randomMethod() {
    throw new Error('This is a different error!!!');
  }
}

const testInstance = new TestClass();
const testInstance2 = new TestClass2();

test('Error is replaced with another error', () => {
  expect(testInstance.randomMethod).toThrow('Hello there');
});

test('Handler returns some value', () => {
  expect(testInstance2.randomMethod()).toBe('Wow!');
});
