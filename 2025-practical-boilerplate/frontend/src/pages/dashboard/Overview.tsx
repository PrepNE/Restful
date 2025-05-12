import useElections from "@/hooks/useElection";
import { Link } from "react-router-dom";

export default function Overview() {
   const { elections } = useElections();

  return (
    <div className="w-full flex flex-col gap-y-6 px-4">
      <div>
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-gray-500">Hello there! here is a summary for you</p>
      </div>
      <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Elections"
          value={elections?.length ?? 0}
          link="/dashboard/election"
        />
      </div>
    </div>
  );
}

const StatsCard = ({
  title,
  value,
  link,
}: {
  title: string;
  value: string | number;
  link: string;
}) => {
  return (
    <div className="w-full p-6 flex flex-col items-center gap-y-3 shadow-md rounded-md border">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-4xl font-bold">{value}</p>
      <Link to={link} className="text-blue-600 hover:underline">
        View more &rarr;
      </Link>
    </div>
  );
};
