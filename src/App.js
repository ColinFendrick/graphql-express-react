import React, { useState } from 'react';
import { Button, Container } from 'reactstrap';

import { PostViewer, PostEditor } from './components';

export default () => {
	const [state, setState] = useState({ editing: null });

	return (
		<Container fluid>
			<Button
				className='my-2'
				color='primary'
				onClick={() => setState({ editing: {}})}
			>
				New Post
			</Button>
			<PostViewer
				canEdit={() => true}
				onEdit={post => setState({ editing: post })}
			/>
			{state.editing && (
				<PostEditor
					post={state.editing}
					onClose={() => setState({ editing: null })}
				/>
			)}
		</Container>
	);
};
