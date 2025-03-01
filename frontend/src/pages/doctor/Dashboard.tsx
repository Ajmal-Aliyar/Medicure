import RightBar from '../../components/doctor/dashboard/RightBar'

const slots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
];

const appointments = [
    { id: 1, name: "John Doe", time: "9:30 AM" },
    { id: 2, name: "Jane Smith", time: "10:30 AM" },
];

const transactions = [
    { id: 1, type: "Credit", amount: "+$200" },
    { id: 2, type: "Debit", amount: "-$50" },
];

function Dashboard() {

    return (
        <>
            <div className='content h-screen w-full p-4 flex flex-col justify-center overflow-y-auto rounded-md mt-20'
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className='grid md:grid-cols-4 grid-cols-2 gap-2 h-10'>
                        <div className='bg-white '>sfaf</div>
                        <div className='bg-white '>sfaf</div>
                        <div className='bg-white '>sfaf</div>
                        <div className='bg-white '>sfaf</div>
                    </div>
                <div className="flex flex-wrap gap-3 w-full p-4 h-screen pb-20">
                    {/* Slots Section */}
                    <div className="col-span-6 bg-white rounded-md p-4 shadow w-full">
                        <h2 className="text-lg font-semibold mb-3">Available Slots</h2>
                        <ul>
                            {slots.map((slot, index) => (
                                <li key={index} className="p-2 border-b">{slot}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Appointments Section */}
                    <div className="col-span-6 bg-white rounded-md p-4 shadow">
                        <h2 className="text-lg font-semibold mb-3">Appointments</h2>
                        <ul>
                            {appointments.map((appointment) => (
                                <li key={appointment.id} className="p-2 border-b">
                                    {appointment.name} - {appointment.time}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Wallet Section */}
                    <div className="col-span-6 bg-white rounded-md p-4 shadow">
                        <h2 className="text-lg font-semibold mb-3">Wallet</h2>
                        <p className="text-xl font-bold">Balance: $500</p>
                        <h3 className="text-md font-semibold mt-3">Transaction History</h3>
                        <ul>
                            {transactions.map((transaction) => (
                                <li key={transaction.id} className="p-2 border-b">
                                    {transaction.type} - {transaction.amount}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <RightBar />
        </>
    )
}

export default Dashboard
