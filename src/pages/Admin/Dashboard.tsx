// import React from "react";
import { useEffect, useState } from "react";
import ChartMap from "../../Component/ChartMap";
import { LoginStore } from "../../store/Store";
// import { WasteCollection } from "../../midleware/Api";
import { BankSampah } from "../../midleware/Api";
import { WasteTypeData } from "../../midleware/Utils";
import { useFormik } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

const Dashboard = () => {
  const { token } = LoginStore();
  // const [totalSampah, setTotalSampah] = useState<any>({});
  // const [totalPenjualan, setTotalPenjualan] = useState<number>(0);
  const [fromDate, setFromDate] = useState(""); // fromDate valuenya tanggal buat dimasukin di endpoint juga
  const [toDate, setToDate] = useState(""); // toDate valuenya tanggal buat dimasukin di endpoint juga
  const [selectedWasteType, setSelectedWasteType] = useState<string>(""); //selectedWasteType valuenya id buat dimasukin di endpoint buat filter sesuai jenis sampah
  const [dataWasteType, setDataWasteType] = useState<WasteTypeData[]>([]);

  // const currentDate = new Date();
  useEffect(() => {
    // getTotalSampah();
    GetWasteType();
  }, []);

  const formik = useFormik({
    initialValues: {
      start_date: "",
      end_date: "",
      waste_type_id: 0,
    },
    onSubmit: (val) => {
      console.log(val);
    },
  });

  const GetWasteType = async () => {
    try {
      const response = await BankSampah.GetDataDropdownWasteType(token);
      setDataWasteType(response.data.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  // const getLastEndDay = () => {
  //   const firstDay = new Date(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth(),
  //     1
  //   ).toISOString();
  //   const lastDay = new Date(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth() + 1,
  //     0
  //   ).toISOString();
  //   return { firstDay, lastDay };
  // };

  // const countTotalSampah = (datas: any[]) => {
  //   let raw = {
  //     bulan: { unit: "Gram", total: 0 },
  //     hari: { unit: "Gram", total: 0 },
  //   };
  //   const currentDateToSearch = currentDate.toISOString().split("T")[0];
  //   datas.forEach((data: any) => {
  //     raw.bulan.total += data.weight;
  //     const collectDate = data.collection_date.split("T")[0];
  //     if (collectDate == currentDateToSearch) raw.hari.total += data.weight;
  //   });
  //   return raw;
  // };

  // const getTotalSampah = async () => {
  // let { start_date, end_date } = formik.values,
  //   query = "?limit=1000";
  // if (!start_date && !end_date) {
  //   const { firstDay, lastDay } = getLastEndDay();
  //   if (!start_date) start_date = firstDay;
  //   if (!end_date) end_date = lastDay;
  // }
  // query += `&start_date=${start_date}&end_date=${end_date}`;

  // const response = await WasteCollection.GetAllFilter(token, query);
  // setTotalSampah(countTotalSampah(response.data.data.result));
  // console.log(setTotalSampah);
  // };

  const handleChangeWasteType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedWasteType(event.target.value);
  };

  const handleChangeFromDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleChangeToDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  return (
    <>
      <div className="w-full p-5">
        <div className="w-full flex gap-3 mt-3 lg:flex-nowrap flex-wrap">
          <div className="w-full bg-white rounded-md">
            <div className="p-3">
              <div className="text-gray-500 ">Total Sampah Bulan Ini</div>
              <div className="flex items-center justify-between">
                <div className="text-[1.8rem] font-bold text-blue-700">
                  300 gram
                </div>
                <div>
                  <FaTrashAlt color="blue" size={"1.5rem"} />
                </div>
              </div>
              <div className="text-xs text-gray-500">
                21% meningkat blablablabla
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-md">
            <div className="p-3">
              <div className="text-gray-500 ">Total Sampah Hari Ini</div>
              <div className="flex items-center justify-between">
                <div className="text-[1.8rem] font-bold text-green-700">
                  300 gram
                </div>
                <div>
                  <FaTrashAlt color="green" size={"1.5rem"} />
                </div>
              </div>
              <div className="text-xs text-gray-500">
                21% meningkat blablablabla
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-md">
            <div className="p-3">
              <div className="text-gray-500 ">Total Penjualan Bulan Ini</div>
              <div className="flex items-center justify-between">
                <div className="text-[1.8rem] font-bold text-red-700">
                  Rp 102390
                </div>
                <div>
                  <FaMoneyBill color="red" size={"1.9rem"} />
                </div>
              </div>
              <div className="text-xs text-gray-500">
                21% meningkat blablablabla
              </div>
            </div>
          </div>
          {/* <div className="w-full sm:w-1/3  p-3 ">
            <div className="w-full bg-white rounded-md flex justify-center items-center relative  overflow-hidden">
              <div className="w-24 h-52 py-10">
                <div className="w-full h-full bg-green-500 rounded-full blur-xl"></div>
              </div>
              <div className="glass w-full h-52 absolute rounded-md p-4">
                <div className="flex justify-center items-center flex-col">
                  <span className="font-bold text-black">
                    Total Sampah Bulan Ini
                  </span>
                  <div className="flex items-end">
                    <span className="text-[90px] font-bold ">
                      {totalSampah?.bulan?.total}
                    </span>{" "}
                    <span className="font-semibold">Gram</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="w-full sm:w-1/3  p-3 ">
            <div className="w-full bg-white rounded-md flex justify-center items-center relative  overflow-hidden">
              <div className="w-24 h-52 py-10">
                <div className="w-full h-full bg-green-500 rounded-full blur-xl"></div>
              </div>
              <div className="glass w-full h-52 absolute rounded-md p-4">
                <div className="flex justify-center items-center flex-col">
                  <span className="font-bold text-black">
                    Total Sampah Hari Ini
                  </span>
                  <div className="flex items-end">
                    <span className="text-[90px] font-bold">
                      {totalSampah?.hari?.total}
                    </span>{" "}
                    <span className="font-semibold">Gram</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="w-full sm:w-1/3  p-3 ">
            <div className="w-full bg-white rounded-md flex justify-center items-center relative  overflow-hidden">
              <div className="w-24 h-52 py-10">
                <div className="w-full h-full bg-green-500 rounded-full blur-xl"></div>
              </div>
              <div className="glass w-full h-52 absolute rounded-md p-4">
                <div className="flex justify-center items-center flex-col">
                  <span className="font-bold text-black">
                    Total Penjualan Bulan ini
                  </span>
                  <div className="flex items-end">
                    <p>
                      <span className="font-semibold">Rp. </span>
                      <span className="text-[80px] font-bold">23.000</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="w-full flex justify-end gap-3 p-3 flex-wrap">
          <select
            className="select select-bordered bg-white w-40"
            onChange={handleChangeWasteType}
            value={selectedWasteType}
          >
            <option value="">Pilih Sampah</option>
            {dataWasteType.map((item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="flex justify-center gap-2 items-center ">
            <input
              type="date"
              placeholder="Type here"
              className="input w-full"
              value={fromDate}
              onChange={handleChangeFromDate}
            />
            -
            <input
              type="date"
              placeholder="Type here"
              className="input w-full"
              value={toDate}
              onChange={handleChangeToDate}
            />
          </div>
        </div>

        <div className="w-full p-3 ">
          <div className="w-full bg-white p-3 rounded-md">
            <ChartMap
              start_date={formik.values.start_date}
              end_date={formik.values.end_date}
              waste_type_id={formik.values.waste_type_id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
