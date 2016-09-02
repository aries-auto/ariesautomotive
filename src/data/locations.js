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
			address1: '12820 184th Street NW',
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
];

module.exports.main = {
	physical: {
		name: 'ARIES AUTOMOTIVE HEADQUARTERS - DALLAS AREA',
		address: {
			address1: '2611 Regent Boulevard',
			address2: 'Suite 300',
			city: 'DFW Airport',
			state: 'TX',
			zip: '75261',
		},
	},
	mailing: {
		address: {
			address1: 'PO BOX 1598',
			address2: '',
			city: 'Grapevine',
			state: 'TX',
			zip: '76051',
		},
	},
	phone: {
		pretty: '(888) 635-9824',
		ugly: 'tel:+18886359824',
	},
	local: {
		pretty: '(972) 456-0222',
		ugly: 'tel:+19724560222',
	},
	fax: {
		pretty: '(972) 352-2617',
		ugly: 'tel:+19723522617',
	},
};
