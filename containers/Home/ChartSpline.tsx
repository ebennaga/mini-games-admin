import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';

interface ChartSplineProps {
    dataChart: any;
    labels: any;
}

const ChartSpline: React.FC<ChartSplineProps> = ({ dataChart, labels }) => {
    const [dataSets, setDataSets] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        let arr: any = [];
        // eslint-disable-next-line array-callback-return
        dataChart.map((item: any, index: number) => {
            const obj = {
                label: item.label,
                fill: false,
                lineTension: 0.3,
                backgroundColor: item.color,
                borderColor: item.color,
                // borderCapStyle: 'butt',
                // borderDash: [],
                // borderDashOffset: 0.0,
                // borderJoinStyle: 'miter',
                // pointBorderColor: item.color,
                // pointBackgroundColor: 'red',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: item.color,
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: item.value
            };
            arr = [...arr, obj];

            if (index === dataChart.length - 1) {
                setDataSets(arr);
            }
        });
    }, []);

    const options: any = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false
        },
        scaleShowVerticalLines: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    boxWidth: 40,
                    padding: 45,
                    pointStyle: 'circle',
                    usePointStyle: true
                },
                title: {
                    padding: 5
                }
            }
        },
        element: {
            point: {
                radius: 5
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true
            }
        }
    };

    const data: any = {
        labels,
        datasets: dataSets
    };

    return (
        <Box>
            <Line options={options} data={data} />
        </Box>
    );
};

export default ChartSpline;
