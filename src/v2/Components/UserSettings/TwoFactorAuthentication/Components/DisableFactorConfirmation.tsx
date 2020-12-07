import { Button, Flex, Modal, space } from "@artsy/palette"
import React from "react"
import { PasswordInput } from "v2/Components/PasswordInput"
import { Form, Formik, FormikProps } from "formik"
import { Error } from "v2/Components/Authentication/commonElements"
import { DisableSecondFactorInput } from "v2/__generated__/DisableSecondFactorMutation.graphql"
import { map } from "lodash"
import { DisableSecondFactor } from "./Mutation/DisableSecondFactor"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { DisableFactorConfirmation_me } from "v2/__generated__/DisableFactorConfirmation_me.graphql.ts"
interface DisableFactorConfirmationProps {
  me: DisableFactorConfirmation_me
  onConfirm: (password: string, onErr: (err) => void) => void
  onCancel: () => void
  show: boolean
}

export const DisableFactorConfirmation: React.FC<DisableFactorConfirmationProps> = props => {
  const { relayEnvironment } = useSystemContext()

  const { onCancel, onConfirm, show, me } = props
  const onSubmit = async (
    { password }: DisableSecondFactorInput,
    formikBag: FormikProps<any>
  ) => {
    debugger
    if (me.appSecondFactors[0].__typename !== "AppSecondFactor") {
      return
    }
    formikBag.setStatus({ error: undefined })

    try {
      debugger
      await DisableSecondFactor(relayEnvironment, {
        password,
        secondFactorID: me.appSecondFactors[0].internalID
      })

      onConfirm(password, (errors) => {
        debugger
        const formattedErrors = map(errors, 'message').join(', ')
        formikBag.setStatus({ error: formattedErrors })
      })
      debugger
    } catch (err) {
      debugger
    }
  }

  const onClickCancel = (e) => {
    e.preventDefault()
    onCancel()
  }

  return (
    <Modal
      show={show}
      title="Disable 2FA method?"
      onClose={onCancel}
    >
      <Formik
        initialValues={{
          password: ''
        }}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          status,
          touched,
          values,
        }) => (
          <Form onSubmit={handleSubmit}>
            <PasswordInput
              autoFocus
              block
              error={
                !values.password && "Password is required to change 2FA settings."
              }
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {status && !status.success && <Error show>{status.error}</Error>}
            <Flex mt={space(2)} justifyContent="flex-end">
              <Button
                variant="noOutline"
                onClick={onClickCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={!values.password}
              >
                Save changes
              </Button>
            </Flex>
         </Form>
        )}
      </Formik>
    </Modal>
  )
}

export const DisableFactorConfirmationFragmentContainer = createFragmentContainer(
  DisableFactorConfirmation,
  {
    me: graphql`
      fragment DisableFactorConfirmation_me on Me {
        appSecondFactors: secondFactors(kinds: [app]) {
          ... on AppSecondFactor {
            internalID
            name
            __typename
          }
        }
      }
    `,
  }
)
