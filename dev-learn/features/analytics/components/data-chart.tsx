"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
    course: {
        color: "hsl(var(--chart-1))",
        label: "Course",
    },
} satisfies ChartConfig;

type Props = {
    data: {
        name: string;
        total: number;
    }[];
};

export const DataChart = ({ data }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>All your course</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />

                        <Bar
                            dataKey="total"
                            fill="var(--color-course)"
                            radius={8}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value: string) => `$${value}`}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
