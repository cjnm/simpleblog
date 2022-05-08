import { Grid, Card, Text, Divider, Row, Button, Container } from "@nextui-org/react";

export default function Blogs() {
    const BlogCard = ({ text }) => {
        return (
            <Card css={{ mw: "330px" }}>
                <Card.Header>
                    <Text b>Title</Text>
                </Card.Header>
                <Divider />
                <Card.Body css={{ py: "$10" }}>
                    <Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Text>
                </Card.Body>
                <Divider />
                <Card.Footer>
                    <Row justify="flex-end">
                        <Button auto color="gradient" rounded bordered size="sm">Continue Reading</Button>
                    </Row>
                </Card.Footer>
            </Card>
        );
    };
    return (
        <Container fluid>
            <Text h2>Blogs</Text>
            <Grid.Container gap={2} justify="left">
                <Grid>
                    <BlogCard text="1 of 2" />
                </Grid>
                <Grid>
                    <BlogCard text="2 of 2" />
                </Grid>
                <Grid>
                    <BlogCard text="1 of 2" />
                </Grid>
                <Grid>
                    <BlogCard text="2 of 2" />
                </Grid>
            </Grid.Container>
        </Container>

    );
}