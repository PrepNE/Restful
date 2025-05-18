import ParkingLotCard from "@/components/cards/ParkingLotCard";
import StatsCard from "@/components/cards/StatCards";
import { dummyLots } from "@/utils/constants";
import { Helmet } from "react-helmet";



export default function Overview() {
    
    return (
        <>
            <Helmet>
                <title>Overview</title>
            </Helmet>
            <div className="w-full flex flex-col gap-y-6">
                <div>
                    <h2 className="text-2xl font-semibold">Overview</h2>
                    <p className="text-gray-500">Hello there! here is a summary for you</p>
                </div>
                <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <StatsCard title="Slots" value={0} link="/dashboard/slots" />
                    <StatsCard title="Vehicles" value={0} link="/dashboard/vehicles" />
                </div>

                <div className="pt-5">
                    <h1 className="font-bold text-xl">Parking Lot Overview</h1>
                    <div className="mt-10 w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {dummyLots.map((lot , idx) => (
                            <ParkingLotCard
                             key={idx}
                             {...lot}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

