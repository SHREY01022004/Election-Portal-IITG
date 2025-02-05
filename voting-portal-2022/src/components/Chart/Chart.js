import React, {useState} from 'react';
import DonutChart from 'react-donut-chart';
const Chart = (props) => {
  
    const fill = props.fill;
    const empty = props.empty;

  return (
   <>
    <DonutChart
  data={[
    {
      label: '10',
      value: {fill}
      
    },
    {
    //   label: '',
      value: {empty},
      isEmpty: true,
    },
  ]} legend={false} colors={'#218739'} emptyColor={'#34D058'} height={64} width={64}
/>;
   </>
  );
}

export default Chart;