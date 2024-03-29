/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ForkEffect,
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import * as types from "./type";
import { AxiosError, AxiosResponse } from "axios";
import { walletRequests } from "../../services/wallet";
import { IGetWalletResponse } from "../../interfaces/wallet";

type SagaEffect = CallEffect | PutEffect<{ type: string; payload: any }>;

export function* handleGetWalletAction({
  payload,
}: types.GetWalletAction): Generator<
  SagaEffect,
  void,
  AxiosResponse<IGetWalletResponse>
> {
  const { onSuccess, onFailed } = payload;

  try {
    const response: AxiosResponse<IGetWalletResponse> = yield call(
      walletRequests.getWalletApi,
      payload
    );
    const { data } = response;

    yield put({
      type: types.GET_WALLET_SUCCESS,
      payload: data,
    });

    if (onSuccess) onSuccess(response);
  } catch (err) {
    const error = err as AxiosError;
    const payload = error;

    yield put({ type: types.GET_WALLET_FAILED, payload });

    if (onFailed) onFailed(err as AxiosError);
  }
}

function* handleWalletCashInAction({ payload }: types.WalletCashInAction) {
  const { onSuccess, onFailed } = payload;

  try {
    const response: AxiosResponse<IGetWalletResponse> = yield call(
      walletRequests.walletCashInApi,
      payload
    );
    const { data } = response;

    yield put({
      type: types.WALLET_CASH_IN_SUCCESS,
      payload: data,
    });

    if (onSuccess) onSuccess(response);
  } catch (err) {
    const error = err as AxiosError;
    const payload = error;

    yield put({ type: types.WALLET_CASH_IN_FAILED, payload });

    if (onFailed) onFailed(err as AxiosError);
  }
}

function* handleWalletDebitAction({ payload }: types.WalletDebitAction) {
  const { onSuccess, onFailed } = payload;

  try {
    const response: AxiosResponse<IGetWalletResponse> = yield call(
      walletRequests.walletDebitApi,
      payload
    );
    const { data } = response;

    console.log("kame may ari neto", data);

    yield put({
      type: types.WALLET_DEBIT_SUCCESS,
      payload: data,
    });

    if (onSuccess) onSuccess(response);
  } catch (err) {
    const error = err as AxiosError;
    const payload = error;

    yield put({ type: types.WALLET_DEBIT_FAILED, payload });

    if (onFailed) onFailed(err as AxiosError);
  }
}

export const walletSaga: ForkEffect[] = [
  takeLatest(types.GET_WALLET_REQUEST, handleGetWalletAction),
  takeLatest(types.WALLET_CASH_IN_REQUEST, handleWalletCashInAction),
  takeLatest(types.WALLET_DEBIT_REQUEST, handleWalletDebitAction),
];
