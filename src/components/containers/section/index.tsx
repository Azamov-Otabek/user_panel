import "./style.scss"
import Container from '../container'

const index = ({children}:any) => {
    return (
        <section>
            <Container>
                {children}
            </Container>
        </section>
    );
};

export default index;