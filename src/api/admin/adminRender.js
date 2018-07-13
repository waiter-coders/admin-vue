import fetch from '@/utils/service';


export const getConfigs = (controller) => {
	return fetch({
		url: '/index.php' +  controller + '/getConfigs',
		method: 'get',
	});
}
