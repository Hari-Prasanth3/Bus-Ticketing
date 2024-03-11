import { Navbar, Button } from "@material-tailwind/react";
import { Link } from "@mui/material";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import icon from '../assests/icon-removebg.png'

import { Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // for slide nav
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //for getTickets button
  const handleGetAllTickets = () => {
    navigate("/tickets");
  };

  //for sign out button
  const handleSignOut = () => {
    try {
      dispatch(setCredentials(null));
      toast.success('Log Out successfully'); 
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error)
    }
    };

  return (
    <>
    <Navbar className="flex items-center justify-between  backdrop-blur lg:px-8 bg-gray-500 pb-0 w-full rounded-none border-none">
      <Link href="/">
        <img src={icon} alt="icon" className=" rounded  bg-fixed h-16"   />
        
      </Link>
      <div className="flex space-x-4 ">
        {userInfo ? (
          <>
            <Button
              onClick={handleOpenUserMenu}
              className="inline-block rounded-md p-2 bg-rose-500 "
            >
              Profile
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href="/tickets" underline="none" color="black">
                  <p
                    onClick={handleGetAllTickets}
                    className="inline-block rounded-md p-2"
                  >
                    GetAllTickets
                  </p>
                </Link>
              </MenuItem>
            </Menu>
            <Button
              onClick={handleSignOut}
              className="inline-block rounded-md p-2 bg-rose-500"
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              variant="text"
              size="sm"
              className="inline-block  rounded-md p-2 bg-rose-500 "
            >
              <span>Sign In</span>
            </Link>
            <Link
              href="/register"
              variant="text"
              size="sm"
              className="inline-block rounded-md p-2 bg-rose-500 "
            >
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </Navbar>
  
     </>
  );


};

export default Header;
