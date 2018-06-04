import fetch from '@/utils/service';

export const getList = (url, currentPage, pageSize, searchs) => {
	return fetch({
		url: url,
		method: 'get',
		data: {
			currentPage,
			pageSize,
			searchs
		}
	});
}