import { useState, useEffect } from "react";
import { Grid, Card, Text, Divider, Row, Button, Container, Loading } from "@nextui-org/react";
import { getAllBlogs } from "../utils/http/blog";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllBlogs().then(data => {
            if (data.success && data.data.length > 0) {
                setBlogs(data.data);
            } else {
                setBlogs([])
            }
            setIsLoading(false);
        });
    }, []);

    const BlogCard = ({ title, content }) => {
        return (
            <Card css={{ mw: "330px" }}>
                <Card.Header>
                    <Text b>{title}</Text>
                </Card.Header>
                <Divider />
                <Card.Body css={{ py: "$10" }}>
                    <Text>
                        {content}
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

    if (!isLoading && blogs.length > 0) {
        return (
            <Container fluid>
                <Text h2>Blogs</Text>
                <Grid.Container gap={2} justify="left">
                    {
                        blogs.map((blog, index) => {
                            return (
                                <Grid key={index}>
                                    <BlogCard title={blog.title} content={blog.content} />
                                </Grid>
                            )
                        })
                    }
                </Grid.Container>
            </Container>
        )
    } else if (!isLoading && blogs.length === 0) {
        return (
            <Container fluid>
                <Text h2>Blogs</Text>
                <Grid.Container gap={2} justify="center">
                    <Grid>
                        No blogs found.
                    </Grid>
                </Grid.Container>
            </Container>
        )
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }
}