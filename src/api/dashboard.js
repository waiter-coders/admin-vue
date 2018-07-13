import service from '@/utils/service';

export const getMenus = () => {
	return service.get('/index.php/dashboard/getMenus');
}

