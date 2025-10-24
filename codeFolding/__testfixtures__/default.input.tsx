import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
];

export default function Example() {
    return (
        <LineChart>
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    );
}
