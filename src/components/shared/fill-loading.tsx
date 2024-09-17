import {ImSpinner3 } from 'react-icons/im'
import { Skeleton } from '../ui/skeleton';

const FillLoading = () => {
    return (
        <Skeleton className='absolute w-full h-full inset-0 flex justify-center items-center bg-opacity-30 z-30'>
            <ImSpinner3 className='animate-spin' size={25} />
        </Skeleton>
    );
};

export default FillLoading;
