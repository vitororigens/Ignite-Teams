import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


export function NewGroup() {
    const [groups, setGroups] = useState('')
    const navigation = useNavigation()

    function handleNew() {
        navigation.navigate('players', { groups })
    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight
                    title="Nova Turma"
                    subtitle="crie sua turma para adicionar pessoas"
                />
                <Input
                    placeholder="Nome da turma"
                    onChangeText={setGroups}
                />
                <Button
                    onPress={handleNew}
                    title="Criar"
                    style={{
                        marginTop: 20
                    }}
                />
            </Content>
        </Container>
    )
}