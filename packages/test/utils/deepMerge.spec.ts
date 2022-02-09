import { deepMerge } from '../../lib/core/utils/tools'


describe('工具类函数测试', () => {
	it('检测deepMerge方法', async () => {
		const obj1 = { name: 'horn', age: 20 }
		const obj2 = { name: 'horn', age: 21 }
		expect(
			deepMerge(obj1, obj2)
		).toEqual({
			name: 'horn',
			age: 21,
		})
	})
})
