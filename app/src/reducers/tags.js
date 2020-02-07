import {
  RECEIVE_TAGS,
} from '../actions/tags';

const tagsObject = {};

export default function tags(state = { tags: [] }, action) {
  switch (action.type) {
    case RECEIVE_TAGS:
      Object.keys(action.tags).map((i) => { // eslint-disable-line array-callback-return
        if (action.tags[i].id) {
          tagsObject[action.tags[i].id] = action.tags[i];
        }
      });
      return Object.assign({}, state, {
        tags: tagsObject,
      });
    default:
      return state;
  }
}
