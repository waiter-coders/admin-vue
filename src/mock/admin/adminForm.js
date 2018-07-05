import Mock from 'mockjs'

export default {
	submit: (request, response, next) => {
		return {
			code: 0,
			msg: 'success',
			data: {
				url: '/record/paging'
			}
		}
	}
}