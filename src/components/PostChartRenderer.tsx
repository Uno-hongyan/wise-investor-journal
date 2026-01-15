import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export interface ChartConfig {
  type: "bar" | "horizontal-bar";
  title: string;
  subtitle?: string;
  data: Array<Record<string, string | number>>;
  xKey: string;
  yKey: string;
  colors?: string[];
  valuePrefix?: string;
  valueSuffix?: string;
}

interface PostChartRendererProps {
  charts: ChartConfig[];
}

const DEFAULT_COLORS = [
  "hsl(var(--accent))",
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

const PostChartRenderer = ({ charts }: PostChartRendererProps) => {
  if (!charts || charts.length === 0) return null;

  return (
    <div className="space-y-12 my-8">
      {charts.map((chart, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 shadow-sm"
        >
          {/* Title */}
          <h3 className="font-serif text-xl font-bold text-foreground text-center mb-1">
            {chart.title}
          </h3>
          {chart.subtitle && (
            <p className="text-muted-foreground text-sm text-center mb-6">
              {chart.subtitle}
            </p>
          )}

          {/* Chart */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chart.type === "horizontal-bar" ? (
                <BarChart
                  data={chart.data}
                  layout="vertical"
                  margin={{ top: 10, right: 60, left: 100, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(value) =>
                      `${chart.valuePrefix || ""}${value}${chart.valueSuffix || ""}`
                    }
                  />
                  <YAxis
                    dataKey={chart.yKey}
                    type="category"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    width={95}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => [
                      `${chart.valuePrefix || ""}${value}${chart.valueSuffix || ""}`,
                      chart.xKey,
                    ]}
                  />
                  <Bar dataKey={chart.xKey} radius={[0, 4, 4, 0]}>
                    {chart.data.map((entry, i) => {
                      const value = entry[chart.xKey];
                      const isNegative = typeof value === "number" && value < 0;
                      const colors = chart.colors || DEFAULT_COLORS;
                      return (
                        <Cell
                          key={`cell-${i}`}
                          fill={isNegative ? "#ef4444" : colors[i % colors.length]}
                        />
                      );
                    })}
                    <LabelList
                      dataKey={chart.xKey}
                      position="right"
                      fill="hsl(var(--foreground))"
                      fontSize={12}
                      formatter={(value: number) =>
                        `${chart.valuePrefix || ""}${value}${chart.valueSuffix || ""}`
                      }
                    />
                  </Bar>
                </BarChart>
              ) : (
                <BarChart
                  data={chart.data}
                  margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey={chart.xKey}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(value) =>
                      `${chart.valuePrefix || ""}${value}${chart.valueSuffix || ""}`
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => [
                      `${chart.valuePrefix || ""}${value}${chart.valueSuffix || ""}`,
                      chart.yKey,
                    ]}
                  />
                  <Bar dataKey={chart.yKey} radius={[4, 4, 0, 0]}>
                    {chart.data.map((_, i) => {
                      const colors = chart.colors || DEFAULT_COLORS;
                      return (
                        <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                      );
                    })}
                    <LabelList
                      dataKey={chart.yKey}
                      position="top"
                      fill="hsl(var(--foreground))"
                      fontSize={12}
                      formatter={(value: number) =>
                        `${chart.valuePrefix || ""}${value}${chart.valueSuffix || ""}`
                      }
                    />
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostChartRenderer;
