'use client';

import PageTitle from '@/components/PageTitle';
import RootLayout from '../layout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPayments } from '@/store/payments';
import { AppDispatch, RootState } from '@/store/store';

export default function PaymentList() {
  const dispatch = useDispatch<AppDispatch>();
  const filteredPaymentList = useSelector(
    (state: RootState) => state.Payment.filteredPaymentList
  );

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(fetchAllPayments())]);
    };

    fetchData();
  }, [dispatch]);

  return (
    <RootLayout>
      <div className='flex flex-col border-b pb-2 mb-4'>
        <PageTitle title='Payment List' />
        <p className='text-sm text-gray-600 tracking-tight'>
          A list of your recent Payments.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className='text-left'>
            <TableHead>No. of Payments</TableHead>
            <TableHead>Payment ID</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Payment Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPaymentList.slice(0, 16).map((payment: any, index) => (
            <TableRow key={index} className='text-left'>
              <TableCell>{index + 1}</TableCell>
              <TableCell className='font-medium'>{payment.id}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell>{payment.customer.name}</TableCell>
              <TableCell>{payment.customer.contact}</TableCell>
              <TableCell>${payment.amount.toFixed(2)}</TableCell>
              <TableCell>{payment.created_at}</TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell>
                <a href={payment.short_url} target='_blank'>
                  {payment.short_url}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className='flex justify-end'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </RootLayout>
  );
}
