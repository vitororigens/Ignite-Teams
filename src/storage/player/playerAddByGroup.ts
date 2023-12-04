import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersGetByGroup } from "./PlayersGetByGroup";
import { AppError } from "@utils/AppError";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, groups: string) {
    try {
        const storedPlayers = await playersGetByGroup(groups);

        const playerAlreadyExist = storedPlayers.filter(player => player.name === newPlayer.name);

        if (playerAlreadyExist.length > 0) {
            throw new AppError('Essa pessoa já existe em um time.')
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer])

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groups}`, storage);
    } catch (error) {
        throw (error);
    }
}