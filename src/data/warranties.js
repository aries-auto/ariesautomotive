import React from 'react';
module.exports = {
	addressHtml: (
		<div>
			<p>ATTN: WARRANTY DEPT.</p>
			<p></p>
			<p>ARIES AUTOMOTIVE</p>
			<p>2611 Regent Boulevard</p>
			<p>Suite 300</p>
			<p>DFW Airport, TX 75261 USA</p>
			<p></p>
			<p>Phone: (888) 635-9824</p>
			<p></p>
			<p>Fax: (972) 352-2617</p>
			<p>Email: <a href="mailto:customerservice@ariesautomotive.com">customerservice@ariesautomotive.com</a></p>
		</div>
	),
	registrationStickerHtml: (
		<span>
			<a href="https://www.curtmfg.com/assets/aries/warranty/bullbarregistrationsticker.jpg" target="blank">Bull Bar | </a>
			<a href="https://www.curtmfg.com/assets/aries/warranty/grillguardregistrationsticker.jpg" target="blank">Grill Guard | </a>
			<a href="https://www.curtmfg.com/assets/aries/warranty/sidebarregistrationsticker.jpg" target="blank">Side Bar</a>
		</span>
	),
};


module.exports.fields = [
	{
		type: 'text',
		label: 'Enter your first name:',
		placeholder: 'Enter your first name.',
		name: 'firstName',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your last name:',
		placeholder: 'Enter your last name.',
		name: 'lastName',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your street address:',
		placeholder: 'Enter your street address.',
		name: 'address1',
		width: '12',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your city:',
		placeholder: 'Enter your city.',
		name: 'city',
		width: '12',
		required: true,
	},
	{
		type: 'country',
		label: 'Enter your country',
		placeholder: 'Select Country',
		name: 'country',
		options: '',
		width: '6',
		required: true,
	},
	{
		type: 'state',
		label: 'Enter your state/province',
		placeholder: 'Select State / Province',
		name: 'state',
		options: '',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your postal code',
		placeholder: 'Enter your postal code.',
		name: 'postalCode',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your phone number:',
		placeholder: 'Enter your phone number.',
		name: 'phone',
		width: '6',
		required: true,
	},
	{
		type: 'email',
		label: 'Enter your email address:',
		placeholder: 'Enter your email address.',
		name: 'email',
		width: '12',
		required: true,
	},
];


module.exports.fields2 = [
	{
		type: 'text',
		label: 'Part Number:',
		placeholder: 'Enter a part number.',
		name: 'partNumber',
		width: '6',
		required: true,
	},
	{
		type: 'date',
		label: 'Date',
		name: 'date',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Serial Number:',
		placeholder: 'Enter serial number.',
		name: 'serialNumber',
		width: '6',
		required: true,
	},
];
