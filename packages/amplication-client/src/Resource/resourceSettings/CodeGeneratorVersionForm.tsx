import { useContext } from "react";
import * as models from "../../models";
import "./GenerationSettingsForm.scss";
import { AppContext } from "../../context/appContext";
import { Form, Formik } from "formik";
import { validate } from "../../util/formikValidateJsonSchema";
import { useTracking } from "../../util/analytics";
import useSettingsHook from "../useSettingsHook";
import EntitySelectField from "../../Components/EntitySelectField";
import FormikAutoSave from "../../util/formikAutoSave";
import useResource from "../hooks/useResource";

const CLASS_NAME = "code-generator-service-form";

function CodeGeneratorVersionForm() {
  const { currentResource } = useContext(AppContext);
  const { resourceSettings, updateResourceSettings } = useResource(
    currentResource.id
  );

  const { trackEvent } = useTracking();

  const resourceId = currentResource?.id;
  const { handleSubmit, SERVICE_CONFIG_FORM_SCHEMA } = useSettingsHook({
    trackEvent,
    resourceId,
    updateResourceSettings,
  });

  return (
    <div className={CLASS_NAME}>
      {resourceSettings?.serviceSettings && (
        <Formik
          initialValues={resourceSettings.serviceSettings}
          validate={(values: models.ServiceSettings) =>
            validate(values, SERVICE_CONFIG_FORM_SCHEMA)
          }
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className={`${CLASS_NAME}__header`}>
                  <h3>Choose Code Generator Version</h3>
                </div>
                <FormikAutoSave debounceMS={200} />
                <EntitySelectField
                  label={"Generator Version List"}
                  name="generatorVersion"
                  resourceId={resourceId}
                  isValueId={false}
                />
                <div className={`${CLASS_NAME}__header`}>
                  <h3>Choose Versioning Strategy</h3>
                </div>
                <FormikAutoSave debounceMS={200} />
                <EntitySelectField
                  label={"Versioning Strategy"}
                  name="generatorVersion"
                  resourceId={resourceId}
                  isValueId={false}
                />
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default CodeGeneratorVersionForm;
