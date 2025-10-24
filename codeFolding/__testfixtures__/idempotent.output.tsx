import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// #region Sample data
const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
];

// #endregion
export default function Example() {
    return (
        <LineChart>
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    );
}