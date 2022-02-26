import Link from 'next/link'
import {
  BsFillChatLeftTextFill,
  BsFillLightningFill,
  BsLockFill,
  BsPersonFill,
} from 'react-icons/bs'

const SideBar = () => {
  return (
    <div
      className="fixed top-0 left-0 flex h-screen w-16 flex-col
                  bg-white font-display shadow-lg dark:bg-gray-900"
    >
      <SideBarIcon
        icon={<BsPersonFill size="20" />}
        text="ข้อมูลของคุณ"
        navTo="/friendship/details"
      />
      <SideBarIcon
        icon={<BsFillChatLeftTextFill size="20" />}
        text="ดู Friendship"
        navTo="/friendship/message"
      />

      <Divider />
      <SideBarIconDanger
        icon={<BsLockFill size="20" />}
        text="ออกจากระบบ"
        navTo="/"
      />
    </div>
  )
}

const SideBarIcon = ({ icon, text, navTo }: any) => (
  <Link href={navTo}>
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  </Link>
)

const SideBarIconDanger = ({ icon, text, navTo }: any) => (
  <Link href={navTo}>
    <div className="sidebar-icon-danger group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  </Link>
)

const Divider = () => <hr className="sidebar-hr" />

export default SideBar
