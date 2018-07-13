import service from '@/utils/service';


export const getConfigs = (controller) => {
	return service.get('/index.php' +  controller + '/getConfigs');
}
