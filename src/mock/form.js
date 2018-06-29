import Mock from 'mockjs'

export default {
	add: (request, response, next) => {
		return {
			code: 0,
			msg: 'success',
			data: {
				url: '/record/paging'
			}
		}
	},
	edit: ( request, response, next) => {
		return {
			code: 0,
			msg: 'success',
			data: {
				url: '/record/paging'
			}
		}
	}
}
