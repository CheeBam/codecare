import { mapMutationsFromTypes } from 'schepotin-vuex-helpers';
import * as types from './mutation-types';

export default {
    /**
     * Generates {@link https://vuex.vuejs.org/en/mutations.html | mutations} from
     * {@link https://vuex.vuejs.org/en/mutations.html#using-constants-for-mutation-types | mutation types}
     *
     * Documentation
     * {@link https://www.npmjs.com/package/schepotin-vuex-helpers#mapmutationsfromtypes | mapMutationsFromTypes}
     */
    ...mapMutationsFromTypes({
        types,
        excludes: [
            types.ITEM,
        ],
    }),
    [types.ITEM](state, payload) {
        state.id = payload.id;
        state.title = payload.title;
        state.start = payload.start;
        state.duration = payload.duration;
        state.createdAt = payload.created_at;
    },
};
