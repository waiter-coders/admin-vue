import fetch from '@/utils/service';

export const getMenus = () => {
	return fetch({
		url: '/index.php/dashboard/getMenus',
		method: 'get',
	});
}

