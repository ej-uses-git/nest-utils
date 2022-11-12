import translateStatus from '../translate-status';

test('Status is translated correctly', () => {
  expect(translateStatus(404)).toBe('אינו נמצא');
  expect(translateStatus(201)).toBe('נוצר');
  expect(translateStatus(500)).toBe('בעיה פנימית בשרת');
  expect(translateStatus(418)).toBe('אני ספל תה');
});

test('Default status returns 500', () => {
  expect(translateStatus(700)).toBe('בעיה פנימית בשרת');
});
