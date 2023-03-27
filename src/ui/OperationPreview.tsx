import * as React from 'react';

import { Flex, Heading, Text } from 'fontoxml-design-system/src/components';
import { scrollContainer } from 'fontoxml-design-system/src/system';

import type { OperationViewModel } from '../types';
import OperationPreviewImage from './OperationPreviewImage';

const styles = [
	scrollContainer('m'),
	{
		minWidth: 0,
		maxWidth: '22rem',
	},
];

type Props = {
	operation: OperationViewModel;
};

const OperationPreview: React.FC<Props> = ({ operation }) => (
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
