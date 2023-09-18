import { faBars, faChartLine, faCircleQuestion, faClose, faGraduationCap, faHammer, faTableCellsLarge, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const MobileSidebar = () => {
      const [state, setState] = React.useState({
            left: false,
      });

      const toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                  return;
            }

            setState({ ...state, [anchor]: open });
      };

      const list = (anchor) => (
            <Box
                  sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                  role="presentation"
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
            >
                  <List>
                        <Link href={"/dashboard"}>
                              <ListItem disablePadding>
                                    <ListItemButton>
                                          <ListItemIcon>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faTableCellsLarge}
                                                      />
                                                </div>
                                          </ListItemIcon>
                                          <ListItemText primary={"Dashboard"} />
                                    </ListItemButton>
                              </ListItem>
                        </Link>
                        <Divider />
                        <Link href={"/all-products"}>
                              <ListItem disablePadding>
                                    <ListItemButton>
                                          <ListItemIcon>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faTag}
                                                      />
                                                </div>
                                          </ListItemIcon>
                                          <ListItemText primary={"All Products"} />
                                    </ListItemButton>
                              </ListItem>
                        </Link>
                        <Link href={"/manage-products"}>
                              <ListItem disablePadding>
                                    <ListItemButton>
                                          <ListItemIcon>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faTag}
                                                      />
                                                </div>
                                          </ListItemIcon>
                                          <ListItemText primary={"Manage Products"} />
                                    </ListItemButton>
                              </ListItem>
                        </Link>
                        <Divider />
                        <Link href={"/upload-courses"}>
                              <ListItem disablePadding>
                                    <ListItemButton>
                                          <ListItemIcon>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faGraduationCap}
                                                      />
                                                </div>
                                          </ListItemIcon>
                                          <ListItemText primary={"Upload Courses"} />
                                    </ListItemButton>
                              </ListItem>
                        </Link>
                        <Link href={"/manage-courses"}>
                              <ListItem disablePadding>
                                    <ListItemButton>
                                          <ListItemIcon>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faGraduationCap}
                                                      />
                                                </div>
                                          </ListItemIcon>
                                          <ListItemText primary={"Manage Courses"} />
                                    </ListItemButton>
                              </ListItem>
                        </Link>
                        <Divider />
                        <Link href={"/manage-orders"}>
                              <ListItem disablePadding>
                                    <ListItemButton>
                                          <ListItemIcon>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faHammer}
                                                      />
                                                </div>
                                          </ListItemIcon>
                                          <ListItemText primary={"Manage Orders"} />
                                    </ListItemButton>
                              </ListItem>
                        </Link>
                        <Link href={"/orders-status"}>
                              <ListItem disablePadding>
                                    <ListItemButton>
                                          <ListItemIcon>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faHammer}
                                                      />
                                                </div>
                                          </ListItemIcon>
                                          <ListItemText primary={"Orders Status"} />
                                    </ListItemButton>
                              </ListItem>
                        </Link>
                        <Divider />
                        <Link href={"/reports"}>
                              <ListItem disablePadding>
                                    <ListItemButton>
                                          <ListItemIcon>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faChartLine}
                                                      />
                                                </div>
                                          </ListItemIcon>
                                          <ListItemText primary={"Reports"} />
                                    </ListItemButton>
                              </ListItem>
                        </Link>
                        <Divider />
                        <Link href={"/help"}>
                              <ListItem disablePadding>
                                    <ListItemButton>
                                          <ListItemIcon>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faCircleQuestion}
                                                      />
                                                </div>
                                          </ListItemIcon>
                                          <ListItemText primary={"Help & Supports"} />
                                    </ListItemButton>
                              </ListItem>
                        </Link>
                        <Divider />
                  </List>
            </Box>
      );
      return (
            <div className='w-full p-1 common_shadow text-center flex justify-center items-center gap-3'>
                  <span className='text-base font-semibold text-primary'>Dashboard</span>
                  <button onClick={toggleDrawer("left", true)} className='py-1 px-2 text-orange-500'>
                        <FontAwesomeIcon
                              icon={faBars}
                        />
                  </button>
                  <Drawer
                        anchor={"left"}
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                  >
                        <div className='w-full text-right p-1'>
                              <button onClick={toggleDrawer("left", false)} className=' w-[35px] h-[35px] rounded-full bg-red-500 text-white'>
                                    <FontAwesomeIcon
                                          icon={faClose}
                                    />
                              </button>
                        </div>
                        {list("left")}
                  </Drawer>
            </div>
      );
};

export default MobileSidebar;