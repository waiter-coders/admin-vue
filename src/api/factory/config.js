import fetch from '@/utils/service';


export const getConfig = (controller) => {
	return fetch({
		url: '/'+ controller + '/getConfig',
		method: 'post',
	});
}
