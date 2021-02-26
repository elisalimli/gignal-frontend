import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../src/components/utils/InputField";
import ProtectedRoute from "../src/components/utils/ProtectedRoute";
import Wrapper from "../src/components/utils/Wrapper";
import { useCreateTeamMutation } from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";
import { withApollo } from "../src/utils/withApollo";
import { form, formHeader } from "../styles/global";

interface Props {}

const CreateTeam = (props: Props) => {
  const [createTeam] = useCreateTeamMutation();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <Wrapper isMobileFull>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await createTeam({
              variables: values,
              update: (cache) => {
                cache.evict({ fieldName: "teams" });
              },
            });
            const { errors, team, channelId } = res.data.createTeam;
            if (errors) {
              setErrors(toErrorMap(errors));
            } else if (team) router.push(`/team/view/${team.id}/${channelId}`);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={form}>
              <NextLink href="/">
                <h1 className={formHeader}>Create Team</h1>
              </NextLink>

              <InputField
                name="name"
                placeholder="Name of your team"
                label="Name"
              />
              <Button
                mx="auto"
                mt="6"
                isLoading={isSubmitting}
                type="submit"
                loadingText="Submitting"
                colorScheme="blue"
                width="200px"
                variant="solid"
              >
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: false })(CreateTeam);
