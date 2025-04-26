import Image from 'next/image'
import Contacts from './Contacts'

const Header = () => {
  return (
    <div className="flex items-center justify-around gap-5 p-5 bg-accent">
      <div>
        <Image src="/resume_pfp.jpg" width={125} height={125} className="rounded-full" alt="Tony Wu" />
      </div>
      <div>
        <div className="text-5xl font-black">Tony Wu</div>
        <div className="text-3xl text-muted-foreground font-bold">Computer Science <br /> Graduate</div>
      </div>

      <Contacts />
    </div>
  )
}

export default Header


