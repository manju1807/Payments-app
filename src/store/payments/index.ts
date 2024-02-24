'use client';

// ** Redux Imports
import { Dispatch } from 'redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import api from '../../axios';
import PaymentList from '@/app/payment-list/page';

interface Redux {
  getState: any;
  dispatch: Dispatch<any>;
}

interface Customer {
  contact: string;
  email: string;
  name: string;
}

interface Notify {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
}

interface PaymentData {
  accept_partial: boolean;
  amount: number;
  amount_paid: number;
  cancelled_at: number;
  created_at: number;
  currency: string;
  customer: Customer;
  description: string;
  expire_by: number;
  expired_at: number;
  first_min_partial_amount: number;
  id: string;
  notes: any[];
  notify: Notify;
  payments: any[] | null;
  reference_id: string;
  reminder_enable: boolean;
  reminders: any[];
  short_url: string;
  status: string;
  updated_at: number;
  upi_link: boolean;
  user_id: string;
  whatsapp_link: boolean;
}

interface PaymentState {
  PaymentList: PaymentData[];
  filteredPaymentList: PaymentData[];
}

// ** Fetch payment data
export const fetchAllPayments = createAsyncThunk(
  'payment/fetchAllPayments',
  async () => {
    try {
      const response = await api.get('/payment/', {
        headers: {
          username: 'admin',
          password: 'test@123',
          Authorization: 'Basic YWRtaW46dGVzdEAxMjM=',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  }
);

export const PaymentSlice = createSlice({
  name: 'PaymentSlice',
  initialState: {
    totalAmount: 0,
    totalExecuted: 0,
    totalFailed: 0,
    totalCreated: 0,
    recentTransactions: [] as any[],
    PaymentList: [] as PaymentState[],
    filteredPaymentList: [] as PaymentState[],
  },
  reducers: {
    processPaymentList: (state) => {
      state.PaymentList.forEach((payment: any) => {
        state.totalAmount += payment.amount;
        if (payment.status === 'created') {
          state.totalCreated++;
          state.recentTransactions.push({
            customer: payment.customer.name,
            contact: payment.customer.contact,
            amount: payment.amount,
          });
        } else if (payment.status === 'executed') {
          state.totalExecuted++;
        } else if (payment.status === 'failed') {
          state.totalFailed++;
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllPayments.fulfilled, (state, action) => {
      state.PaymentList = action.payload.payment_links;
      const PaymentList: PaymentState[] = action.payload.payment_links;
      const extractedFields: any[] = PaymentList.map((paymentList: any) => {
        return {
          amount: paymentList.amount,
          customer: {
            name: paymentList.customer?.name || '',
            contact: paymentList.customer?.contact || '',
          },
          description: paymentList.description || '',
          created_at: paymentList.created_at || '',
          status: paymentList.status || '',
          short_url: paymentList.short_url || '',
          id: paymentList.id || '',
        };
      });
      state.filteredPaymentList = extractedFields;
    });
  },
});

export const { processPaymentList } = PaymentSlice.actions;

export default PaymentSlice.reducer;
