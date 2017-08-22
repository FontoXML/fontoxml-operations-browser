import React from 'react';

import { Flex, Heading, Text } from 'fontoxml-vendor-fds/components';
import { scrollContainer } from 'fontoxml-vendor-fds/system';

import OperationPreviewImage from './OperationPreviewImage.jsx';

const styles = [
	scrollContainer('m'),
	{
		minWidth: 0,
		maxWidth: '22rem'
	}
];

const OperationPreview = ({ operation }) =>
	<Flex applyCss={styles} flexDirection="column">
		<OperationPreviewImage imageSrc={operation.image} />

		<Flex flex="none" flexDirection="column" spaceSize="m">
			<Heading level="4" isBold align="center">
				{operation.label}
			</Heading>

			{operation.description &&
				<Text align="center">
					{operation.description}
				</Text>}
		</Flex>
	</Flex>;

export default OperationPreview;
