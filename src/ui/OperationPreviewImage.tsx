import type { FC } from 'react';

import { ContainedImage, Flex } from 'fontoxml-design-system/src/components';
import { marginVertical } from 'fontoxml-design-system/src/system';

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

type Props = {
	imageSrc: string;
};

const OperationPreviewImage: FC<Props> = ({ imageSrc }) => (
	<Flex flex="none" applyCss={styles}>
		<ContainedImage src={imageSrc} />
	</Flex>
);

export default OperationPreviewImage;
