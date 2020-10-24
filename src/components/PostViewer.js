import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import { Table, Button } from 'reactstrap';

import client from '../apollo';
import { GET_POSTS, DELETE_POST } from '../gql';

export default ({ canEdit = () => false, onEdit = () => null }) => {
	const editable = canEdit();
	const deletePost = async id => {
		await client.mutate({
			variables: { id }, mutation: DELETE_POST
		});
	};

	const edit = post => canEdit(post) && onEdit(post);

	return <Query query={GET_POSTS}>
		{({ loading, data }) => !loading && (
			<Table>
				<thead>
					<tr>
						<th>Author</th>
						<th>Body</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data?.posts && data.posts.map(post => (
						<tr
							key={post.id}
							className={editable ? 'editable' : 'not-editable'}
						>
							<td onClick={() => edit(post)}>
								{post.author.name}
							</td>
							<td onClick={() => edit(post)}>
								{post.body}
							</td>
							<td>{editable && (
								<Button color='danger' onClick={() => deletePost(post.id)}>
									Delete
								</Button>
							)}</td>
						</tr>
					))}
				</tbody>
			</Table>
		)}
	</Query>;
};

