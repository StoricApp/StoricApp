/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Heading,
  Button,
  Image,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  Spinner
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  MdOutlineSpaceDashboard,
  MdOutlineSettingsSuggest,
  MdOutlineContacts,
} from "react-icons/md";
import { TbBuildingWarehouse } from "react-icons/tb";
import { useAppContext } from "../../../contexts/AppContext";
import { useEffect } from "react";
import { useRouter } from 'next/router'

function PrivateViewHOC({ children }) {
  const { user, authLoaded } = useAppContext()

  const router = useRouter()

  useEffect(()=> {
    if(!authLoaded && !user){
      router.push('/login')
    }
    else {
      console.log('user: ', user)
    }
  }, [ authLoaded, user ])
  return (
    <>
    {
      !authLoaded
        ? <Flex w = {'100vw'} h = {'100vh'} align = {'center'} justifyContent = {'center'} flexDir = {'column'}>
            <Spinner size={'xl'}/>
         </Flex>
        : <Grid
            templateAreas={`"sidebar header"
                            "sidebar main"
                            "sidebar footer"`}
            gridTemplateRows={"90px 1fr 40px"}
            gridTemplateColumns={"264px 1fr"}
            h="100vh"
            gap="0"
            color="blackAlpha.700"
            fontWeight="bold"
          >
            {/* Header */}
            <GridItem
              pl={6}
              bg="white.900"
              borderBottom="1px"
              borderColor="#E9E9E9"
              area={"header"}
            ></GridItem>

            {/* Sidebar */}
            <GridItem pt={6} pl="0" bg="#212224" area={"sidebar"}>
              {/* Logo */}
              <Flex pb={6} borderBottom="1px" borderColor="#2F3032">
                <Image pl={6} src="logo.svg" alt="Storic App Logo" />
              </Flex>

              {/* Navigation */}
              <Flex>
                <List width="100%">
                  <ListItem borderBottom="1px" borderColor="#2F3032">
                    <NextLink href="/login" passHref>
                      <Link textDecoration="none">
                        <Stack direction="row">
                          <Button
                            leftIcon={<MdOutlineSpaceDashboard />}
                            colorScheme="white"
                            color="#A6AAB2"
                            fontSize="18px"
                            fontWeight="semibold"
                            variant="solid"
                            size="lg"
                            textDecoration="none"
                            borderRadius="0"
                            p={8}
                            height="auto"
                            width="100%"
                            _hover={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                            _active={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                            focus={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                          >
                            Dashboard
                          </Button>
                        </Stack>
                      </Link>
                    </NextLink>
                  </ListItem>
                  <ListItem borderBottom="1px" borderColor="#2F3032">
                    <NextLink href="/login" passHref>
                      <Link>
                        <Stack direction="row">
                          <Button
                            leftIcon={<MdOutlineContacts />}
                            colorScheme="white"
                            color="#A6AAB2"
                            fontSize="18px"
                            fontWeight="semibold"
                            textDecoration="none"
                            variant="solid"
                            size="lg"
                            borderRadius="0"
                            p={8}
                            height="auto"
                            width="100%"
                            _hover={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                            _active={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                            focus={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                          >
                            Tenants
                          </Button>
                        </Stack>
                      </Link>
                    </NextLink>
                  </ListItem>
                  <ListItem borderBottom="1px" borderColor="#2F3032">
                    <NextLink href="/login" passHref>
                      <Link>
                        <Stack direction="row">
                          <Button
                            leftIcon={<TbBuildingWarehouse />}
                            colorScheme="white"
                            color="#A6AAB2"
                            fontSize="18px"
                            fontWeight="semibold"
                            variant="solid"
                            size="lg"
                            borderRadius="0"
                            p={8}
                            height="auto"
                            width="100%"
                            _hover={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                            _active={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                            focus={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                          >
                            Locations
                          </Button>
                        </Stack>
                      </Link>
                    </NextLink>
                  </ListItem>
                  <ListItem borderBottom="1px" borderColor="#2F3032">
                    <NextLink href="/login" passHref>
                      <Link>
                        <Stack direction="row">
                          <Button
                            leftIcon={<MdOutlineSettingsSuggest />}
                            colorScheme="white"
                            color="#A6AAB2"
                            fontSize="18px"
                            fontWeight="semibold"
                            variant="solid"
                            size="lg"
                            borderRadius="0"
                            p={8}
                            height="auto"
                            width="100%"
                            _hover={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                            _active={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                            focus={{
                              bg: "#2F3032",
                              color: "#ffffff",
                            }}
                          >
                            Settings
                          </Button>
                        </Stack>
                      </Link>
                    </NextLink>
                  </ListItem>
                </List>
              </Flex>

              {/* Profile */}
              <Flex direction="column" p={8}>
                <Heading
                  as="h4"
                  fontSize="lg"
                  color="#696D75"
                  textTransform="uppercase"
                >
                  Profile
                </Heading>
                <Flex direction="row">
                  <Image
                    boxSize="53px"
                    objectFit="cover"
                    borderRadius="60px"
                    src="avatar.png"
                    alt="User Avatar"
                  ></Image>
                  <Stack direction='column'>
                    <Heading as="h6" fontSize="md" color="white">
                      { user?.displayName || user?.email }
                    </Heading>
                    <Text fontSize="sm">Manager</Text>
                  </Stack>
                </Flex>
              </Flex>
            </GridItem>

            {/* Main */}
            { children }

            {/* Footer */}
            <GridItem pl="2" bg="blue.300" area={"footer"}>
              Footer
            </GridItem>
          </Grid>
    }
    </>
  );
};

export default PrivateViewHOC;
