import { schema } from './schema';


describe('Tests for schema.ts', () => {
  it('should have an exported member called schema', () => {
    expect(schema).toBeTruthy();
  })

  it('schema should be an Object', () => {
    expect(typeof schema).toEqual('object');
  })
})