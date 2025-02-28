// AnalyticsGraph.jsx
import {
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
} from "recharts";

const data = [
  {
    name: "Feb 13",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Feb 14",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Feb 15",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Feb 16",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Feb 17",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Feb 18",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Feb 19",
    uv: 3490,
    pv: 4300,
  },
];

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 shadow-lg p-2 border border-gray-700 rounded-md">
        <p className="text-[#fc8c14] text-sm">{`Views: ${payload[0].value}`}</p>
        <p className="text-[#5b98ff] text-sm">
          {`Visitors: ${payload[1].value}`}
        </p>
      </div>
    );
  }
  return null;
};

const AnalyticsGraph = () => {
  return (
    <div className="p-4 w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fc8c14" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#fc8c14" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5b98ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#5b98ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            padding={{ left: 30, right: 30 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, "dataMax + 1000"]}
          />
          <Tooltip content={<CustomTooltip active={false} payload={[]} />} />

          {/* Areas with gradients */}
          <Area
            type="monotone"
            dataKey="pv"
            fill="url(#colorPv)"
            stroke="none"
          />
          <Area
            type="monotone"
            dataKey="uv"
            fill="url(#colorUv)"
            stroke="none"
          />

          {/* Lines on top */}
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#fc8c14"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#5b98ff"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export { AnalyticsGraph };
