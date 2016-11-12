export const SET_DICTIONARY_WORD = 'SET_DICTIONARY_WORD';

export function setDictionaryWord(word) {
	return {
		type: SET_DICTIONARY_WORD,
		word: word
	};
}
