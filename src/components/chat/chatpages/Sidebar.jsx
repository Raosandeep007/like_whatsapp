import React, { Fragment, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MdOutlinePersonSearch } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import { ChatState } from "../../context/chatprovider";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 1000,
        isclosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://127.0.0.1:5000/users/allusers?name=${search}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Ocucured!",
        status: "error",
        duration: 1000,
        isclosable: true,
        position: "bottom-left",
      });
    }
  };
  const accessChat = (useId) => {};
  return (
    <Fragment>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg={"white"}
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Button onClick={onOpen}>
          <MdOutlinePersonSearch style={{ width: "20px", height: "20px" }} />
          <Text d={{ base: "none", md: "flex" }} px="4">
            Search here
          </Text>
        </Button>
        <Text fontSize="2xl" fontFamily="Work sans">
          App like-whatsapp
        </Text>
        <div>
          <Menu>
            <MenuButton p="1">
              <BsFillBellFill
                style={{ width: "20px", height: "20px", margin: 1 }}
              />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<AiFillCaretDown />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <Profile user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <Stack>
                <Skeleton h={"45px"} />
                <Skeleton h={"45px"} />
                <Skeleton h={"45px"} />
                <Skeleton h={"45px"} />
              </Stack>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default Sidebar;
