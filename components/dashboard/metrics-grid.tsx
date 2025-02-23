"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/lib/types";
import { Users, GraduationCap, Calendar, TrendingUp } from "lucide-react";

const metrics: MetricCard[] = [
  {
    title: "Total Students",
    value: "1,234",
    description: "Active enrollments",
    trend: 12,
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Average Grade",
    value: "B+",
    description: "School average",
    trend: 4,
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    title: "Attendance Rate",
    value: "92%",
    description: "Last 30 days",
    trend: -2,
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    title: "Performance",
    value: "88%",
    description: "Overall score",
    trend: 8,
    icon: <TrendingUp className="h-6 w-6" />,
  },
];

export function MetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              {metric.description}
              {metric.trend && (
                <span className={metric.trend > 0 ? "text-green-500" : "text-red-500"}>
                  {" "}
                  ({metric.trend > 0 ? "+" : ""}
                  {metric.trend}%)
                </span>
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}