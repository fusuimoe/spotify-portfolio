const Logo = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-36 w-48">
          <div className="absolute left-0 top-0 h-12 w-12 bg-[#CBF067]"></div>
          <div className="absolute left-36 top-0 h-12 w-12 bg-[#F0A167]"></div>
          <div className="absolute left-12 top-6 h-12 w-12 translate-y-1/2 animate-waitDown bg-[#626F70]"></div>
          <div className="absolute left-24 top-12 h-12 w-12 translate-y-1/2 animate-waitDown2 bg-[#90769B]"></div>
          <div className="absolute left-0 top-24 h-12 w-12 bg-[#67E3F0]"></div>
          <div className="absolute left-36 top-24 h-12 w-12 bg-[#C768F0]"></div>
        </div>
      </div>
    </div>
  )
}
export default Logo
