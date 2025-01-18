import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

type Props = {
    label: string;
    value: number;
    shouldFormat?: boolean;
};

export const DataCard = ({ label, value, shouldFormat }: Props) => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">
                    {shouldFormat ? formatPrice(value) : value}
                </p>
            </CardContent>
        </Card>
    );
};
