import styled from "styled-components/native";
import {UsersThree} from 'phosphor-react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
    flex:1;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};
    padding: 24px;
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Icon = styled(UsersThree).attrs(({theme}) => ({
    size: 32,
    color: theme.COLORS.GREEN_700,
    weight: 'fill',
}))`

    align-self: center;

`;
