import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { WasteCollection } from "../midleware/Api";
import { LoginStore } from "../store/Store";

interface MonthDataSeries {
  prices: number[];
  dates: string[];
}

interface SeriesType {
  name: string;
  data: number[];
}

interface ChartMapProps {
  start_date?: string | null;
  end_date?: string | null;
  waste_type_id?: number | null;
}

const monthDataSeries1: MonthDataSeries = {
  prices: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  dates: [
    "2018-09-19T00:00:00.000Z",
    "2018-09-20T01:30:00.000Z",
    "2018-09-21T02:30:00.000Z",
    "2018-09-22T03:30:00.000Z",
    "2018-09-23T04:30:00.000Z",
    "2018-09-24T05:30:00.000Z",
    "2018-09-25T06:30:00.000Z",
    "2018-09-26T07:30:00.000Z",
    "2018-09-27T08:30:00.000Z",
  ],
};

const ChartMap: React.FC<ChartMapProps> = ({
  start_date,
  end_date,
  waste_type_id,
}) => {
  const { token } = LoginStore();
  const [series, setSeries] = useState<SeriesType[]>([
    {
      name: "Plastik (gram)",
      data: monthDataSeries1.prices,
    },
  ]);

  const [options] = useState<ApexOptions>({
    chart: {
      type: "area",
      height: 400,
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Perolehan Sampah Plastik",
      align: "left",
    },
    labels: monthDataSeries1.dates,
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: false,
    },
    legend: {
      horizontalAlign: "right",
    },
  });

  useEffect(() => {
    getWasteCollection();
  }, [start_date, end_date, waste_type_id]);

  const getWasteCollection = async () => {
    const currentDate = new Date();
    const start =
      start_date ||
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).toISOString();
    const end = end_date || currentDate.toISOString();

    let query = `?start_date=${start}&end_date=${end}`;
    if (waste_type_id) query += `&waste_type_id=${waste_type_id}`;

    try {
      const response = await WasteCollection.GetAllFilter(token, query);
      if (response && response.data) {
        formatWaste(response.data);
      }
    } catch (error) {
      console.error("Error fetching waste collection data:", error);
    }
  };

  const formatWaste = (datas: any[]) => {
    let wasteData: Record<string, number[]> = {};
    for (let data of datas) {
      const wasteCode = data.wastetype.code;
      if (!wasteData[wasteCode]) {
        wasteData[wasteCode] = generateRawArray(datas.length);
      }
      wasteData[wasteCode].push(data.amount);
    }

    const formattedSeries = Object.keys(wasteData).map((key) => ({
      name: key,
      data: wasteData[key],
    }));

    setSeries(formattedSeries);
  };

  const generateRawArray = (length: number) => {
    return Array.from({ length }, () => 0);
  };

  return (
    <div>
      <div id="chart" className="">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={450}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ChartMap;
