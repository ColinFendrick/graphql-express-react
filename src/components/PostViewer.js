import React from 'react';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

import { GET_POSTS } from '../gql';

export default ({ canEdit = () => false, onEdit = () => null }) => {
	return (
		<Query query={GET_POSTS}>
			{({ loading, data }) => !loading && (
				<Table>
					<thead>
						<tr>
							<th>Author</th>
							<th>Body</th>
						</tr>
					</thead>
					<tbody>
						{data.posts.map(post => (
							<tr
								key={post.id}
								className={canEdit ? 'editable' : ''}
								onClick={() => canEdit(post) && onEdit(post)}
							>
								<td>{post.author}</td>
								<td>{post.body}</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Query>
	);
};
