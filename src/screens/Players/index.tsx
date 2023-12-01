import { useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

type RouteParams = {
    groups: string;
}

export function Players() {
    const [team, setTeam] = useState('Team A')
    const [players, setPlayers] = useState([])

    const route = useRoute()

    const {groups} = route.params as RouteParams;
    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title={groups}
                subtitle="Adicione a galera e separe os times"
            />
            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />
                <ButtonIcon icon="add" />
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
            keyExtractor={item => item}
            renderItem={({ item }) =>(
                <PlayerCard
                    onRemove={()=> ({})}
                    name={item}
                />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <ListEmpty
                 message="Não pessoas nesse time"
                />
            )}
            contentContainerStyle={[
                {paddingBottom:100},
                players.length === 0 && {flex: 1}
            
            ]}
            />
            <Button
             title="Remover Turma"
             type="SECONDARY" 
            />

        </Container>
    )
}