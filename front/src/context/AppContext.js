import React, { createContext, useReducer } from 'react';

export const AppReducer = (state, action) => {
	const {type, dispatch} = action;
	switch (type) {
		
		default:
			return state;
	}
};

// 1. Sets the initial state when the app loads
const initialState = {
	current_user_id: null,
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
	// 4. Sets up the app state. takes a reducer, and an initial state
	const [state, dispatch] = useReducer(AppReducer, initialState);
	let remaining = 0;

	if (state.expenses) {
			const totalExpenses = state.expenses.reduce((total, item) => {
			return (total = total + item.cost);
		}, 0);
		remaining = state.budget - totalExpenses;
	}

	return (
		<AppContext.Provider
			value={{
				expenses: state.expenses,
				budget: state.budget,
				remaining: remaining,
				dispatch,
				currency: state.currency
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
