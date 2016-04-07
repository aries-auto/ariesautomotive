import React from 'react';

export const locations = [
	{
		name: 'ARIES AUTOMOTIVE HEADQUARTERS - DALLAS AREA',
		address: [{
			heading: 'Physical Address',
			address1: '2611 Regent Boulevard',
			address2: 'Suite 300',
			city: 'DFW Airport',
			state: 'TX',
			zip: '75261',
		}, {
			heading: 'Mailing Address',
			address1: 'PO BOX 1598',
			city: 'Grapevine',
			state: 'TX',
			zip: '76051',
		}],
		tollFree: '(888)635-9824',
		local: '(972)456-0222',
		fax: '(972)352-2617',
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
		phone: '(888)635-9824',
		fax: '(972)352-2617',
	},
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

export const locationHtml = () =>
					<div className="locations-list">
						<div className="well">
							<address itemType="//schema.org/Organization">
								<div className="body">
									<span className="addressname" itemProp="name">ARIES AUTOMOTIVE HEADQUARTERS - DALLAS AREA</span>
									<div className="col-md-12 addresses-container">
										<div className="col-md-6" itemProp="address" itemType="//schema.org/PostalAddress">
											<strong>Physical Address</strong><br />
											<span itemProp="streetAddress">2611 Regent Boulevard</span>
											<br />
											<span itemProp="suite">Suite 300</span>
											<br />
											<span itemProp="addressLocality">DFW Airport</span>,
											<span itemProp="addressRegion">TX</span>
											<span itemProp="postalCode">75261</span>
										</div>
										<div className="col-md-6" itemProp="address" itemType="//schema.org/PostalAddress">
											<strong>Mailing Address</strong><br />
											<span itemProp="streetAddress">PO BOX 1598</span>
											<br />
											<span itemProp="addressLocality">Grapevine</span>,
											<span itemProp="addressRegion">TX</span>
											<span itemProp="postalCode">76051</span>
										</div>
									</div>
									<br />
									Toll Free: <a href="tel:+18886359824" itemProp="telephone">(888) 635-9824</a><br />
									Local: <a href="tel:+19724560222" itemProp="telephone">(972) 456-0222</a><br />
									Fax: <a href="tel:+19723522617" itemProp="faxNumber">(972) 352-2617</a><br />
								</div>
							</address>
						</div>
						<div className="well">
							<address itemType="//schema.org/Organization">
								<div className="body">
									<span className="addressname" itemProp="name">ARIES AUTOMOTIVE DALLAS AREA</span>
									<div itemProp="address" itemType="//schema.org/PostalAddress">
										<span itemProp="streetAddress">2611 Regent Boulevard</span>
										<br />
										<span itemProp="suite">Suite 300</span>
										<br />
										<span itemProp="addressLocality">DFW Airport</span>,
										<span itemProp="addressRegion">TX</span>
										<span itemProp="postalCode">75261</span>
									</div>
									Phone: <a href="tel:+18886359824" itemProp="telephone">(888) 635-9824</a><br />
									Fax: <a href="tel:+19723522617" itemProp="faxNumber">(972) 352-2617</a><br />
								</div>
							</address>
						</div>
						<div className="well">
							<address itemType="//schema.org/Organization">
								<div className="body">
									<span className="addressname" itemProp="name">ARIES AUTOMOTIVE ATLANTA AREA</span>
									<div itemProp="address" itemType="//schema.org/PostalAddress">
										<span itemProp="streetAddress">110 Northpoint Parkway Suite 200</span>
										<br />
										<span itemProp="addressLocality">Acworth</span>,
										<span itemProp="addressRegion">GA</span>
										<span itemProp="postalCode">30102</span>
									</div>
									Phone: <a href="tel:+18665282878" itemProp="telephone">(866) 528-2878</a><br />
									Fax: <a href="tel:+18665292878" itemProp="faxNumber">(866) 529-2878</a><br />
								</div>
							</address>
						</div>
						<div className="well">
							<address itemType="//schema.org/Organization">
								<div className="body">
									<span className="addressname" itemProp="name">ARIES AUTOMOTIVE EDMONTON AREA</span>
									<div itemProp="address" itemType="//schema.org/PostalAddress">
										<span itemProp="streetAddress">12820 184th Street NW</span>
										<br />
										<span itemProp="addressLocality">Edmonton</span>,
										<span itemProp="addressRegion">Alberta</span>
										<span itemProp="postalCode">T5V 1T4</span>
									</div>
									Phone: <a href="tel:+18772878634" itemProp="telephone">(877) 287-8634</a><br />
									Fax: <a href="tel:+17158318712" itemProp="faxNumber">(715) 831-8712</a><br />
								</div>
							</address>
						</div>
						<div className="well">
							<address itemType="//schema.org/Organization">
								<div className="body">
									<span className="addressname" itemProp="name">ARIES AUTOMOTIVE SEATTLE AREA</span>
									<div itemProp="address" itemType="//schema.org/PostalAddress">
										<span itemProp="streetAddress">2108 'B' Street NW Suite 120</span>
										<br />

										<span itemProp="addressLocality">Auburn</span>,
										<span itemProp="addressRegion">WA</span>
										<span itemProp="postalCode">98001</span>
									</div>
									Phone: <a href="tel:+18772878634" itemProp="telephone">(877) 287-8634</a><br />
									Fax: <a href="tel:+17158318712" itemProp="faxNumber">(715) 831-8712</a><br />
								</div>
							</address>
						</div>
						<div className="well">
							<address itemType="//schema.org/Organization">
								<div className="body">
									<span className="addressname" itemProp="name">ARIES AUTOMOTIVE TORONTO AREA</span>
									<div itemProp="address" itemType="//schema.org/PostalAddress">
										<span itemProp="streetAddress">317 Rutherford Rd South Unit A</span>
										<br />
										<span itemProp="addressLocality">Brampton</span>,
										<span itemProp="addressRegion">Ontario</span>
										<span itemProp="postalCode">L6W 3R5</span>
									</div>
									Phone: <a href="tel:+18772878634" itemProp="telephone">(877) 287-8634</a><br />
									Fax: <a href="tel:+17158318712" itemProp="faxNumber">(715) 831-8712</a><br />
								</div>
							</address>
						</div>
						<div className="techsupport"><h4>TECH SUPPORT HOTLINE: <a href="tel:+18888002743">(888) 800-2743</a></h4></div>
					</div>;
