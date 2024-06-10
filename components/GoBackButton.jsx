import React from 'react';
import { ChevronLeft,ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Button } from './ui/button';


const GoBackButton = () => {
  const router = useRouter();

  const onClick = () => {
     router.replace('/')
  }

  return (
    <div>
    <Button variant="outline" className=" mx-3 my-4 text-primary" size="icon" onClick={onClick}>
      <ChevronLeft></ChevronLeft>
      </Button>
    </div>
  )
};

/* 
  <Link href="/" prefetch={false}
     className="fixed top-4 left-4 inline-flex items-center text-lg font-semibold text-primary">
        <ChevronLeft className="text-lg font-semibold" />
        Go Back
    </Link>
*/

export default GoBackButton;
