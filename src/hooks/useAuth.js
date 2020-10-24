import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import { updateAuth as apolloUpdateAuth } from '../apollo';

export default () => {
	const [state, setState] = useState({
		authenticated: false,
		user: null,
		loading: true
	});
	const { authState, authService } = useOktaAuth();

	const updateAuth = async () => {
		apolloUpdateAuth({ authState, authService });
		const authenticated = await authState.isAuthenticated;
		if (authenticated !== state.authenticated) {
			const user = await authService.getUser();
			setState({ authenticated, user, loading: false });
		}
	};

	return {
		user: state.user,
		loading: state.loading,
		login: authService.login,
		logout: authService.logout,
		updateAuth,
		authState,
		authService
	};
};
