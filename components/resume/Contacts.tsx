import { RxEnvelopeClosed, RxGlobe, RxMobile } from "react-icons/rx"

const isProduction = process.env.NODE_ENV === 'production';
const website = process.env.NEXT_PUBLIC_WEBSITE;
const email = process.env.NEXT_PUBLIC_EMAIL;
const phone = process.env.NEXT_PUBLIC_PHONE;
const redactCharacter = "█";

const Contacts = () => {
  const contacts = {
    website: {
      icon: RxGlobe,
      text: website
    },
    email: {
      icon: RxEnvelopeClosed,
      text: isProduction
        ? redactCharacter.repeat(email!.length/2)
        : email
    },
    phone: {
      icon: RxMobile,
      text: isProduction
        ? redactCharacter.repeat(phone!.length/2)
        : phone
    }
  }

  return (
    <div className="flex flex-col gap-1 py-2 font-medium">
      {Object.entries(contacts).map(([key, contact]) => (
        contact.text && (
          <div key={key} className="flex items-center gap-2">
            <span className="text-background bg-theme-1 p-1.5 rounded-full">
              <contact.icon size={16}/>
            </span>
            <span>{contact.text}</span>
          </div>
        )
      ))}
    </div>
  )
}

export default Contacts