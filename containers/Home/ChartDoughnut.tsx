import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

interface ChartDoughnutProps {
    dataChart: any;
}

const ChartDoughnut: React.FC<ChartDoughnutProps> = ({ dataChart }) => {
    const [dataSets, setDataSets] = React.useState<any>({ labels: null, values: null, colors: null });

    React.useEffect(() => {
        let labels: any = [];
        let values: any = [];
        let colors: any = [];

        // eslint-disable-next-line array-callback-return
        dataChart.map((item: any, index: number) => {
            labels = [...labels, item.label];
            values = [...values, item.value];
            colors = [...colors, item.color];

            if (index === dataChart.length - 1) setDataSets({ labels, values, colors });
        });
    }, []);

    const options: any = {
        responsive: true,
        cutout: '90%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 40,
                    padding: 45,
                    pointStyle: 'circle',
                    usePointStyle: true
                }
            }
        }
    };

    const data = {
        labels: dataSets.labels,
        datasets: [
            {
                data: dataSets.values,
                backgroundColor: dataSets.colors
                // backgroundColor: ['rgb(242,165,152)', 'rgb(255,232,157)', 'rgb(236,107,109)', 'rgb(122,231,125)', 'rgb(195,233,151)'],
                // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ],

        plugins: {
            labels: {
                render: 'percentage',
                fontColor: ['green', 'white', 'red'],
                precision: 2
            }
        },
        text: '23%'
    };

    if (!dataSets.labels) {
        return null;
    }
    return <Doughnut data={data} options={options} />;
};

export default ChartDoughnut;
