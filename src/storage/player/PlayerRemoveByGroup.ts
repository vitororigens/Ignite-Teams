import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersGetByGroup } from "./PlayersGetByGroup"
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function PlayerRemoveByGroup(playerName: string, groups: string) {
    try {
            const storage = await playersGetByGroup(groups);

            const filtered = storage.filter(player => player.name !== playerName);

            const players = JSON.stringify(filtered);

            await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groups}`, players)
    } catch (error) {
        throw error
    }
}