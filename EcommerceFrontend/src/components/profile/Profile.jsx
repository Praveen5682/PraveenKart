import { Avatar, Dropdown } from "flowbite-react";
import profileImg from "../../assets/frontend_assets/profile-img/download.jpg";

export function Profile() {
  return (
    <Dropdown
      label={<Avatar alt="User settings" img={profileImg} rounded />}
      arrowIcon={false}
      inline
    >
      <Dropdown.Header>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">
          name@flowbite.com
        </span>
      </Dropdown.Header>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

export default Profile;
