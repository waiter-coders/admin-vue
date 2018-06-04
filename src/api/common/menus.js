import fetch from '@/utils/service';

export const getMenus = () => {
	return fetch({
		url: '/menus/list',
		method: 'get',
	});
}

