import {createComparison, defaultRules} from "../lib/compare.js";


const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {

    // @todo: #4.1 — заполнить выпадающие списки опциями

    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            })
        );
    });

    return (data, state, action) => {

        // @todo: #4.2 — обработать очистку поля

        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const input = action.parentElement.querySelector('input');

            input.value = '';
            state[field] = '';
        }

        // Подготавливаем диапазон суммы
        const filterState = {
            ...state,
            total: [state.totalFrom, state.totalTo]
        };

        delete filterState.totalFrom;
        delete filterState.totalTo;

        // @todo: #4.5 — применить фильтрацию

        return data.filter(row => compare(row, filterState));
    }
}
