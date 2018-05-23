import fetch from '@/utils/service';


export const getConfigs = (controller) => {
	return fetch({
		url: '/'+ controller + '/getConfigs',
		method: 'post',
	});
}
