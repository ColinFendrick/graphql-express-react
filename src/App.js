import React, { useState, useEffect } from 'react';
import { Button, Container } from 'reactstrap';

import { PostViewer, PostEditor } from './components';
import useAuth from './hooks/useAuth';

export default () => {
	const [state, setState] = useState({ editing: null });
	const { user, login, logout, loading, updateAuth, authState, authService } = useAuth();

	useEffect(() => updateAuth(), [authState, authService]);

	return (
		<>
			{loading ? null :	(<Container fluid>
				{user ? (
					<div>
						<Button
							className="my-2"
							color="primary"
							onClick={() => setState({ editing: {}})}
						>
							New Post
						</Button>
						<Button
							className="m-2"
							color="secondary"
							onClick={() => logout()}
						>
							Sign Out (signed in as {user.name})
						</Button>
					</div>
				) : (
					<Button
						className="my-2"
						color="primary"
						onClick={() => login()}
					>
						Sign In
					</Button>
				)}
				<PostViewer
					onChange={post => user && user.sub === post.author.id}
					onEdit={post => setState({ editing: post })}
					canEdit={() => Boolean(user)}
				/>
				{state.editing && (
					<PostEditor
						post={state.editing}
						onClose={() => setState({ editing: null })}
					/>
				)}
			</Container>)}
		</>

	);
};
