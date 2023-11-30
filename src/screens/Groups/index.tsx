import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()


  function handleNewgroup() {
    navigation.navigate('newGroup')
  }

  async function fetchGroups() {
    try {

      const data = await groupsGetAll();
      setGroups(data)

    } catch (error) {

      console.log(error)
    
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  },[]));
   
  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='Jogue com sua turma'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal começar um novo grupo?" />
        )}
      />
      <Button
        title='Criar nova turma'
        onPress={handleNewgroup}
      />

    </Container>
  );
}
