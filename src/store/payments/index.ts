'use client';

// ** Redux Imports
import { Dispatch } from 'redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import api from '../../axios';

interface Redux {
  getState: any;
  dispatch: Dispatch<any>;
}

// ** Fetch payment data
export const fetchAllPayments = createAsyncThunk(
  'payment/fetchAllPayments',
  async () => {
    const response = await api.get('/payment/');

    return response.data.data;
  }
);

export const PaymentSlice = createSlice({
  name: 'PaymentSlice',
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAllPayments.fulfilled, (state, action) => {
      console.log('Payment data:', action.payload);
    });
  },
});

export const {} = PaymentSlice.actions;

export default PaymentSlice.reducer;
