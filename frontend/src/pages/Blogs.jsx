import { Container, Card, Row, Text } from "@nextui-org/react";

export default function Blogs() {
    return (
        <Container>
            <Card color="primary">
                <Row justify="center" align="center">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                        Blogs
                    </Text>
                </Row>
            </Card>
        </Container>
    );
}