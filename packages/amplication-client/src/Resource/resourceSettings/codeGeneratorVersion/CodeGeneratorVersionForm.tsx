import { useContext } from "react";
import * as models from "../.././../models";
import "./CodeGeneratorVersionForm.scss";
import { AppContext } from "../../../context/appContext";
import { Form, Formik } from "formik";
import { validate } from "../../../util/formikValidateJsonSchema";
import { useTracking } from "../../../util/analytics";
import useSettingsHook from "../../useSettingsHook";
import FormikAutoSave from "../../../util/formikAutoSave";
import useResource from "../../hooks/useResource";
import {
  CodeGeneratorVersionStrategy,
  strategyConfiguration,
} from "./CodeGeneratorVersionStrategy";

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

  const handleStrategyChange = (
    strategy: models.CodeGeneratorVersionStrategy
  ) => {
    console.log("handleStrategyChange", strategy);
  };

  const handleVersionSelect = (version: string) => {
    console.log("handleVersionSelect", version);
  };

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
                  <h3>Choose Code Generator Version Settings</h3>
                  <h5>Select one of the version settings options:</h5>
                </div>
                {strategyConfiguration.map(
                  ({
                    strategy,
                    title,
                    description,
                    selectTitle,
                    selectPlaceholder,
                    iconName,
                  }) => (
                    <CodeGeneratorVersionStrategy
                      savedStrategy={strategy}
                      onStrategyChange={handleStrategyChange}
                      onVersionSelect={handleVersionSelect}
                      strategy={strategy}
                      title={title}
                      description={description}
                      selectTitle={selectTitle}
                      selectPlaceholder={selectPlaceholder}
                      iconName={iconName}
                    />
                  )
                )}
                <FormikAutoSave debounceMS={200} />
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default CodeGeneratorVersionForm;
