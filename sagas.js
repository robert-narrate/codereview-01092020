import Narrate from '@narrate/sdk';
import { takeEvery, put } from 'redux-saga/effects';
import { routineSaga, sendTo } from 'utils/sagas';
import Actions from 'actions';
import Platform from 'react-native';

const { posts } = Actions;

function getPriceInCents(priceString) {
  const match = priceString.replace(/[^\d.]/g, '').split('.');
  const dollars = parseInt(match[0], 10);
  let cents = match[1] || '00';
  cents = parseInt(cents, 10);

  return dollars * 100 + cents;
}

class PostsSaga {
  create = routineSaga({
    routine: posts.create,
    *request({ payload: { values, onSuccess, accessImage, accessImageMeta } }) {
      values.amount = getPriceInCents(values.price);
      if (values.quantity) {
        values = {
          ...values,
          quantity: parseInt(values.quantity, 10),
        };
      }
      yield Narrate.api.accessBlock.save(values);
      onSuccess();
    },
  });
}

const saga = new PostsSaga();

export default function* combined() {
  yield takeEvery(posts.create.trigger, saga.create);
}
