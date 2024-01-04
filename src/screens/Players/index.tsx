import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, FlatList, TextInput } from "react-native";
import { useState, useEffect, useRef } from "react";
//
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
//
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { Header } from "@components/Header";
import { Filter } from "@components/Filter";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
//
import { AppError } from "@utils/AppError";
//
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerRemoveByGroup } from "@storage/player/PlayerRemoveByGroup";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";


type RouteParams = {
    groups: string;
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Team A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
    const navigation = useNavigation()

    const route = useRoute()

    const newPlayerNameInputRef = useRef<TextInput>(null)

    const { groups } = route.params as RouteParams;

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddByGroup(newPlayer, groups);

            newPlayerNameInputRef.current?.blur()

            setNewPlayerName('')
            fetchPlayersByTeam()
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possivel adicionar nova pessoa.');
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const playersByTeam = await playersGetByGroupAndTeam(groups, team);
            setPlayers(playersByTeam)
        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado.')
        }

    }

    async function handlePlayerRemove(playerName: string) {
        try {
            await PlayerRemoveByGroup(playerName, groups);
            fetchPlayersByTeam()
        } catch (error) {
            console.log(error)
            Alert.alert('Remover pessoa', 'Não foi possivel remover essa pessoa')
        }

    }

    async function groupRemove() {
        try {
            await groupRemoveByName(groups)
            navigation.navigate('groups')


        } catch (error) {
            console.log(error);
            Alert.alert('Remover grupo', 'Não foi possivel remover o grupo.');
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remove',
            'Deseja remover o grupo?',

            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() }
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam()

    }, [team])


    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title={groups}
                subtitle="Adicione a galera e separe os times"
            />
            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon
                    onPress={handleAddPlayer}
                    icon="add"
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['time A', 'time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>
            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard
                        onRemove={() => handlePlayerRemove(item.name)}
                        name={item.name}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Não há pessoas nesse time"
                    />
                )}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }

                ]}
            />
            <Button
                title="Remover Turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />

        </Container>
    )
}