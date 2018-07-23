import { PaginationPipe } from './pagination.pipe'

describe('PaginationPipe', () => {
  it('create an instance', () => {
    const pipe = new PaginationPipe()
    expect(pipe).toBeTruthy()
  })

  it('should set pagination correctly', () => {
  	const pipe = new PaginationPipe()
  	expect(pipe.transform([1,2,3,4,5], 0, 2, {}).length).toBe(0)
  })
})
