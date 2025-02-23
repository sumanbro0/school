/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ChartTooltip } from "@/components/ui/chart";
import { visitorData } from "@/lib/data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-2 shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}${
              entry.name.includes("%") ? "%" : ""
            }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3 ">
      <Card className="md:col-span-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Website Visitors
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={visitorData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                  className="text-sm"
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 shadow-lg rounded-lg border">
                          <p className="font-medium">{`${payload[0].payload.month}: ${payload[0].value} visitors`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="desktop"
                  stroke="#0ea5e9"
                  fillOpacity={1}
                  fill="url(#colorDesktop)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium">
              Trending up by 5.2% this month
            </span>
            <span className="text-sm text-muted-foreground ml-4">
              January - June 2024
            </span>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Pass/Fail Distribution
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Overview of student performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Pass", value: 85, fill: "#22c55e" },
                    { name: "Fail", value: 15, fill: "#ef4444" },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>
                <ChartTooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  layout="horizontal"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
