import { Container, Card, Row, Text } from "@nextui-org/react";

export default function Blog() {
    return (
        <Container>
            <Card color="primary">
                <Row justify="center" align="center">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                        1 Blog
                    </Text>
                </Row>
            </Card>
        </Container>
    );
}