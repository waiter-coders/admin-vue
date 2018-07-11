import fetch from '@/utils/service';

export const getMenus = () => {
	return fetch({
		url: '/Dashboard/getMenus/',
		method: 'get',
	});
}

