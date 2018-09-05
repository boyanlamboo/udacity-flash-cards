export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const getDecks = decks => ({
    type: GET_DECKS,
    decks,
});

export const addDeck = ({ title }) => ({
    type: ADD_DECK,
    title,
});

export const addCard = params => ({
    type: ADD_CARD,
    params,
});