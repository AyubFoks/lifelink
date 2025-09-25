import logo from '../../../assets/logos/LifeLink-Logo.svg'

export default function Footer() {
  return (
    <footer className="bg-[#FDFBF9] text-[#403f3f] border-t border-[#dcdcdc]">
  <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-10">
    
    {/* Logo */}
    <div className="flex justify-center w-full md:w-auto">
      <img src={logo} alt="logo" className="w-auto h-20 md:h-24" />
    </div>

    {/* Contact */}
    <div className="text-center md:text-left">
      <h3 className="text-md font-semibold mb-2">Contact</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-center md:justify-start items-center gap-2">
          {/* email icon */}
          <a href="mailto:support@lifelink.com" className="hover:text-[#CC5500]">
            support@lifelink.com
          </a>
        </li>
        <li className="flex justify-center md:justify-start items-center gap-2">
          {/* instagram icon */}
          <a href="#" className="hover:text-[#CC5500]">@lifelink_</a>
        </li>
      </ul>
    </div>
  </div>

  <div className="border-t border-[#eaeaea] mt-6 text-center text-sm py-4 text-gray-500">
    © 2025 LifeLink. All rights reserved.
  </div>
</footer>

  )
}
