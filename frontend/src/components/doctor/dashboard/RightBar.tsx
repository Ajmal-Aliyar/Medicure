import ProfileCard from "./ProfileCard"


function RightBar() {
  return (
    <div className="w-full h-full hidden lg:flex flex-col items-center gap-2">
      <ProfileCard />
    </div>
  )
}

export default RightBar
