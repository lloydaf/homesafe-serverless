import { resolvers } from './resolvers';

describe('Tests for resolver', () => {
  it('it have an exported member called resolvers', () => {
    expect(resolvers).toBeTruthy();
  })

  it('resolvers should have Query', ()=> {
    expect(resolvers.Query).toBeTruthy();
  })

  it('resolvers should have Mutation', ()=> {
    expect(resolvers.Mutation).toBeTruthy();
  });
  
})