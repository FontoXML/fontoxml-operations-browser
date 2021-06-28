import { Flex, Heading, Text } from 'fds/components';
import { scrollContainer } from 'fds/system';
import React from 'react';

import OperationPreviewImage from './OperationPreviewImage';

const styles = [
	scrollContainer('m'),
	{
		minWidth: 0,
		maxWidth: '22rem',
	},
];

const OperationPreview = ({ operation }) => (
	<Flex applyCss={styles} flexDirection="column">
		<OperationPreviewImage imageSrc={operation.image} />

		<Flex flex="none" flexDirection="column" spaceSize="m">
			<Heading level="4" isBold align="center">
				{operation.label}
			</Heading>

			{operation.description && (
				<Text align="center">{operation.description}</Text>
			)}
		</Flex>
	</Flex>
);

export default OperationPreview;
