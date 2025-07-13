import Drawer from "@mui/material/Drawer";

import DashbaordSidebar from "../DashbaordSidebar";

interface IProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function DashboardSidebarMob({ open, toggleDrawer }: IProps) {
  const DrawerList = <DashbaordSidebar isMobile toggleDrawer={toggleDrawer} />;

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
