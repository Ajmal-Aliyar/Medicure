import AdvancedChart from './Chart'

function ActivityChart() {

    return (
        <div className="bg-[#fafafa] rounded-md shadow-md max-w-full flex-1 min-w-[700px]">
            <div className="p-2 border-b font-semibold">Activity</div>
            <div className="p-2">
                <AdvancedChart />
            </div>
        </div>
    )
}

export default ActivityChart
