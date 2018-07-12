import fetch from '@/utils/service';


export const getConfigs = (controller) => {
	console.log( controller );
	return fetch({
		url: controller + '/getConfigs',
		method: 'get',
	});
}
