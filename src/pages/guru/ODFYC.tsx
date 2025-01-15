import { useState, useEffect } from "react";
import { Guru } from "../../midleware/Api";
import { LoginStore } from "../../store/Store";

const ODFYC = () => {
  const [fetchData, setFetchData] = useState<any[]>([]);
  const [odfyc, setOdfyc] = useState<any>();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true); // State untuk loading
  const { token } = LoginStore();

  const FetchData = async () => {
    setLoading(true); // Set loading menjadi true saat fetch data
    try {
      const response = await Guru.GetFullDataOdfyc(token, page);
      const responseCard = await Guru.GetDataOdfyc(token);
      const { result, totalPage } = response.data.data;

      setFetchData(result);
      setTotalPages(totalPage);
      setOdfyc(responseCard.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading menjadi false setelah data diterima
    }
  };

  useEffect(() => {
    FetchData();
  }, [page]);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // Skeleton loader untuk card
  const renderSkeletonCard = () => (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-lg shadow-lg p-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-r sm:border-r-2 last:border-none sm:last:border-none border-gray-200"
          >
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-32"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Skeleton loader untuk table
  const renderSkeletonTable = () => (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-[#3B86F6] bg-[#DBEAFE]">
          <tr>
            <th scope="col" className="px-4 py-1 text-center">
              #
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Nama
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Aktivitas
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Periode
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Tanggal Pelaksanaan
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Durasi
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="bg-[#E7E7E7]">
              <td className="px-4 py-1 text-center">
                <div className="h-4 bg-gray-300 rounded w-12 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6">
      <div className="text-center text-2xl">One Day For Your Country</div>

      {/* card section 1 */}
      {loading ? (
        renderSkeletonCard()
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col gap-4 border-r sm:border-r-2 last:border-none sm:last:border-none border-gray-200">
              <span className="text-sm font-medium text-red-500">
                Menunggu Pelaksanaan
              </span>
              <span className="text-3xl font-semibold text-red-500">
                {odfyc?.["Menunggu Pelaksanaan"] || 0}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-yellow-500">
                Dalam Pelaksanaan
              </span>
              <span className="text-3xl font-semibold text-yellow-500">
                {odfyc?.["Dalam Pelaksanaan"] || 0}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-green-500">
                Selesai
              </span>
              <span className="text-3xl font-semibold text-green-500">
                {odfyc?.["Selesai"] || 0}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* table */}
      {loading ? (
        renderSkeletonTable()
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-[#3B86F6] bg-[#DBEAFE]">
              <tr>
                <th scope="col" className="px-4 py-1 text-center">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Aktivitas
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Periode
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Tanggal Pelaksanaan
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Durasi
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchData.map((item, index) => (
                <tr className="bg-[#E7E7E7]" key={index}>
                  <th className="px-4 py-1 text-center text-[#404040] font-light">
                    {page * 10 + index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 text-center text-[#404040] font-light"
                  >
                    {item?.forcountry?.user?.full_name}
                  </th>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.activity}
                  </td>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.forcountry?.academic_year}
                  </td>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.plan_date
                      ? JSON.parse(item.plan_date).map(
                          (plan: any, index: number) => (
                            <div key={index}>
                              <span>{plan.date}</span>
                            </div>
                          )
                        )
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.plan_date
                      ? JSON.parse(item.plan_date).map(
                          (plan: any, index: number) => {
                            const startTime = plan.start.split(":");
                            const endTime = plan.end.split(":");

                            const start = new Date(
                              0,
                              0,
                              0,
                              parseInt(startTime[0]),
                              parseInt(startTime[1]),
                              0
                            );
                            const end = new Date(
                              0,
                              0,
                              0,
                              parseInt(endTime[0]),
                              parseInt(endTime[1]),
                              0
                            );

                            const durationMinutes =
                              (end.getTime() - start.getTime()) / (1000 * 60);

                            return (
                              <div key={index}>
                                <span>{durationMinutes} minutes</span>
                              </div>
                            );
                          }
                        )
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      className={`btn btn-outline text-center btn-sm text-xs ${
                        item?.status === "Selesai"
                          ? "text-green-500 border-green-500"
                          : item?.status === "Menunggu Pelaksanaan"
                          ? "text-red-500 border-red-500"
                          : item?.status === "Dalam Pelaksanaan"
                          ? "text-yellow-500 border-yellow-500"
                          : "text-blue-500 border-blue-500"
                      }`}
                    >
                      {item?.status || "-"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* pagination */}
      <div className="flex items-center justify-center mt-5">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <a
                onClick={handlePrev}
                className={`flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-blue-500 bg-blue-100 border border-e-0 border-blue-500 rounded-s-lg  ${
                  page === 0 ? "cursor-not-allowed text-gray-300" : ""
                }`}
              >
                Previous
              </a>
            </li>

            {/* Render page numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className="cursor-pointer">
                <a
                  onClick={() => setPage(index)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    page === index
                      ? "text-blue-600 border border-blue-500 bg-blue-50"
                      : "text-gray-500 bg-white border border-black hover:bg-gray-100 hover:text-gray-700"
                  } `}
                >
                  {index + 1}
                </a>
              </li>
            ))}

            <li>
              <a
                onClick={handleNext}
                className={`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-blue-500 bg-blue-100 border rounded-e-lg border-blue-500   ${
                  page === totalPages - 1
                    ? "cursor-not-allowed text-gray-300"
                    : ""
                }`}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ODFYC;
