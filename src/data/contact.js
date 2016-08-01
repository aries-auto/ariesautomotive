import React from 'react';

module.exports.fields = [
	{
		type: 'contactType',
		label: 'What would you like to contact us about?',
		placeholder: 'Select reason',
		name: 'reason',
		width: '12',
		required: true,
	},
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
		label: 'Enter your email address:',
		placeholder: 'Enter your email address.',
		name: 'email',
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
		type: 'text',
		label: 'Enter the subject:',
		placeholder: 'Enter the subject.',
		name: 'subject',
		width: '12',
		required: true,
	},
	{
		type: 'textarea',
		label: 'Enter the message:',
		placeholder: 'Enter the message.',
		name: 'message',
		width: '12',
		required: true,
	},
];

module.exports.phone = (
	<a rel="canonical" href="tel:+18888002743">(888) 800-2743</a>
);
