import { Button, Card, CardBody, CardHeader, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";

type Props = {
  form: any;
  loading: boolean;
};

export const CreateTask = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Create Task</Heading>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.form.submitForm();
          }}
        >
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={props.form.values.title} name="title" onChange={props.form.handleChange} />
          </FormControl>
          <Button mt={2} colorScheme={"blue"} onClick={props.form.submitForm} isLoading={props.loading}>
            Save
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
