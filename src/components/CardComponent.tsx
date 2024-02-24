'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import api from '@/axios';

const formSchema = z.object({
  name: z.string(),
  amount: z.string().refine((value) => /^[1-9]\d{2,}$/.test(value), {
    message: 'Amount must be a number greater than 100',
  }),
  currency: z.enum(['INR', 'USD', 'EUR']),
  description: z.string().min(1),
  email: z.string().email(),
  contact: z.string().regex(/^\d{10}$/),
});

export default function CardComponent() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: '0',
      currency: '',
      description: '',
      email: '',
      contact: '',
    },
  });

  const currency = form.watch('currency');

  const handleSubmit = async (values: any) => {
    const updatedValues = {
      ...values,
      sms_notification: false,
      email_notification: false,
      reminder_enable: false,
    };
    try {
      const queryString = new URLSearchParams(updatedValues).toString();
      await api.post(`/payment/?${queryString}`, null, {
        headers: {
          username: 'admin',
          password: 'test@123',
          Authorization: 'Basic YWRtaW46dGVzdEAxMjM=',
        },
      });
      toast({
        variant: 'success',
        title: 'Yayy Success!',
        description: 'Form submitted Successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submit Failed',
        description: `${error}`,
      });
    }
  };

  return (
    <Card className='mt-15 w-[450px] h-fit'>
      <CardHeader>
        <CardTitle className='text-lg'>Create Payment</CardTitle>
        <CardDescription>Create your new payment in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className='grid w-full items-center gap-2 text-sm'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm'>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your name'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm'>Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter the amount'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='currency'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm'>Currency</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='select a currency' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position='popper'>
                        <SelectItem value='INR'>INR</SelectItem>
                        <SelectItem value='USD'>USD</SelectItem>
                        <SelectItem value='EUR'>EUR</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm'>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter description'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm'>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter email'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='contact'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm'>Contact</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter contact'
                        type='tel'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-4 flex justify-between'>
              <Button variant='outline' type='button'>
                Cancel
              </Button>
              <Button type='submit'>Create Payment</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
