export default {

	async checkStatus(resp) {
		if (resp.status >= 200 && resp.status < 300) {
			return resp;
		}

		let err;
		try {
			const r = await resp.json();
			if (!r.message) {
				r.message = 'failed to make request';
			}
			err = new Error(r.message);
			err.resp = r;
		} catch (e) {
			err = new Error('failed to make request');
			err.resp = resp;
		}

		throw err;
	},

	parseJSON(resp) {
		return resp.json();
	},
};
