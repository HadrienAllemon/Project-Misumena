import * as React from "react";
import { useContext, useState } from "react";
import { SocketContext } from "../../contexts/socket/SocketContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardBody, Flex, FormControl, FormLabel, Img, Input, Spacer } from "@chakra-ui/react";
import misumenaImg2 from "assets/title/Misumena_Title.png"

const Login = () => {
    const { socket, state, dispatch } = useContext(SocketContext);
    const [playerName, setPlayerName] = useState<string>("");
    const [playerRoom, setPlayerRoom] = useState<string>("");
    const navigate = useNavigate();
    const login = () => {
        dispatch({ type: "login", name: playerName, room: playerRoom })
    }
    useEffect(() => {
        if (state.room?.id?.length) navigate(`/${state.room.id}`);
    }, [state.room])
    return (
        <div style={{ height: "100vh", width: "100vw" }} >
            <Flex alignItems={"center"} justifyContent={"flexStart"} height={"100%"} direction={"column"} gap={"4rem"} paddingTop={"7rem"}>
            <Img src={misumenaImg2} height={"12rem"} className="titleImg" />

                <Card color="white" bg={"#50185170"} outline={"1px solid #333a"}>
                    <CardBody>
                        <FormControl>
                            <Box >
                                <FormLabel fontSize={"xl"}>What should we call you ?</FormLabel>
                                <Input color="black" value={playerName} onChange={(event) => setPlayerName(event.target.value)} id="standard-basic" variant="standard" />
                                <Spacer boxSize={"10"}/>
                                <FormLabel fontSize={"xl"}>join a specific room</FormLabel>
                                <Input color="black" value={playerRoom} onChange={(event) => setPlayerRoom(event.target.value)} id="standard-basic" variant="standard" />
                                <Button onClick={login} style={{ width: "60px" }} variant="contained">
                                    GO
                                </Button>
                            </Box>
                        </FormControl>
                    </CardBody>
                </Card>
            </Flex>
        </div>

    )
}

export default Login