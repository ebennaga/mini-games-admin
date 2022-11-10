import React from 'react';
import { Bar } from 'react-chartjs-2';

interface ChartBarProps {
    dataChart: any;
}

const ChartBar: React.FC<ChartBarProps> = ({ dataChart }) => {
    const [dataSets, setDataSets] = React.useState<any>({ labels: null, values: null });

    React.useEffect(() => {
        let labels: any = [];
        let values: any = [];

        // eslint-disable-next-line array-callback-return
        dataChart.map((item: any, index: number) => {
            labels = [...labels, item.label];
            values = [...values, item.value];

            if (index === dataChart.length - 1) {
                setDataSets({ labels, values });
            }
        });
    }, []);

    const options: any = {
        resposive: true,
        scales: {
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const data: any = {
        labels: dataSets.labels,
        datasets: [
            {
                label: 'Tournament',
                backgroundColor: '#A54CE5',
                barThickness: 45,
                data: dataSets.values
            }
        ]
    };

    return <Bar data={data} options={options} />;
};

export default ChartBar;
