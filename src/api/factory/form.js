import fetch from '@/utils/service';

export const add = (url, reqData) => {
    console.log(reqData);
	return fetch({
		url: url,
		method: 'post',
		data: reqData
	});
}

export const edit = (url, reqData) => {
	return fetch({
		url: url,
		method: 'post',
		data: reqData
	});
}