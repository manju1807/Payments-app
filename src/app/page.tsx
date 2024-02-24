/** @format */
'use client';

import PageTitle from '@/components/PageTitle';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import Card, { CardContent, CardProps } from '@/components/Card';
import BarChart from '@/components/BarChart';
import SalesCard, { SalesProps } from '@/components/SalesCard';
import RootLayout from './layout';
import { Button } from '@/components/ui/button';
import { CalendarDateRangePicker } from '@/components/CalendarDateRangePicker';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPayments } from '@/store/payments';
import { AppDispatch, RootState } from '@/store/store';
import { processPaymentList } from '../store/payments/index';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    totalAmount,
    totalCreated,
    totalExecuted,
    totalFailed,
    recentTransactions,
  } = useSelector((state: RootState) => state.Payment);

  const cardData: CardProps[] = [
    {
      label: 'Total Transactions Amount',
      amount: totalAmount.toString(),
      discription: '+20.1% from last month',
      icon: DollarSign,
    },
    {
      label: 'Total Created',
      amount: totalCreated.toString(),
      discription: 'Total number of transactions created',
      icon: Users,
    },
    {
      label: 'Total Executed',
      amount: totalExecuted.toString(),
      discription: 'Total number of transactions executed',
      icon: CreditCard,
    },
    {
      label: 'Total Failed',
      amount: totalFailed.toString(),
      discription: 'Total number of transactions failed',
      icon: Activity,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllPayments());
      dispatch(processPaymentList());
    };
    fetchData();
  }, [dispatch]);

  return (
    <RootLayout>
      <div className='flex flex-col gap-5  w-full max-w-screen'>
        <section className='flex flex-col gap-4 md:gap-0 md:flex-row justify-between border-b pb-4'>
          <PageTitle title='Dashboard' />
          <div className='flex items-center space-x-2'>
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </section>
        <section className='grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4'>
          {cardData.map((d, i) => (
            <Card
              key={i}
              amount={d.amount}
              discription={d.discription}
              icon={d.icon}
              label={d.label}
            />
          ))}
        </section>
        <section className='grid grid-cols-1  gap-4 transition-all lg:grid-cols-2'>
          <CardContent>
            <p className='font-semibold'>Overview</p>
            <BarChart />
          </CardContent>
          <CardContent className='flex justify-between gap-4'>
            <section>
              <p className='font-semibold'>Recent Transactions</p>
              <p className='text-xs text-gray-400'>
                Here are the recent transactions
              </p>
            </section>
            {recentTransactions.slice(0, 6).map((d, i) => (
              <SalesCard
                key={i}
                email={d.contact}
                name={d.customer}
                saleAmount={d.amount}
              />
            ))}
          </CardContent>
        </section>
      </div>
    </RootLayout>
  );
}
