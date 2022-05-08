import { Container, Divider, Text, Input, Spacer, Textarea, Button } from "@nextui-org/react";

export default function CreateBlog() {
    return (
        <Container fluid>
            <Text h2>Write new Simpleblog</Text>
            <Divider />
            <Input fullWidth="true" placeholder="Blog Title" />
            <Spacer />
            <Textarea
                fullWidth="true"
                placeholder="Enter your amazing ideas."
                rows="15"
            />
            <Spacer />
            <Button>Save</Button>
        </Container>
    );
}