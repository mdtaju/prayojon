import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faChartLine, faHammer, faTableCellsLarge, faTag } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import SidebarItem from './SidebarItem';
import SidebarMultipleItem from './SidebarMultipleItem';

const Sidebar = () => {

      return (
            <div className='dashboard_sidebar'>
                  {/* Sidebar nav */}
                  <ul className='mt-14 pt-2 pb-16 overflow-auto h-full sidebar_links_container'>
                        <SidebarItem
                              Icon={faTableCellsLarge}
                              title={"Dashboard"}
                              link={"/dashboard"}
                        />
                        <SidebarMultipleItem
                              Icon={faTag}
                              title={"Products"}
                              options={[{ name: "All Products", link: "/all-products" }, { name: "Manage Products", link: "/manage-products" }]}
                        />
                        {/* <SidebarMultipleItem
                              Icon={faGraduationCap}
                              title={"Courses"}
                              options={[{ name: "Upload Course", link: "/upload-course" }, { name: "Manage Course", link: "/manage-course" }]}
                        /> */}
                        <SidebarMultipleItem
                              Icon={faHammer}
                              title={"Selling"}
                              options={[
                                    { name: "Manage Orders", link: "/manage-orders" },
                                    // { name: "Order Status", link: "/order-status" }
                              ]}
                        />
                        <SidebarMultipleItem
                              Icon={faCartShopping}
                              title={"Purchase"}
                              options={[
                                    { name: "All Purchase", link: "/all-purchase" },
                                    { name: "Track Purchase", link: "/track-purchase" }
                              ]}
                        />
                        {/* <SidebarItem
                              Icon={faRoute}
                              title={"Track Order"}
                              link={"/track-order"}
                        /> */}
                        <SidebarItem
                              Icon={faChartLine}
                              title={"Reports"}
                              link={"/reports"}
                        />
                        <SidebarItem
                              Icon={faCircleQuestion}
                              title={"Help & Support"}
                              link={"/help"}
                        />
                  </ul>
            </div>
      );
};

export default Sidebar;