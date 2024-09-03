import { TruncateStringPipe } from './truncate-string.pipe';

describe('TruncateDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateStringPipe();
    expect(pipe).toBeTruthy();
  });
});
