import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
//
import { Container } from './styles';
//
import { groupsGetAll } from '@storage/group/groupsGetAll';
//
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { isLoading } from 'expo-font';
import { Loading } from '@components/Loading';

export function Groups() {
  
  const [groups, setGroups] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()


  function handleNewgroup() {
    navigation.navigate('newGroup')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll();
      setGroups(data)

    } catch (error) {
      Alert.alert('Turmas', 'Não foi possivel carregar os grupos.')
      console.log(error)
    
    }
    finally{
      setIsLoading(false)
    }
  }


  function handleOpenGroup(groups: string) {
    navigation.navigate('players', { groups})
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

      {isLoading ? <Loading/> :
      <FlatList
      data={groups}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <GroupCard
          title={item}
          onPress={() => handleOpenGroup(item)}
        />
      )}
      contentContainerStyle={groups.length === 0 && { flex: 1 }}
      ListEmptyComponent={() => (
        <ListEmpty message="Que tal começar um novo grupo?" />
      )}
    />
      }
      <Button
        title='Criar nova turma'
        onPress={handleNewgroup}
      />

    </Container>
  );
}
