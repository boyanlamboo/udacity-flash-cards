import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return {...state, ...action.decks};

        case ADD_DECK:
            return {...state, 
									 	[action.title]: {questions: [], title: action.title}
									 };

        case ADD_CARD:
            const {title, question, answer} = action.params;
            const originalQuestions = state[title].questions
						const newQuestions = [
							...originalQuestions,
							{
								question,
								answer
							}
						]
            return {
                ...state,
                [title]: {...state[title], questions: newQuestions},
            };
        default:
            return state;
    }
}

export default decks;