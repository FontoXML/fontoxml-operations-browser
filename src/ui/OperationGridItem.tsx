import { ContainedImage, Flex, GridItem, Text } from 'fds/components';
import React from 'react';

const styles = {
	boxShadow: [
		'0 0 0 2px white',
		'0 0 0 3px rgba(0,0,0,.25)',
		'0 8px 8px -4px rgba(0,0,0,.25)',
	].join(', '),
};

const OperationGridItem = ({
	item,
	isDisabled,
	isSelected,
	onClick,
	onDoubleClick,
}) => (
	<GridItem
		isDisabled={isDisabled || item.isDisabled}
		isSelected={isSelected}
		onClick={onClick}
		onDoubleClick={onDoubleClick}
	>
		<Flex flexDirection="column" applyCss={styles}>
			<ContainedImage src={item.image} />
		</Flex>

		<Text align="center">{item.label}</Text>
	</GridItem>
);

export default OperationGridItem;
