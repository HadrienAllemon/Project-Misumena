import { Box, Flex, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import { IUser } from "models/IUser";
import React, { useCallback, useContext, useMemo } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";
import avatarPlaceholder from "assets/avatars/avatar0.png";
import aquaBG from "assets/playerTile/gradientPlayerTile.png"
import { getFontSizeForName } from "src/utils/utils";
import "./playerTile.css";
interface IPlayerTileProps {
    user: IUser;
    isAdmin: boolean;
    score?: number;
    index?: number
}

const PlayerTile: React.FC<IPlayerTileProps> = ({ user, isAdmin, index = 0 }) => {
    const { state } = useContext(SocketContext);
    const isCurrentUser = state.currentUser?.id === user.id;
    const renderCurrentWord = useCallback(() => {
        if (state.room?.roomState === "idle") return null;
      
        return (
            <Box className="word-box" >
                {
                    isCurrentUser && state.currentUser?.assignedWord?.length ?
                    <>
                        <div>Your word:</div>
                        <div className="secret-word">{state.currentUser?.assignedWord}</div>
                    </>
                    :
                    <>
                        <div>{user.name} Word:</div>
                        <div className="secret-word">*********</div>
                    </>
                }
            </Box>
        );
    },[state.currentUser?.assignedWord])
    function renderGuesses(): React.ReactNode {
        return (
            <div className="guesses-box" >
                <div className="guesses-header" >
                    <span className="left-line"></span>
                    <h2>Guesses </h2>
                    <span className="right-line"></span>
                </div>
                <div className="guesses-list" >
                    {state.room?.currentGuesses[user?.id]?.map((word) => <div className="guesses-list-item">{word}</div>)}
                </div>
            </div>
        )

    }

    return (
  <Box
    className="player-card"
    
  >
    <Box
      className="player-card-bg"
      style={{ filter: `hue-rotate(${index * 137.5}deg)` }}
      backgroundImage={aquaBG}
    />

    <Flex
      className="player-card-header"
      justifyContent="space-between"
      alignItems="center"
      marginBottom="1rem"
    >
      <Box>
        <Img
          className="player-avatar"
          src={avatarPlaceholder}
          alt="User Avatar"
        />
      </Box>

      <Box className="player-info">
        <Box
          className={`player-name Sunday ${
            isCurrentUser ? "player-name--current" : ""
          }`}
          fontSize={getFontSizeForName(user.name, 10)}
        >
          {user.name}
        </Box>

        {isAdmin && (
          <Box className="admin-badge">
            <Text className="admin-text">ADMIN</Text>
          </Box>
        )}

        <Box className="player-score">
          Score : {user.score || 0}
        </Box>
      </Box>
    </Flex>

    {renderCurrentWord()}
    {renderGuesses()}
  </Box>
);
}

export default PlayerTile;