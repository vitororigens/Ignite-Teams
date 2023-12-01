import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useState } from "react";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";


export function NewGroup() {
    const [groups, setGroups] = useState('')
    const navigation = useNavigation()

    async function handleNew() {
        try {
            if(groups.trim().length === 0 ){
                return Alert.alert('Novo Grupo', 'Informe o nome da turma.')
            }

        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Novo Grupo', error.message)
            }else{
                Alert.alert('Novo Grupo', 'Não foi possivel criar um novo grupo.')
                console.log(error);
            }
        }
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