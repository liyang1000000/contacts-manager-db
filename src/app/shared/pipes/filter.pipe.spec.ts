import { FilterPipe } from './filter.pipe'

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe()
    expect(pipe).toBeTruthy()
  })

  it('should filter correctly', () => {
  	const pipe = new FilterPipe()
  	const arr = [{id: 'test_man', name: 'test01', status: 'active'}, {id: 'text_03', name: 'text03', status:'inactive'}]
  	expect(pipe.transform(arr, 'test', 'active', []).length).toBe(1)
  })
})
