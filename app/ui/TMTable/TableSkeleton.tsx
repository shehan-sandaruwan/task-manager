export default function TableSkeleton() {
  return (
    <tbody>
      {[...Array(4)].map((_, index) => (
        <tr className="border-2 border-gray-300 py-5 " key={index}>
          {[...Array(6)].map((_, index) => (
            <td
              key={index}
              className=" text-center text-white py-4 px-4 border-separate"
            >
              <div className="animate-pulse h-6 bg-slate-200 rounded w-[200px]"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
