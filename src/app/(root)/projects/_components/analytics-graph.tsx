import {
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
} from "recharts";
import { Construction } from "lucide-react";
import { format, parse } from "date-fns";

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: { value: number }[];
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnalyticsGraph = ({ visitHistory }: any) => {
  const formatChartData = () => {
    if (!visitHistory || visitHistory.length === 0) {
      return [];
    }

    const sortedVisits = [...visitHistory].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sortedVisits.map((visit) => ({
      name: format(new Date(visit.date), "MMM dd"),
      pv: visit.pageVisits,
      uv: visit.visitors,
    }));
  };

  const chartData = formatChartData();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAdjustedData = (data: any) => {
    const dataLength = data.length;
    const today = new Date();

    if (dataLength === 0) {
      return Array.from({ length: 5 }).map((_, index) => ({
        name: format(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - (4 - index)
          ),
          "MMM dd"
        ),
        pv: 0,
        uv: 0,
      }));
    }

    if (dataLength < 5) {
      const paddedData = [...data];
      while (paddedData.length < 5) {
        const lastDate =
          paddedData.length > 0
            ? parse(paddedData[paddedData.length - 1].name, "MMM dd", today)
            : new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - (5 - paddedData.length)
              );

        lastDate.setDate(lastDate.getDate() + 1);

        paddedData.push({
          name: format(lastDate, "MMM dd"),
          pv: 0,
          uv: 0,
        });
      }
      return paddedData;
    }

    if (dataLength > 5) {
      return data.slice(-5);
    }

    return data;
  };

  const adjustedData = getAdjustedData(chartData);

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col justify-between items-center p-4 w-full h-full">
        <div className="flex flex-col items-center text-center">
          <Construction className="w-16 h-16 text-muted-foreground animate-pulse" />
          <div className="space-y-2 mt-6">
            <h2 className="font-semibold text-white text-2xl">
              No Analytics Data Available
            </h2>
            <p className="text-muted-foreground">
              <span className="block">
                There is no analytics data to display at this time.
              </span>
              <span className="block">
                Check back once you have some visitor activity!
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={adjustedData}
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
            domain={[0, "dataMax + 10"]}
          />
          <Tooltip content={<CustomTooltip active={false} payload={[]} />} />

          {/* Areas with gradients */}
          <Area type="linear" dataKey="pv" fill="url(#colorPv)" stroke="none" />
          <Area type="linear" dataKey="uv" fill="url(#colorUv)" stroke="none" />

          {/* Lines on top */}
          <Line
            type="linear"
            dataKey="pv"
            stroke="#fc8c14"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Line
            type="linear"
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
