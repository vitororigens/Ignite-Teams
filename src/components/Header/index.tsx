import { BackButton, BackIcon, Container, Logo } from "./styles";
import ImageLogo from '@assets/logo.png'

type props = {
    showBackButton?: boolean;
}

export function Header({ showBackButton = false }: props) {
    return (
        <Container>
            {   
                showBackButton &&
                <BackButton>
                    <BackIcon />
                </BackButton>
            }

            <Logo source={ImageLogo} />
        </Container>
    )
} 0