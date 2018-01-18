export const locations = [
	{
		name: 'ARIES AUTOMOTIVE ATLANTA AREA',
		address: [{
			address1: '110 Northpoint Parkway Suite 200',
			address2: '',
			city: 'Acworth',
			state: 'GA',
			zip: '30102',
		}],
		phone: '(866) 528-2878',
		fax: '(866) 529-2878',
	},
	{
		name: 'ARIES AUTOMOTIVE EDMONTON AREA',
		address: [{
			address1: '#27, 12632 - 184 St. NW',
			address2: '',
			city: 'Edmonton',
			state: 'Alberta',
			zip: 'T5V 1T4',
		}],
		phone: '(877) 287-8634',
		fax: '(715) 831-8712',
	},
	{
		name: 'ARIES AUTOMOTIVE SEATTLE AREA',
		address: [{
			address1: '2108 \'B\' Street NW Suite 120',
			address2: '',
			city: 'Auburn',
			state: 'WA',
			zip: '98001',
		}],
		phone: '(877) 287-8634',
		fax: '(715) 831-8712',
	},
	{
		name: 'ARIES AUTOMOTIVE TORONTO AREA',
		address: [{
			address1: '317 Rutherford Rd South Unit A',
			address2: '',
			city: 'Brampton',
			state: 'Ontario',
			zip: 'L6W 3R5',
		}],
		phone: '(877) 287-8634',
		fax: '(715) 831-8712',
	},
	{
		name: 'ARIES AUTOMOTIVE DALLAS AREA',
		address: [{
			address1: '2611 Regent Boulevard',
			address2: 'Suite 300',
			city: 'DFW Airport',
			state: 'TX',
			zip: '75261',
		}],
		phone: '(972) 456-0222',
		fax: '(972) 352-2617',
	},
];

module.exports.main = {
	physical: {
		name: 'ARIES AUTOMOTIVE HEADQUARTERS',
		address: {
			address1: '6208 Industrial Drive',
			address2: '',
			city: 'Eau Claire',
			state: 'WI',
			zip: '54701',
		},
	},
	phone: {
		pretty: '(888) 265-5615',
		ugly: 'tel:+18882655615',
	},
	local: {
		pretty: '(715) 831-8713',
		ugly: 'tel:+17158318713',
	},
	fax: {
		pretty: '(715) 831-8712',
		ugly: 'tel:+17158318712',
	},
};
