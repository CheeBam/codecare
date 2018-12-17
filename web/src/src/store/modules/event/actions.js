import Event from '../../../api/Event';
import * as types from './mutation-types';

export const index = async ({commit}, params) => {
    const json = await new Event().index(params);

    commit(types.LIST, json);
};

export const show = async ({commit}, {id}) => {
    const json = await new Event().show(id);

    commit(types.ITEM, json);
};

export const store = async (context, {params}) => {
    await new Event().store(params);
};

export const destroy = async (context, { id }) => {
    await new Event().destroy(id);
};

export const downloadJson = async (context, { params }) => {
    await new Event().downloadJson(params);
};

export default {
    index,
    show,
    store,
    destroy,
    downloadJson,
};
