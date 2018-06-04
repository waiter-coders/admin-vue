import fetch from '@/utils/service';

export const getList = (url, curPage, pageSize, searchs) => {
	return fetch({
		url: url,
		method: 'get',
		data: {
			curPage,
			pageSize,
			searchs
		}
	});
}