import { Task } from "@/app/lib/type";
import TaskAction from "../TaskAction";
import TableSkeleton from "./TableSkeleton";

type TMTableProps = {
  columnHeaders: string[];
  data: Array<Task>;
  isLoading: boolean;
};
export default function TMTable({
  columnHeaders,
  data,
  isLoading,
}: TMTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            {columnHeaders.map((columnHeader) => (
              <th
                key={columnHeader}
                className="text-center border-2 border-gray-300 py-5 px-4 text-lg"
              >
                {columnHeader}
              </th>
            ))}
          </tr>
        </thead>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <tbody>
            {data.length === 0 && isLoading === false && (
              <tr className="border-2 border-gray-300text-base py-5">
                <td
                  className="text-center text-green-500 py-4 text-2xl font-semibold"
                  colSpan={columnHeaders.length}
                >
                  No data
                </td>
              </tr>
            )}
            {data.map((data, index) => (
              <tr
                className="border-2 border-gray-300  text-base py-5 "
                data-testid={data.id}
                key={data.id}
              >
                <td className="text-center w-[350px] border-2 border-gray-300 py-5 px-4 text-lg">
                  {index + 1}
                </td>
                <td className="text-center w-[350px] border-2 border-gray-300 py-5 px-4 text-lg">
                  {data.title}
                </td>
                <td className="text-center w-[350px] border-2 border-gray-300 py-5 px-4 text-lg">
                  {data.description}
                </td>
                <td className="text-center w-[350px] border-2 border-gray-300 py-5 px-4 text-lg">
                  {data.dateTime}
                </td>
                <td
                  className={`text-center w-[350px] border-2 border-gray-300 py-5 px-4 text-lg ${
                    data.status === "Active"
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                >
                  {data.status}
                </td>
                <td className="text-center">
                  <TaskAction task={data} />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
