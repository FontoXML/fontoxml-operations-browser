import React from 'react';

import { ContainedImage, Flex } from 'fds/components';
import { marginVertical } from 'fds/system';

const styles = [
	marginVertical('l'),
	{ alignSelf: 'center' },
	{
		boxShadow: [
			'0 0 0 2px white',
			'0 0 0 3px rgba(0,0,0,.25)',
			'0 8px 8px -4px rgba(0,0,0,.25)',
		].join(', '),
	},
];

const OperationPreviewImage = ({ imageSrc }) => (
	<Flex flex="none" applyCss={styles}>
		<ContainedImage src={imageSrc} />
	</Flex>
);

export default OperationPreviewImage;
