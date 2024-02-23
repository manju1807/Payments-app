import RootLayout from '../layout';
import Image from 'next/image';
import Img1 from '../../../public/cards2.png';
import CardComponent from '@/components/CardComponent';

export default function CreatePayment() {
  return (
    <RootLayout>
      <div className='flex h-[90vh] w-full flex-col items-center justify-center space-y-4'>
        <h1 className='w-11/12 text-left text-xl font-semibold'>
          Create Payment
        </h1>
        <div className='flex h-[80%] w-11/12 flex-row items-center justify-center rounded-md'>
          <div className='flex h-full w-full flex-1 items-center justify-center rounded-md bg-violet-400'>
            <Image src={Img1} alt='' />
          </div>
          <div className='flex h-full w-full flex-1 items-center justify-center rounded-md bg-slate-100'>
            <CardComponent />
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
