import { atomFamily, atom, selector } from 'recoil';

//Cards state handling
export const cardListState = atom({
    key: 'cards',
    default: []
});

//Card item state handling
export const cardItemState = atomFamily({
    key: 'card',
    default: {id: '', url: '', points: 0, vote: 0}
})

export const selectedCardIdState = atom({
    key: 'selectedCardId',
    default: null
})

export const selectedCardState = selector({
    key: 'selectedCard',
    get: ({get}) => {
        const id = get(selectedCardIdState);

        if(id != null) {
            return get(cardItemState(id));
        }
    },
    set: ({set, get}, newCardValue) => {
        const id = get(selectedCardIdState);

        if(id != null) {
            set(cardItemState(id), newCardValue);
        }
    }
});