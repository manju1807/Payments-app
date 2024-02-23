import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CardComponent() {
  return (
    <Card className='mt-15 w-[450px]'>
      <CardHeader>
        <CardTitle className='text-lg'>Create Payment</CardTitle>
        <CardDescription>Create your new payment in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Name of your project' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='amount'>Amount</Label>
              <Input id='amount' type='number' placeholder='Enter amount' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='currency'>Currency</Label>
              <Input id='currency' placeholder='Enter currency' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='description'>Description</Label>
              <Input id='description' placeholder='Enter description' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='Enter email' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='contact'>Contact</Label>
              <Input id='contact' type='tel' placeholder='Enter contact' />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button>Create Payment</Button>
      </CardFooter>
    </Card>
  );
}
