import React from 'react';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import { Form as FinalForm, Field } from 'react-final-form';

import client from '../apollo';
import { GET_POSTS, SUBMIT_POST } from '../gql';



export default ({ post, onClose }) => (
	<FinalForm
		onSubmit={async ({ id, body }) => {
			await client.mutate({
				variables: { input: { id, body }},
				mutation: SUBMIT_POST,
				refetchQueries: () => [{ query: GET_POSTS }],
			});

			onClose();
		}}
		initialValues={post}
		render={({ handleSubmit, pristine }) => (
			<Modal isOpen toggle={onClose}>
				<Form onSubmit={handleSubmit}>
					<ModalHeader toggle={onClose}>
						{post.id ? 'Edit Post' : 'New Post'}
					</ModalHeader>
					<ModalBody>
						<FormGroup>
							<Label>Body</Label>
							<Field
								required
								name='body'
								className='form-control'
								component='input'
							/>
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button type='submit' disabled={pristine} color='primary'>Save</Button>
						<Button color='secondary' onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)}
	/>
);
