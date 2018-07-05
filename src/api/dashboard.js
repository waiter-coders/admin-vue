import fetch from '@/utils/service';

export const getMenus = () => {
	return fetch({
		url: '/dashboard/getMenus',
		method: 'get',
	});
}

