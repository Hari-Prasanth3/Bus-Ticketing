import React from 'react'
import { TextField,FormControl } from '@mui/material'
import dayjs from 'dayjs';
import { DemoContainer,DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Button } from '@material-tailwind/react';
const SearchScreen = () => {
  // const [trips, setTrips] = useState([]);

  // useEffect(()=>{
  //   const fetchTrips = async () => {
  //     const {data} = await axios.post('/api/Trips');
  //     setTrips(data);
  //     console.log(data);
  //   }
  //   fetchTrips();
  // },[]);
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <>
     <div>
     <FormControl
      className='grid grid-cols-4 p-10  m-auto justify-center  w-[75%]'
    >
      <TextField id="outlined-basic" label="From" variant="outlined" className='mt-[8px]' />
      <TextField id="filled-basic" label="To" variant="outlined" className='mt-[8px]' />
      {/* <TextField id="standard-basic" label="Standard" variant="outlined" /> */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          
          'DesktopDatePicker',
          
        ]}
      >
        <DemoItem label="">
          <DesktopDatePicker defaultValue={dayjs('2022-04-17')} />
        </DemoItem>
     
      </DemoContainer>
    </LocalizationProvider>
    <Button className='text-sm font-semibold text-white bg-blue-600 rounded shadow-md border-2 border-blue-600 md:text-base hover:bg-white hover:text-blue-900 mt-2'>Search</Button>
    </FormControl>

    </div>

    </>
  )
}

export default SearchScreen